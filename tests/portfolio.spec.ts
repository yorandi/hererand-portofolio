import { expect, test, type Page } from "@playwright/test";

async function noOverflow(page: Page) {
  const layout = await page.evaluate(() => ({
    width: window.innerWidth,
    scroll: document.documentElement.scrollWidth,
    overflowing: Array.from(document.querySelectorAll("body *"))
      .filter(
        (element) =>
          element.getBoundingClientRect().right > window.innerWidth + 1,
      )
      .map((element) => element.className)
      .slice(0, 10),
  }));
  expect(layout.scroll, JSON.stringify(layout)).toBeLessThanOrEqual(
    layout.width,
  );
}

test("selector morphs into either route and supports browser history", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I’m Randi.",
  );
  await expect(page.getByAltText("Portrait of Randi Fauzi")).toBeVisible();
  if (page.viewportSize()!.width >= 1000) {
    await expect(
      page.getByRole("heading", { name: "Web Developer", exact: true }),
    ).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Data Engineer", exact: true }),
    ).toBeInViewport();
  }
  await page
    .getByRole("link", {
      name: "Explore Web Developer portfolio",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/web-developer\//);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Building digital experiences through code.",
  );
  await expect(
    page.getByRole("button", { name: "CV coming soon" }),
  ).toBeDisabled();
  await page.waitForTimeout(800);
  await noOverflow(page);
  await page.getByRole("link", { name: "Switch Expertise" }).click();
  await page
    .getByRole("link", {
      name: "Explore Data Engineer portfolio",
      exact: true,
    })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Turning data into meaningful solutions.",
  );
  await page.waitForTimeout(800);
  await noOverflow(page);
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hi, I’m Randi.",
  );
  await page.goForward();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Turning data into meaningful solutions.",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  expect(errors).toEqual([]);
});

for (const [route, title] of [
  ["web-developer", "Building digital experiences through code."],
  ["data-engineer", "Turning data into meaningful solutions."],
]) {
  test(`direct ${route} access, refresh, content, and navigation`, async ({
    page,
  }, testInfo) => {
    const response = await page.goto(`/${route}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    if (testInfo.project.name === "mobile") {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Portfolio sections" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
      await page.getByRole("button", { name: "Open navigation" }).click();
    }
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Skills", exact: true })
      .click();
    await expect(page).toHaveURL(/#skills$/);
    await expect(page.locator("#skills")).toBeInViewport();
    await page.getByRole("link", { name: "HERERAND home" }).first().click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Hi, I’m Randi.",
    );
    await page.waitForTimeout(800);
    await noOverflow(page);
  });
}

test("theme respects system preference and persists across reload and navigation", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("link", {
      name: "Explore Web Developer portfolio",
      exact: true,
    })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.waitForTimeout(800);
  await noOverflow(page);
});

test("reduced motion and keyboard selection remain usable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.getByRole("link", {
    name: "Explore Data Engineer portfolio",
    exact: true,
  });
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Turning data into meaningful solutions.",
  );
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await expect(
    page.getByText("No verified credentials published yet.", {
      exact: false,
    }),
  ).toBeVisible();
});

test("capture homepage and expertise visual review artifacts", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-home-light.png`,
    fullPage: true,
  });
  await page
    .getByRole("link", {
      name: "Explore Web Developer portfolio",
      exact: true,
    })
    .click();
  await page.waitForTimeout(900);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-web-dark.png`,
  });
});

const sectionHeadings = [
  "Why I built this.",
  "What I built.",
  "How to use it.",
  "A closer look.",
];

const projectRoutes = [
  ["web-developer", "job-application-tracker", "Job Application Tracker"],
  [
    "web-developer",
    "palm-vein-payment-prototype",
    "Palm-Vein Digital Payment Prototype",
  ],
  [
    "data-engineer",
    "bank-transaction-clustering",
    "Bank Transaction Clustering",
  ],
  ["data-engineer", "data-pipeline-project", "Data Pipeline Project"],
];

test("project card opens its case study and returns to the projects section", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/web-developer/");
  await page
    .getByRole("link", { name: "Read case study: Job Application Tracker" })
    .click();
  await expect(page).toHaveURL(
    /\/web-developer\/projects\/job-application-tracker\/$/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Job Application Tracker",
  );
  for (const name of sectionHeadings) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  await page.waitForTimeout(600);
  await noOverflow(page);
  await page.getByRole("link", { name: "Back to projects" }).click();
  await expect(page).toHaveURL(/\/web-developer\/#projects$/);
  await expect(page.locator("#projects")).toBeInViewport();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Job Application Tracker",
  );
  expect(errors).toEqual([]);
});

for (const [route, slug, name] of projectRoutes) {
  test(`direct case study access: ${route}/${slug}`, async ({ page }) => {
    const response = await page.goto(`/${route}/projects/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(name);
    for (const heading of sectionHeadings.slice(0, 1)) {
      await expect(
        page.getByRole("heading", { level: 2, name: heading }),
      ).toBeVisible();
    }
    await expect(
      page.getByRole("navigation", { name: "More projects" }),
    ).toBeVisible();
    await page.waitForTimeout(600);
    await noOverflow(page);
  });
}

