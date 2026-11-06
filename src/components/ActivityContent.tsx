import { ArrowUpRight, GitBranch, Github } from "lucide-react";
import {
  activityConfig,
  platforms,
  platformsByExpertise,
  type LearningPlatform,
} from "@/data/activity";
import type { ExpertiseId } from "@/data/portfolio";
import type {
  ActivityData,
  BootDevActivity,
  GithubActivity,
} from "@/lib/activity";

const number = (value: number) => value.toLocaleString("en-US");
const monthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
const fullDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_HEIGHT = 16;

function Heatmap({
  weeks,
  total,
}: {
  weeks: GithubActivity["weeks"];
  total: number;
}) {
  const max = Math.max(1, ...weeks.flat().map((day) => day.count));
  const level = (count: number) =>
    count === 0 ? 0 : Math.min(4, Math.ceil((count / max) * 4));
  const months: { x: number; label: string }[] = [];
  let lastMonth = "";
  weeks.forEach((week, index) => {
    const first = week[0];
    if (!first) return;
    const month = new Date(first.date).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    if (month === lastMonth) return;
    lastMonth = month;
    const x = index * STEP;
    const previous = months[months.length - 1];
    // Drop labels that would overlap the previous one (e.g. a partial first month).
    if (previous && x - previous.x < 3 * STEP) months.pop();
    months.push({ x, label: month });
  });
  const width = weeks.length * STEP - GAP;
  // A label this close to the right edge would be clipped.
  while (months.length && months[months.length - 1].x > width - 2 * STEP)
    months.pop();
  const height = LABEL_HEIGHT + 7 * STEP - GAP;
  return (
    <div className="heatmap-scroll">
      <svg
        className="heatmap"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${number(total)} contributions on GitHub in the last year`}
        focusable="false"
      >
        {months.map((month) => (
          <text key={`${month.x}-${month.label}`} x={month.x} y={9}>
            {month.label}
          </text>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <rect
              key={day.date}
              className={`heat-${level(day.count)}`}
              x={weekIndex * STEP}
              y={LABEL_HEIGHT + dayIndex * STEP}
              width={CELL}
              height={CELL}
              rx="2"
            >
              <title>{`${day.count} contribution${day.count === 1 ? "" : "s"} on ${fullDate(day.date)}`}</title>
            </rect>
          )),
        )}
      </svg>
    </div>
  );
}

function GithubPanel({ result }: { result: ActivityData["github"] }) {
  const { username, url } = activityConfig.github;
  return (
    <article className="activity-panel github-panel">
      <header className="activity-panel-head">
        <div>
          <p className="eyebrow">GITHUB · @{username}</p>
          <h3>Code, commit by commit.</h3>
        </div>
        <a
          className="activity-link"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          View profile <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </header>
      {result.ok ? (
        <>
          <dl className="activity-stats">
            <div>
              <dt>Contributions · last 12 months</dt>
              <dd>{number(result.data.totalContributions)}</dd>
            </div>
            <div>
              <dt>Public repositories · excl. forks</dt>
              <dd>{number(result.data.publicRepos)}</dd>
            </div>
          </dl>
          <Heatmap
            weeks={result.data.weeks}
            total={result.data.totalContributions}
          />
          <div className="heatmap-legend" aria-hidden="true">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((n) => (
              <i key={n} className={`heat-${n}`} />
            ))}
            <span>More</span>
          </div>
          {result.data.recentRepos.length > 0 && (
            <>
              <p className="eyebrow recent-label">
                RECENTLY ACTIVE REPOSITORIES
              </p>
              <ul className="repo-list">
                {result.data.recentRepos.map((repo) => (
                  <li key={repo.name}>
                    <a href={repo.url} target="_blank" rel="noreferrer">
                      <GitBranch size={15} aria-hidden="true" />
                      <span className="repo-name">{repo.name}</span>
                      <span className="repo-meta">
                        {repo.language ?? "—"} · {monthYear(repo.pushedAt)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="activity-source">
            Source: GitHub API · fetched at build on{" "}
            {fullDate(result.fetchedAt)}
          </p>
        </>
      ) : (
        <p className="empty-note">
          Live GitHub activity is unavailable right now. See the full
          contribution history on my GitHub profile.
        </p>
      )}
    </article>
  );
}

function BootDevStats({ result }: { result: ActivityData["bootdev"] }) {
  if (!result.ok)
    return (
      <p className="activity-source">Live stats are unavailable right now.</p>
    );
  const data: BootDevActivity = result.data;
  return (
    <>
      <dl className="platform-stats">
        <div>
          <dt>Level</dt>
          <dd>{data.level}</dd>
        </div>
        <div>
          <dt>XP</dt>
          <dd>{number(data.xp)}</dd>
        </div>
        {data.role && (
          <div>
            <dt>Role</dt>
            <dd>{data.role}</dd>
          </div>
        )}
        <div>
          <dt>Joined</dt>
          <dd>{monthYear(data.joinedAt)}</dd>
        </div>
      </dl>
      <p className="activity-source">
        Source: Boot.dev public profile · fetched at build on{" "}
        {fullDate(result.fetchedAt)}
      </p>
    </>
  );
}

function PlatformCard({
  platform,
  activity,
}: {
  platform: LearningPlatform;
  activity: ActivityData;
}) {
  return (
    <article className="platform-card">
      <header>
        <div>
          <p className="eyebrow">
            {platform.mode === "live"
              ? "LEARNING PLATFORM · LIVE STATS"
              : "LEARNING PLATFORM"}
          </p>
          <h3>{platform.name}</h3>
          {platform.handle && (
            <p className="platform-handle">@{platform.handle}</p>
          )}
        </div>
      </header>
      <p className="platform-description">{platform.description}</p>
      {platform.id === "bootdev" && <BootDevStats result={activity.bootdev} />}
      <div className="platform-footer">
        {platform.url ? (
          <a
            className="activity-link"
            href={platform.url}
            target="_blank"
            rel="noreferrer"
          >
            View profile <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : (
          <span className="missing-link">Profile link to be added</span>
        )}
      </div>
    </article>
  );
}

export function ActivityContent({
  expertiseId,
  activity,
}: {
  expertiseId: ExpertiseId;
  activity: ActivityData;
}) {
  const items = platformsByExpertise[expertiseId].map((id) => platforms[id]);
  return (
    <div className="activity-layout">
      <GithubPanel result={activity.github} />
      <div className="platform-grid">
        {items.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            activity={activity}
          />
        ))}
      </div>
      <p className="activity-footnote">
        <Github size={14} aria-hidden="true" /> Activity reflects public data
        only. Streaks, XP, and levels are what each platform reports, not a
        measure of proficiency.
      </p>
    </div>
  );
}
