/*
 * Build-time activity data. This module is only imported by the root layout
 * (a server component) and runs during `next build`, so GH_API_TOKEN never
 * reaches the browser. Client code must use `import type` from this file.
 *
 * Every fetcher is failure-tolerant: on any problem it returns `ok: false`
 * and the UI falls back to a plain link, so a flaky API can't break the site.
 */
import { activityConfig, platforms } from "@/data/activity";

export type Result<T> = { ok: true; data: T; fetchedAt: string } | { ok: false };

export interface ContributionDay {
    date: string;
    count: number;
}

export interface GithubRepo {
    name: string;
    url: string;
    language: string | null;
    pushedAt: string;
}

export interface GithubActivity {
    username: string;
    totalContributions: number;
    weeks: ContributionDay[][];
    publicRepos: number;
    recentRepos: GithubRepo[];
}

export interface BootDevActivity {
    handle: string;
    level: number;
    xp: number;
    role: string;
    joinedAt: string;
}

export interface ActivityData {
    github: Result<GithubActivity>;
    bootdev: Result<BootDevActivity>;
}

const TIMEOUT_MS = 15_000;

async function getJson(url: string, init: RequestInit = {}): Promise<unknown> {
    const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "User-Agent": "hererand-portfolio", ...init.headers },
    });
    if (!response.ok) throw new Error(`${url} responded ${response.status}`);
    return response.json();
}

const githubQuery = `
query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
    repositories(first: 5, privacy: PUBLIC, isFork: false, orderBy: { field: PUSHED_AT, direction: DESC }) {
      totalCount
      nodes { name url pushedAt primaryLanguage { name } }
    }
  }
}`;

interface GithubResponse {
    data?: {
        user?: {
            contributionsCollection: {
                contributionCalendar: {
                    totalContributions: number;
                    weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
                };
            };
            repositories: {
                totalCount: number;
                nodes: { name: string; url: string; pushedAt: string; primaryLanguage: { name: string } | null }[];
            };
        };
    };
}

async function fetchGithub(): Promise<Result<GithubActivity>> {
    const token = process.env.GH_API_TOKEN;
    if (!token) {
        console.warn("[activity] GH_API_TOKEN is not set; skipping live GitHub data.");
        return { ok: false };
    }
    try {
        const { username } = activityConfig.github;
        const json = (await getJson("https://api.github.com/graphql", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ query: githubQuery, variables: { login: username } }),
        })) as GithubResponse;
        const user = json.data?.user;
        if (!user) throw new Error("GitHub returned no user");
        const calendar = user.contributionsCollection.contributionCalendar;
        return {
            ok: true,
            fetchedAt: new Date().toISOString(),
            data: {
                username,
                totalContributions: calendar.totalContributions,
                weeks: calendar.weeks.map(week =>
                    week.contributionDays.map(day => ({ date: day.date, count: day.contributionCount })),
                ),
                publicRepos: user.repositories.totalCount,
                recentRepos: user.repositories.nodes.map(node => ({
                    name: node.name,
                    url: node.url,
                    language: node.primaryLanguage?.name ?? null,
                    pushedAt: node.pushedAt,
                })),
            },
        };
    } catch (error) {
        console.warn("[activity] GitHub fetch failed:", error instanceof Error ? error.message : error);
        return { ok: false };
    }
}

interface BootDevResponse {
    status?: string;
    data?: { xp?: number; level?: number; role?: string; createdAt?: string; handle?: string };
}

/** Unofficial public endpoint; validated defensively because it may change. */
async function fetchBootDev(): Promise<Result<BootDevActivity>> {
    const handle = platforms.bootdev.handle;
    if (!handle) return { ok: false };
    try {
        const json = (await getJson(`https://api.boot.dev/v1/users/public/${encodeURIComponent(handle)}`)) as BootDevResponse;
        const d = json.data;
        if (json.status !== "success" || !d || typeof d.xp !== "number" || typeof d.level !== "number" || !d.createdAt) {
            throw new Error("unexpected Boot.dev response shape");
        }
        return {
            ok: true,
            fetchedAt: new Date().toISOString(),
            data: { handle, level: d.level, xp: d.xp, role: d.role ?? "", joinedAt: d.createdAt },
        };
    } catch (error) {
        console.warn("[activity] Boot.dev fetch failed:", error instanceof Error ? error.message : error);
        return { ok: false };
    }
}

let cached: Promise<ActivityData> | undefined;

/** Memoised per build process so each page's layout render reuses one fetch. */
export function getActivity(): Promise<ActivityData> {
    cached ??= Promise.all([fetchGithub(), fetchBootDev()]).then(([github, bootdev]) => ({ github, bootdev }));
    return cached;
}
