import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const FloatingDock = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-12 md:h-16 items-center md:items-end gap-2 md:gap-4 rounded-2xl bg-gray-50/80 backdrop-blur-md border border-gray-200/50 px-3 md:px-4 py-2 md:pb-3 dark:bg-neutral-900/80 dark:border-neutral-800/50",
        className
      )}
    >
      {items.map((item, idx) => {
        if (item.separator) {
          return (
            <div
              key={`sep-${idx}`}
              className="h-6 md:h-8 w-px bg-neutral-200 dark:bg-neutral-800 mx-0.5 md:mx-1"
            />
          );
        }
        return <IconContainer mouseX={mouseX} key={item.title} {...item} />;
      })}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const isExternal = href.startsWith("http") || href === "#";
  const Component = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? {
        href,
        "aria-label": title,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : { to: href, "aria-label": title };

  return (
    <Component {...linkProps} onClick={onClick}>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800 w-10 h-10 md:w-auto md:h-auto"
        style={{
          width: typeof window !== "undefined" && window.innerWidth >= 768 ? width : undefined,
          height: typeof window !== "undefined" && window.innerWidth >= 768 ? height : undefined,
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="hidden md:block absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="flex items-center justify-center w-4 h-4 md:w-auto md:h-auto"
          style={{
            width:
              typeof window !== "undefined" && window.innerWidth >= 768 ? widthIcon : undefined,
            height:
              typeof window !== "undefined" && window.innerWidth >= 768 ? heightIcon : undefined,
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </Component>
  );
}
