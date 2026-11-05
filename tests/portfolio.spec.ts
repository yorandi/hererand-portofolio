import { expect, test, type Page } from "@playwright/test";

async function noOverflow(page: Page) {
    const layout = await page.evaluate(() => ({
        width: window.innerWidth,
        scroll: document.documentElement.scrollWidth,
        overflowing: Array.from(document.querySelectorAll("body *"))
            .filter(
                (element) =>
                    element.getBoundingClientRect().right >
                    window.innerWidth + 1,
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

test("small screens do not overflow in either theme", async ({ page }) => {
    test.setTimeout(60_000);
    for (const width of [320, 390, 768, 1024]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ["/", "/web-developer/", "/data-engineer/"]) {
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
