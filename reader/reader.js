import { marked } from "/vendor/marked.js";
import DOMPurify from "/vendor/purify.js";

const $ = (selector) => document.querySelector(selector);
const article = $("#article");
const defaultDocument = "sections/introduction.md";
let lessons = [];
let currentDocument = "";
let controller;
let headings = [];
let headingsExpanded = true;
const isAlternativeDocument = (path) =>
  path.startsWith("alternatives/") ||
  (path.startsWith("sections/") && !lessons.some((lesson) => lesson.path === path));
const markdown = (source) =>
  DOMPurify.sanitize(marked.parse(source), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ["style", "form", "input", "button", "iframe"],
    FORBID_ATTR: ["style", "id", "name"],
  });
const readerUrl = (path, hash = "") =>
  `/?doc=${encodeURIComponent(path)}${hash}`;

async function getDocument(path, signal) {
  const response = await fetch(
    `/content/${path.split("/").map(encodeURIComponent).join("/")}`,
    { signal },
  );
  if (!response.ok)
    throw new Error(
      response.status === 404
        ? "This document is not present in the checkout."
        : "The reader could not load this document.",
    );
  return response.text();
}

function setOutline(open) {
  document.body.classList.toggle("outline-open", open);
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $(".menu-toggle").setAttribute(
    "aria-label",
    open ? "Close course outline" : "Open course outline",
  );
  syncOutlineAccess();
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
    $(".menu-toggle").focus();
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
});
$("#lesson-search").addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  let matches = 0;
  document.querySelectorAll(".lesson-item").forEach((item) => {
    item.hidden = !item
      .querySelector(".lesson-link")
      .textContent.toLowerCase()
      .includes(query);
    if (!item.hidden) matches++;
  });
  document.querySelectorAll(".chapter-label").forEach((label) => {
    label.hidden = Boolean(query);
  });
  $("#no-results").hidden = matches > 0;
});

