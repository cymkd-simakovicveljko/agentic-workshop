// Run in the browser console on the local or published reader. No test dependencies needed.
(async () => {
  const waitFor = async (condition) => {
    const deadline = performance.now() + 5000;
    while (!condition()) {
      if (performance.now() > deadline) throw new Error("Reader check timed out");
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  };
  const settle = () => new Promise((resolve) => setTimeout(resolve, 100));
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const loaded = (path) =>
    new URL(location.href).searchParams.get("doc") === path &&
    document.querySelector("#article").getAttribute("aria-busy") === "false";
  const visit = async (path) => {
    document.querySelector(`.lesson-item[data-path="${path}"] > a`).click();
    await waitFor(() => loaded(path));
    await settle();
  };
  const context = "sections/foundations/context.md";
  const models = "sections/foundations/models.md";
  await visit(context);
  scrollTo({ top: 2200, behavior: "instant" });
  await settle();
  const previousY = scrollY;
  await visit(models);
  history.back();
  await waitFor(() => loaded(context));
  await settle();
  assert(Math.abs(scrollY - previousY) < 2, `Back lost position: ${previousY} → ${scrollY}`);
  history.forward();
  await waitFor(() => loaded(models));
  await settle();
  assert(scrollY === 0, "Forward did not restore the destination position");

  await visit("sections/01-getting-started-with-omp.md");
  const summary = document.querySelector("#article details summary");
  summary.closest("details").open = false;
  summary.scrollIntoView({ block: "center", behavior: "instant" });
  await settle();
  summary.click();
  await settle();
  const article = document.querySelector("#article");
  const expected = Math.round(
    Math.max(0, Math.min(1, (scrollY - article.offsetTop + 120) /
      Math.max(1, article.offsetHeight - innerHeight + 120))) * 100,
  );
  assert(document.querySelector("#read-percent").textContent === `${expected}%`,
    "Reading progress did not update after expanding a disclosure");
  const headingLink = document.querySelector('#page-headings a[href="#install-omp"]');
  headingLink.click();
  await settle();
  assert(headingLink.classList.contains("active"),
    "Heading navigation highlighted the previous section");
  document.querySelector(".skip").click();
  assert(document.activeElement === article, "Skip to lesson did not move keyboard focus");
  if (matchMedia("(max-width: 850px)").matches) {
    const menu = document.querySelector(".menu-toggle");
    menu.click();
    document.querySelector("#lesson-search").focus();
    document.querySelector(".backdrop").click();
    assert(document.activeElement === menu, "Closing the outline lost keyboard focus");
  }
  const sdd = "sections/spec-driven-development/index.md";
  await visit(sdd);
  const initialPanels = [...article.querySelectorAll("details")].map((part) => part.open);
  await visit(context);
  const fetchDocument = window.fetch;
  try {
    window.fetch = (url, options) => new URL(url, location.href).href ===
      new URL(`content/${sdd}`, new URL("./", location.href)).href
      ? Promise.resolve(new Response("Temporary failure", { status: 503 }))
      : fetchDocument(url, options);
    await visit(sdd);
    assert(article.querySelector(".error-panel"), "The simulated document failure was not shown");
  } finally {
    window.fetch = fetchDocument;
  }
  await visit(context);
  history.back();
  await waitFor(() => loaded(sdd));
  assert([...article.querySelectorAll("details")].every((part, index) =>
    part.open === initialPanels[index]), "Error recovery changed the lesson's initial disclosures");
  console.log("Reader checks passed: history, progress, headings, keyboard focus, and error recovery.");
})();
