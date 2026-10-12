import { marked } from "./vendor/marked.js";
import DOMPurify from "./vendor/purify.js";

const $ = (selector) => document.querySelector(selector);
const article = $("#article");
const defaultDocument = "sections/introduction.md";
const siteBase = new URL("./", import.meta.url);
const contentBase = new URL("content/", siteBase);
const contentUrl = (path) =>
  new URL(path.split("/").map(encodeURIComponent).join("/"), contentBase);
const documentUrl = (href, path) =>
  href.startsWith("/") && !href.startsWith("//")
    ? new URL(`.${href}`, siteBase)
    : new URL(href, contentUrl(path));
let course = { introduction: null, sections: [], lessons: [] };
let lessons = [];
let currentDocument = "";
let controller;
let headings = [];
let headingsExpanded = true;
const views = new Map();
let currentEntry = crypto.randomUUID();
history.scrollRestoration = "manual";
history.replaceState({ readerEntry: currentEntry }, "");
const markdown = (source) =>
  DOMPurify.sanitize(marked.parse(source), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "form", "input", "button", "iframe"],
    FORBID_ATTR: ["style", "id", "name"],
  });
const readerUrl = (path, hash = "") =>
  `${siteBase.pathname}?doc=${encodeURIComponent(path)}${hash}`;

async function getDocument(path, signal) {
  const response = await fetch(contentUrl(path), { signal });
  if (!response.ok)
    throw new Error(
      response.status === 404
        ? "This document is not present in the checkout."
        : "The reader could not load this document.",
    );
  return response.text();
}

function setOutline(open) {
  const wasOpen = document.body.classList.contains("outline-open");
  document.body.classList.toggle("outline-open", open);
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $(".menu-toggle").setAttribute(
    "aria-label",
    open ? "Close course outline" : "Open course outline",
  );
  syncOutlineAccess();
  if (!open && wasOpen && $("#sidebar").inert) $(".menu-toggle").focus();
}
function syncOutlineAccess() {
  const mobile = matchMedia("(max-width: 850px)").matches;
  const open = document.body.classList.contains("outline-open");
  $("#sidebar").inert = mobile && !open;
  $("#main").inert = mobile && open;
  $(".backdrop").hidden = !mobile || !open;
}
$(".menu-toggle").addEventListener("click", () =>
  setOutline(!document.body.classList.contains("outline-open")),
);
$(".backdrop").addEventListener("click", () => setOutline(false));
window.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    document.body.classList.contains("outline-open")
  ) {
    setOutline(false);
  }
});
window.addEventListener("resize", syncOutlineAccess);
syncOutlineAccess();
$("#type-size").addEventListener("click", () => {
  const large = document.body.classList.toggle("large-text");
  $("#type-size").setAttribute(
    "aria-label",
    large ? "Use standard reading text size" : "Increase reading text size",
  );
  $("#type-size").querySelector("span").textContent = large ? "−" : "+";
  updateProgress();
});
$("#collapse").addEventListener("click", () => {
  headingsExpanded = !headingsExpanded;
  document.querySelectorAll(".nested-headings").forEach((element) => {
    element.hidden = !headingsExpanded;
  });
  $("#collapse").textContent = headingsExpanded ? "−" : "+";
  $("#collapse").setAttribute(
    "aria-label",
    headingsExpanded ? "Collapse lesson headings" : "Expand lesson headings",
  );
  $("#collapse").title = $("#collapse").getAttribute("aria-label");
});
$("#lesson-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  let matches = 0;
  const parentItems = [...$("#lessons").children].filter((item) =>
    item.classList.contains("lesson-item"),
  );
  parentItems.forEach((parent) => {
    const parentMatch = parent
      .querySelector(":scope > .lesson-link")
      .textContent.toLowerCase()
      .includes(query);
    const childItems = [
      ...parent.querySelectorAll(":scope > .lesson-children .lesson-item"),
    ];
    if (!query) {
      parent.hidden = false;
      childItems.forEach((item) => {
        item.hidden = false;
      });
      return;
    }
    let childMatches = 0;
    childItems.forEach((item) => {
      const matched = item
        .querySelector(":scope > .lesson-link")
        .textContent.toLowerCase()
        .includes(query);
      item.hidden = !matched && !parentMatch;
      if (matched) childMatches++;
    });
    parent.hidden = !parentMatch && childMatches === 0;
    if (parentMatch || childMatches) matches++;
  });
  document.querySelectorAll(".chapter-label").forEach((label) => {
    label.hidden = Boolean(query);
  });
  $("#no-results").hidden = matches > 0 || !query;
});