test("case study pager moves between projects", async ({ page }) => {
  await page.goto("/web-developer/projects/job-application-tracker/");
  await page
    .getByRole("navigation", { name: "More projects" })
    .getByRole("link", { name: /Next project/ })
    .click();
  await expect(page).toHaveURL(/\/projects\/palm-vein-payment-prototype\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Palm-Vein Digital Payment Prototype",
  );
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
});

test("certificates show the skills gained in the web developer section", async ({
  page,
}) => {
  await page.goto("/web-developer/");
  const card = page
    .locator(".certificate-card")
    .filter({ hasText: "Responsive Web Design" });
  await expect(card).toBeVisible();
  await expect(card.getByText("SKILLS GAINED")).toBeVisible();
  await expect(card.getByText("Flexbox", { exact: true })).toBeVisible();
  await expect(card.getByText("Completed · evidence pending")).toBeVisible();
});

test("activity section shows GitHub and the platforms for each expertise", async ({
  page,
}) => {
  await page.goto("/web-developer/");
  const web = page.locator("#activity");
  await expect(
    web.getByRole("heading", { level: 2, name: "Practice, in the open." }),
  ).toBeVisible();
  await expect(
    web.getByRole("link", { name: "View profile" }).first(),
  ).toHaveAttribute("href", "https://github.com/yorandi");
  await expect(web.getByRole("heading", { name: "Boot.dev" })).toBeVisible();
  await expect(
    web.getByRole("heading", { name: "freeCodeCamp" }),
  ).toBeVisible();
  await expect(web.getByRole("heading", { name: "DataCamp" })).toHaveCount(0);

  await page.goto("/data-engineer/");
  const data = page.locator("#activity");
  await expect(
    data.getByRole("heading", { level: 2, name: "Learning in public." }),
  ).toBeVisible();
  await expect(data.getByRole("heading", { name: "DataCamp" })).toBeVisible();
  await expect(data.getByRole("heading", { name: "Boot.dev" })).toHaveCount(0);
});

test("activity navigation link scrolls to the section", async ({
  page,
}, testInfo) => {
  await page.goto("/web-developer/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
  }
  await page
    .getByRole("navigation", { name: "Portfolio sections" })
    .getByRole("link", { name: "Activity", exact: true })
    .click();
  await expect(page).toHaveURL(/#activity$/);
  await expect(page.locator("#activity")).toBeInViewport();
});

test("small screens do not overflow in either theme", async ({ page }) => {
  test.setTimeout(60_000);
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/web-developer/",
      "/data-engineer/",
      "/web-developer/projects/job-application-tracker/",
      "/data-engineer/projects/data-pipeline-project/",
    ]) {
      await page.goto(route);
      await page.waitForTimeout(600);
      for (const theme of ["light", "dark"]) {
        await page.evaluate((value) => {
          document.documentElement.dataset.theme = value;
        }, theme);
        await noOverflow(page);
      }
    }
  }
});