function buildOutline() {
  const nav = $("#lessons");
  nav.replaceChildren();
  lessons.forEach((lesson, index) => {
    if (index === 0 || index === 2) {
      const label = document.createElement("p");
      label.className = "chapter-label";
      label.textContent = index === 0 ? "START HERE" : "THE EIGHT SECTIONS";
      nav.append(label);
    }
    const item = document.createElement("div");
    item.className = "lesson-item";
    item.dataset.path = lesson.path;
    const anchor = document.createElement("a");
    anchor.className = "lesson-link";
    anchor.href = readerUrl(lesson.path);
    const number = document.createElement("span");
    number.className = "lesson-number";
    number.textContent = index < 2 ? "—" : String(index - 1).padStart(2, "0");
    const name = document.createElement("span");
    name.className = "lesson-name";
    name.textContent = lesson.title;
    const arrow = document.createElement("span");
    arrow.className = "lesson-arrow";
    arrow.textContent = "›";
    arrow.setAttribute("aria-hidden", "true");
    anchor.append(number, name, arrow);
    item.append(anchor);
    nav.append(item);
  });
  $("#lesson-count").textContent = `${lessons.length - 2} sections · introduction + setup`;
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
  const courseMap = article.querySelector(".course-map");
  if (courseMap) {
    const parts = [...courseMap.querySelectorAll("details")];
    const toggle = document.createElement("button");
    toggle.className = "course-map-toggle";
    toggle.type = "button";
    toggle.textContent = "Expand all parts";
    let expandAll = false;
    toggle.addEventListener("click", () => {
      expandAll = !expandAll;
      parts.forEach((part) => { part.open = expandAll; });
      toggle.textContent = expandAll ? "Collapse all parts" : "Expand all parts";
    });
    parts.forEach((part) => {
      part.addEventListener("toggle", () => {
        if (part.open && !expandAll) {
          parts.forEach((other) => {
            if (other !== part) other.open = false;
          });
        }
      });
    });
    courseMap.before(toggle);
  }
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
    const resolved = new URL(href, `${location.origin}/content/${path}`);
    if (!["http:", "https:", "mailto:"].includes(resolved.protocol)) {
      anchor.removeAttribute("href");
      return;
    }
    if (resolved.origin !== location.origin) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      return;
    }
    if (resolved.pathname.startsWith("/content/")) {
      let relative = decodeURIComponent(
        resolved.pathname.slice("/content/".length),
      );
      if (relative.endsWith("/")) relative += "README.md";
      if (relative.endsWith(".md"))
        anchor.href = readerUrl(relative, resolved.hash);
      else {
        anchor.href = resolved.href;
        anchor.target = "_blank";
        anchor.rel = "noopener";
      }
    }
  });
  article.querySelectorAll("img[src]").forEach((image) => {
    image.src = new URL(
      image.getAttribute("src"),
      `${location.origin}/content/${path}`,
    ).href;
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
    item.classList.toggle("current", selected);
    const anchor = item.querySelector(".lesson-link");
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
  document.querySelectorAll(".topnav a").forEach((anchor) => {
    const selected =
      anchor.dataset.nav === "project"
        ? path === "PROJECT.md"
        : anchor.dataset.nav === "alternative"
          ? isAlternativeDocument(path)
          : path !== "PROJECT.md" && !isAlternativeDocument(path);
    anchor.classList.toggle("active", selected);
  });
}

function pagination(index) {
  const nav = $("#pagination");
  nav.replaceChildren();
  const entries =
    index < 0
      ? [
          {
            path: lessons[0]?.path,
            title: lessons[0]?.title,
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

async function loadDocument({ focus = false } = {}) {
  controller?.abort();
  controller = new AbortController();
  const { signal } = controller;
  const path =
    new URL(location.href).searchParams.get("doc") || defaultDocument;
  currentDocument = path;
  $("#source-link").href =
    `/content/${path.split("/").map(encodeURIComponent).join("/")}`;
  article.setAttribute("aria-busy", "true");
  $("#title").textContent = "Loading your lesson…";
  article.replaceChildren();
  try {
    const source = await getDocument(path, signal);
    if (signal.aborted) return;
    article.innerHTML = markdown(source);
    const h1 = article.querySelector("h1");
    const title = (h1?.textContent || path.split("/").pop()).replace(
      /^\d+\.\s*/,
      "",
    );
    h1?.remove();
    const index = lessons.findIndex((lesson) => lesson.path === path);
    const alternative = isAlternativeDocument(path);
    $("#title").textContent = title;
    document.title = `${title} — Agentic engineering`;
    $("#chapter").textContent =
      index >= 0 ? "MAIN COURSE" : alternative ? "ALTERNATIVE COURSE" : "COURSE RESOURCES";
    $("#crumb").textContent =
      index >= 0
        ? index === 0 ? "INTRODUCTION" : index === 1 ? "SETUP" : `SECTION ${String(index - 1).padStart(2, "0")}`
        : path === "OUTLINE.md" ? "OUTLINE" : alternative ? "ALTERNATIVE" : "RESOURCE";
    $("#lesson-position").textContent =
      index >= 0
        ? index === 0 ? "Introduction" : index === 1 ? "Setup" : `Section ${index - 1}`
        : path === "OUTLINE.md"
          ? "Eight-section course outline"
          : alternative ? "Alternative material" : "Reference document";
    $("#read-time").textContent =
      `~${Math.max(1, Math.ceil(source.split(/\s+/).length / 220))} min read`;
    $("#read-time").title =
      "Estimated at 220 words per minute; excludes exercise time.";
    decorateDocument(path);
    selectOutline(path);
    pagination(index);
    $("#announcement").textContent = `Loaded ${title}`;
    if (focus) article.focus({ preventScroll: true });
    if (location.hash) scrollToHash();
    else window.scrollTo({ top: 0, behavior: "instant" });
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
function scrollToHash() {
  try {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    const part = target?.closest("details");
    if (part) part.open = true;
    target?.scrollIntoView({ behavior: "instant" });
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
window.addEventListener("hashchange", scrollToHash);
window.addEventListener("popstate", () => {
  const path =
    new URL(location.href).searchParams.get("doc") || defaultDocument;
  if (path !== currentDocument) loadDocument();
  else scrollToHash();
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
  if (anchor.getAttribute("href").startsWith("#")) {
    setOutline(false);
    return;
  }
  const url = new URL(anchor.href);
  if (
    url.origin !== location.origin ||
    url.pathname !== "/" ||
    !url.searchParams.has("doc")
  )
    return;
  event.preventDefault();
  const same = url.searchParams.get("doc") === currentDocument;
  history.pushState(null, "", url);
  setOutline(false);
  if (same) {
    if (url.hash) scrollToHash();
    else window.scrollTo({ top: 0, behavior: "instant" });
  } else loadDocument({ focus: true });
});

try {
  const outline = await getDocument("OUTLINE.md");
  const parsed = new DOMParser().parseFromString(
    markdown(outline),
    "text/html",
  );
  lessons = [...parsed.querySelectorAll('.course-lessons ol a[href^="sections/"]')].map(
    (anchor) => ({
      title: anchor.textContent,
      path: anchor.getAttribute("href"),
    }),
  );
  if (!lessons.length)
    throw new Error("The course outline contains no lesson links.");
  buildOutline();
} catch (error) {
  $("#lessons").textContent = `Outline unavailable: ${error.message}`;
}
await loadDocument();
