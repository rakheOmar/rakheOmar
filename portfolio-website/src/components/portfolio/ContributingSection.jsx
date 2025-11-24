import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "rakheOmar";

export default function ContributingSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
        );
        const result = await response.json();
        const today = new Date();
        const twelveMonthsAgo = new Date(today);
        twelveMonthsAgo.setMonth(today.getMonth() - 8);
        const filteredData = result.contributions.filter(
          (contribution) => new Date(contribution.date) >= twelveMonthsAgo
        );
        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0 && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data]);

  if (loading) {
    return (
      <section id="contributions">
        <h2 className="text-xl font-bold text-foreground font-serif mb-3">Contributions</h2>
        <p className="text-sm text-muted-foreground">Loading contributions...</p>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section id="contributions">
        <h2 className="text-xl font-bold text-foreground font-serif mb-3">Contributions</h2>
        <p className="text-sm text-muted-foreground">No contributions found.</p>
      </section>
    );
  }

  return (
    <section id="contributions">
      <motion.h2
        className="text-xl font-bold text-foreground font-serif mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Contributions
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
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
      </motion.div>
    </section>
  );
}