function lessonAnchor(item) {
  return [...item.querySelectorAll('a[href^="sections/"]')].find(
    (anchor) => anchor.closest("li") === item,
  );
}

function parseCourseOutline(document) {
  const root = document.querySelector(".course-lessons");
  const lists = root
    ? [...root.children].filter((element) => element.matches("ol"))
    : [];
  const topItems = lists.flatMap((list) =>
    [...list.children].filter((element) => element.matches("li")),
  );
  const readLesson = (item) => {
    const anchor = lessonAnchor(item);
    if (!anchor) return null;
    const nestedList = [...item.children].find((element) =>
      element.matches("ol"),
    );
    return {
      title: anchor.textContent.trim(),
      path: anchor.getAttribute("href"),
      children: nestedList
        ? [...nestedList.children]
            .filter((element) => element.matches("li"))
            .map(readLesson)
            .filter(Boolean)
        : [],
      parent: null,
      number: "",
      sectionNumber: null,
      isIntroduction: false,
    };
  };
  const roots = topItems.map(readLesson).filter(Boolean);
  if (!roots.length) throw new Error("The course outline contains no lesson links.");
  const flatLessons = [];
  const visit = (lesson, parent, sectionNumber, number) => {
    lesson.parent = parent;
    lesson.sectionNumber = sectionNumber;
    lesson.number = number;
    lesson.isIntroduction = !parent && !sectionNumber;
    flatLessons.push(lesson);
    lesson.children.forEach((child, index) =>
      visit(
        child,
        lesson,
        sectionNumber,
        sectionNumber ? `${sectionNumber}.${index + 1}` : "—",
      ),
    );
  };
  const introduction = roots[0];
  visit(introduction, null, null, "—");
  const sections = roots.slice(1);
  sections.forEach((section, index) => {
    const sectionNumber = String(index + 1);
    visit(section, null, sectionNumber, sectionNumber);
  });
  return { introduction, sections, lessons: flatLessons };
}

function createLessonItem(lesson) {
  const item = document.createElement("div");
  item.className = `lesson-item${lesson.parent ? " lesson-child" : ""}`;
  item.dataset.path = lesson.path;
  const anchor = document.createElement("a");
  anchor.className = "lesson-link";
  anchor.href = readerUrl(lesson.path);
  const number = document.createElement("span");
  number.className = "lesson-number";
  number.textContent = lesson.number;
  const name = document.createElement("span");
  name.className = "lesson-name";
  name.textContent = lesson.title;
  const arrow = document.createElement("span");
  arrow.className = "lesson-arrow";
  arrow.textContent = "›";
  arrow.setAttribute("aria-hidden", "true");
  anchor.append(number, name, arrow);
  item.append(anchor);
  if (lesson.children.length) {
    const children = document.createElement("div");
    children.className = "lesson-children";
    children.setAttribute("aria-label", `${lesson.title} lessons`);
    lesson.children.forEach((child) => children.append(createLessonItem(child)));
    item.append(children);
  }
  return item;
}

function buildOutline() {
  const nav = $("#lessons");
  nav.replaceChildren();
  if (course.introduction) {
    const label = document.createElement("p");
    label.className = "chapter-label";
    label.textContent = "START HERE";
    nav.append(label, createLessonItem(course.introduction));
  }
  if (course.sections.length) {
    const label = document.createElement("p");
    label.className = "chapter-label";
    label.textContent = `THE ${course.sections.length} SECTIONS`;
    nav.append(label);
    course.sections.forEach((section) => nav.append(createLessonItem(section)));
  }
  $("#lesson-count").textContent = `${course.sections.length} sections · introduction`;
}


