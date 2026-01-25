"use client";

import { useEffect, useRef, useState } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/ui/contribution-graph";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface ContributionData {
  date: string;
  count: number;
  level: number;
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[140px] w-full rounded-md" />
      <div className="flex items-center justify-between px-1">
        <Skeleton className="h-4 w-24" />
        <div className="flex gap-1">
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-3 w-3 rounded-sm" />
          <Skeleton className="h-3 w-3 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function NoContributions() {
  return (
    <p className="text-muted-foreground text-sm">No contributions found.</p>
  );
}

export function GithubContributionsGraph({ username }: { username: string }) {
  const [data, setData] = useState<ContributionData[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}`
        );
        const result = await response.json();
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setMonth(today.getMonth() - 8);

        const filteredData = result.contributions.filter(
          (contribution: { date: string }) =>
            new Date(contribution.date) >= pastDate
        );
        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  useEffect(() => {
    if (!loading && data.length > 0 && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (data.length === 0) {
    return <NoContributions />;
  }

  return (
    <div>
      <ContributionGraph data={data}>
        <div ref={scrollRef}>
          <ContributionGraphCalendar>
            {({ activity, dayIndex, weekIndex }) => (
              <ContributionGraphBlock
                activity={activity}
                className={cn(
                  'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                  'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                  'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                  'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                  'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                )}
                dayIndex={dayIndex}
                weekIndex={weekIndex}
              />
            )}
          </ContributionGraphCalendar>
        </div>
        <ContributionGraphFooter>
          <ContributionGraphTotalCount />
          <ContributionGraphLegend>
            {({ level }) => (
              <svg height={12} width={12}>
                <title>{`Level ${level} contributions`}</title>
                <rect
                  className={cn(
                    "stroke-[1px] stroke-border",
                    'data-[level="0"]:fill-[#ebedf0] dark:data-[level="0"]:fill-[#161b22]',
                    'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
                    'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
                    'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
                    'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                  )}
                  data-level={level}
                  height={12}
                  rx={2}
                  ry={2}
                  width={12}
                />
              </svg>
            )}
          </ContributionGraphLegend>
        </ContributionGraphFooter>
      </ContributionGraph>
    </div>
  );
}
