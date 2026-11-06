import type { ExpertiseId } from "./portfolio";

export type PlatformId = "bootdev" | "freecodecamp" | "datacamp";

export interface LearningPlatform {
    id: PlatformId;
    name: string;
    /** Handle on the platform, if known. */
    handle?: string;
    /** Public profile URL. Leave undefined until verified. */
    url?: string;
    /** What the platform is and what has actually been done there. Facts only. */
    description: string;
    /** "live" platforms are enriched with data fetched at build time. */
    mode: "live" | "manual";
}

export const activityConfig = {
    github: {
        username: "yorandi",
        url: "https://github.com/yorandi",
    },
};

export const platforms: Record<PlatformId, LearningPlatform> = {
    bootdev: {
        id: "bootdev",
        name: "Boot.dev",
        handle: "yorand",
        url: "https://www.boot.dev/u/yorand",
        description: "Hands-on, gamified backend development courses.",
        mode: "live",
    },
    freecodecamp: {
        id: "freecodecamp",
        name: "freeCodeCamp",
        handle: "yorand",
        url: "https://www.freecodecamp.org/yorand",
        description:
            "Free web development curriculum. Completed the Responsive Web Design course; credential evidence is still pending.",
        mode: "manual",
    },
    datacamp: {
        id: "datacamp",
        name: "DataCamp",
        description:
            "Interactive data and AI courses. Completed the GitHub Foundations course, which is not an official GitHub certification.",
        mode: "manual",
    },
};

/** Which learning platforms appear on each expertise page. GitHub is shown on both. */
export const platformsByExpertise: Record<ExpertiseId, PlatformId[]> = {
    "web-developer": ["bootdev", "freecodecamp"],
    "data-engineer": ["datacamp"],
};