function headingLinks(target, selectedHeadings) {
  target.replaceChildren();
  selectedHeadings.forEach((heading) => {
    const anchor = document.createElement("a");
    anchor.href = `#${heading.id}`;
    anchor.textContent = heading.dataset.title;
    anchor.dataset.heading = heading.id;
    target.append(anchor);
  });
}

function decorateDocument(path) {
  const ids = new Map();
  article.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((heading) => {
    const title = heading.textContent;
    const base = title
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_\- ]/gu, "")
      .replace(/ /g, "-");
    const count = ids.get(base) || 0;
    ids.set(base, count + 1);
    heading.id = count ? `${base}-${count}` : base;
    heading.dataset.title = title;
    const anchor = document.createElement("a");
    anchor.className = "heading-anchor";
    anchor.href = `#${heading.id}`;
    anchor.textContent = "#";
    anchor.setAttribute("aria-label", `Link to ${title}`);
    heading.append(anchor);
  });
  article.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (href.startsWith("#")) return;
    const resolved = documentUrl(href, path);
    if (!["http:", "https:", "mailto:"].includes(resolved.protocol)) {
      anchor.removeAttribute("href");
      return;
    }
    const videoId = resolved.searchParams.get("v");
    if (
      anchor.hasAttribute("data-youtube-embed") &&
      resolved.origin === "https://www.youtube.com" &&
      resolved.pathname === "/watch" &&
      /^[A-Za-z0-9_-]{11}$/.test(videoId)
    ) {
      const player = document.createElement("iframe");
      player.className = "youtube-player";
      player.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
      player.title = anchor.textContent;
      player.loading = "lazy";
      player.referrerPolicy = "strict-origin-when-cross-origin";
      player.allow = "encrypted-media; picture-in-picture; fullscreen";
      player.allowFullscreen = true;
      anchor.before(player);
    }
    if (resolved.origin !== location.origin) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      if (["http:", "https:"].includes(resolved.protocol)) {
        const marker = document.createElement("span");
        marker.className = "external-link-mark";
        marker.setAttribute("aria-hidden", "true");
        marker.textContent = "↗";
        const notice = document.createElement("span");
        notice.className = "sr-only";
        notice.textContent = " (external link, opens in a new tab)";
        anchor.append(marker, notice);
      }
      return;
    }
    anchor.href = resolved.href;
    if (resolved.pathname.startsWith(contentBase.pathname)) {
      let relative = decodeURIComponent(
        resolved.pathname.slice(contentBase.pathname.length),
      );
      if (relative.endsWith("/")) relative += "README.md";
      if (relative.endsWith(".md"))
        anchor.href = readerUrl(relative, resolved.hash);
    }
  });
  article.querySelectorAll("img[src]").forEach((image) => {
    image.src = documentUrl(image.getAttribute("src"), path).href;
    image.loading = "lazy";
  });
  article.querySelectorAll("table").forEach((table) => {
    const scroll = document.createElement("div");
    scroll.className = "table-scroll";
    scroll.tabIndex = 0;
    scroll.setAttribute("role", "region");
    scroll.setAttribute("aria-label", "Scrollable table");
    table.before(scroll);
    scroll.append(table);
  });
  article.querySelectorAll("pre").forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;
    const label = document.createElement("span");
    label.className = "code-language";
    label.textContent =
      [...code.classList]
        .find((name) => name.startsWith("language-"))
        ?.slice(9) || "text";
    const button = document.createElement("button");
    button.className = "copy-code";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code block");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "Copied";
      } catch {
        button.textContent = "Select to copy";
        const range = document.createRange();
        range.selectNodeContents(code);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
      setTimeout(() => {
        button.textContent = "Copy";
      }, 1800);
    });
    pre.prepend(label, button);
  });
  headings = [...article.querySelectorAll("h2")];
  if (!headings.length) headings = [...article.querySelectorAll("h3")];
  headingLinks($("#page-headings"), headings);
}

function selectOutline(path) {
  document
    .querySelectorAll(".nested-headings")
    .forEach((element) => element.remove());
  document.querySelectorAll(".lesson-item").forEach((item) => {
    const selected = item.dataset.path === path;
    const childSelected = [
      ...item.querySelectorAll(".lesson-children .lesson-item"),
    ].some((child) => child.dataset.path === path);
    item.classList.toggle("current", selected);
    item.classList.toggle("section-current", childSelected);
    const anchor = item.querySelector(":scope > .lesson-link");
    if (selected) {
      anchor.setAttribute("aria-current", "page");
      const nested = document.createElement("nav");
      nested.className = "nested-headings";
      nested.setAttribute("aria-label", "Current lesson headings");
      nested.hidden = !headingsExpanded;
      headingLinks(nested, headings);
      item.append(nested);
    } else anchor.removeAttribute("aria-current");
  });
}

function pagination(index) {
  const nav = $("#pagination");
  nav.replaceChildren();
  const entries =
    index < 0
      ? [
          {
            path: course.introduction?.path,
            title: course.introduction?.title,
            label: "START THE COURSE →",
          },
        ]
      : [
          { ...lessons[index - 1], label: "← PREVIOUS LESSON" },
          { ...lessons[index + 1], label: "NEXT LESSON →" },
        ];
  for (const entry of entries) {
    if (!entry.path) continue;
    const anchor = document.createElement("a");
    anchor.href = readerUrl(entry.path);
    const small = document.createElement("small");
    small.textContent = entry.label;
    const strong = document.createElement("strong");
    strong.textContent = entry.title;
    anchor.append(small, strong);
    nav.append(anchor);
  }
}


async function loadDocument({ focus = false, view } = {}) {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;
  const path =
    new URL(location.href).searchParams.get("doc") || defaultDocument;
  currentDocument = path;
  $("#source-link").href = contentUrl(path);
  article.setAttribute("aria-busy", "true");
  $("#title").textContent = "Loading your lesson…";
  article.replaceChildren();
  try {
    const source = await getDocument(path, signal);
    if (signal.aborted) return;
    article.innerHTML = markdown(source);
    const h1 = article.querySelector("h1");
    const title = (h1?.textContent || path.split("/").pop()).replace(
      /^\d+(?:\.\d+)*\.?\s+/,
      "",
    );
    h1?.remove();
    const index = lessons.findIndex((lesson) => lesson.path === path);
    const lesson = index >= 0 ? lessons[index] : null;
    $("#title").textContent = title;
    document.title = `${title} — Agentic engineering`;
    $("#chapter").textContent = lesson
      ? lesson.isIntroduction
        ? "INTRODUCTION"
        : `SECTION ${lesson.sectionNumber.padStart(2, "0")}`
      : "COURSE RESOURCES";
    $("#crumb").textContent = lesson
      ? lesson.isIntroduction
        ? "INTRODUCTION"
        : `SECTION ${lesson.number}`
      : path === "OUTLINE.md"
        ? "OUTLINE"
        : "RESOURCE";
    $("#lesson-position").textContent = lesson
      ? lesson.isIntroduction
        ? "Introduction"
        : `Section ${lesson.number}`
      : path === "OUTLINE.md"
        ? `${course.sections.length}-section course outline`
        : "Reference document";
    $("#read-time").textContent =
      `~${Math.max(1, Math.ceil(source.split(/\s+/).length / 220))} min read`;
    $("#read-time").title =
      "Estimated at 220 words per minute; excludes exercise time.";
    decorateDocument(path);
    selectOutline(path);
    pagination(index);
    $("#announcement").textContent = `Loaded ${title}`;
    if (focus) article.focus({ preventScroll: true });
    restoreView(view);
  } catch (error) {
    if (error.name === "AbortError") return;
    $("#title").textContent = "This page isn’t available";
    document.title = "Document unavailable — Agentic engineering";
    $("#chapter").textContent = "DOCUMENT UNAVAILABLE";
    $("#lesson-position").textContent = "Read error";
    $("#read-time").textContent = "";
    headings = [];
    $("#page-headings").replaceChildren();
    $("#pagination").replaceChildren();
    const panel = document.createElement("div");
    panel.className = "error-panel";
    const message = document.createElement("p");
    message.textContent = `${error.message} No course files have been changed.`;
    const detail = document.createElement("p");
    detail.textContent = path;
    const retry = document.createElement("button");
    retry.textContent = "Try again";
    retry.addEventListener("click", () => loadDocument());
    const back = document.createElement("a");
    back.href = readerUrl("OUTLINE.md");
    back.textContent = "Return to course outline";
    panel.append(message, detail, retry, back);
    article.append(panel);
    selectOutline(path);
    $("#announcement").textContent = error.message;
  } finally {
    if (!signal.aborted) {
      article.setAttribute("aria-busy", "false");
      updateProgress();
    }
  }
}
function saveView() {
  if (
    article.getAttribute("aria-busy") === "true" ||
    article.querySelector(".error-panel")
  ) return;
  views.set(currentEntry, {
    top: window.scrollY,
    details: [...article.querySelectorAll("details")].map((part) => part.open),
  });
}

function restoreView(view) {
  if (view) {
    article.querySelectorAll("details").forEach((part, index) => {
      part.open = view.details[index] ?? false;
    });
    window.scrollTo({ top: view.top, behavior: "instant" });
  } else if (location.hash) scrollToHash();
  else window.scrollTo({ top: 0, behavior: "instant" });
}

function scrollToHash() {
  try {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    const part = target?.closest("details");
    if (part) part.open = true;
    if (target) {
      if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: "instant" });
    }
  } catch {
    /* Invalid fragments do not prevent reading the document. */
  }
}
function updateProgress() {
  const start = article.offsetTop;
  const span = Math.max(1, article.offsetHeight - window.innerHeight + 120);
  const percent = Math.round(
    Math.max(0, Math.min(1, (window.scrollY - start + 120) / span)) * 100,
  );
  $("#progress-bar").style.width = `${percent}%`;
  $("#read-percent").textContent = `${percent}%`;
  const active =
    headings
      .filter((heading) => heading.getBoundingClientRect().top < 170)
      .at(-1) || headings[0];
  document
    .querySelectorAll("[data-heading]")
    .forEach((anchor) =>
      anchor.classList.toggle("active", anchor.dataset.heading === active?.id),
    );
}
let scheduled = false;
window.addEventListener(
  "scroll",
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        updateProgress();
      });
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateProgress);
new ResizeObserver(updateProgress).observe(article);
window.addEventListener("popstate", (event) => {
  saveView();
  currentEntry = event.state?.readerEntry || crypto.randomUUID();
  history.replaceState({ readerEntry: currentEntry }, "");
  const view = views.get(currentEntry);
  const path =
    new URL(location.href).searchParams.get("doc") || defaultDocument;
  if (path !== currentDocument) loadDocument({ view });
  else restoreView(view);
});
document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (
    !anchor ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    anchor.target
  )
    return;
  const url = new URL(anchor.href);
  if (
    url.origin !== location.origin ||
    (url.pathname !== siteBase.pathname &&
      url.pathname !== `${siteBase.pathname}index.html`) ||
    (!url.searchParams.has("doc") && !anchor.getAttribute("href").startsWith("#"))
  )
    return;
  event.preventDefault();
  saveView();
  const same =
    (url.searchParams.get("doc") || defaultDocument) === currentDocument;
  currentEntry = crypto.randomUUID();
  history.pushState({ readerEntry: currentEntry }, "", url);
  setOutline(false);
  if (same) restoreView();
  else loadDocument({ focus: true });
});

try {
  const outline = await getDocument("OUTLINE.md");
  const parsed = new DOMParser().parseFromString(
    markdown(outline),
    "text/html",
  );
  course = parseCourseOutline(parsed);
  lessons = course.lessons;
  buildOutline();
} catch (error) {
  $("#lessons").textContent = `Outline unavailable: ${error.message}`;
}
await loadDocument();
