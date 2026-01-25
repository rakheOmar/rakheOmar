"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import React, { memo, useCallback, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

const DOCK_SIZE = 40;
const DOCK_MAGNIFICATION = 60;
const DOCK_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/10"
);

const SPRING_CONFIG = {
  mass: 0.1,
  stiffness: 150,
  damping: 12,
};

export interface DockProps
  extends React.ComponentProps<typeof motion.div>,
    VariantProps<typeof dockVariants> {
  children?: React.ReactNode;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  disableMagnification?: boolean;
  direction?: "top" | "middle" | "bottom";
}

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DOCK_SIZE,
      iconMagnification = DOCK_MAGNIFICATION,
      iconDistance = DOCK_DISTANCE,
      disableMagnification = false,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

    const handleMouseMove = useCallback(
      (e: any) => mouseX.set(e.pageX),
      [mouseX]
    );

    const handleMouseLeave = useCallback(
      () => mouseX.set(Number.POSITIVE_INFINITY),
      [mouseX]
    );

    const renderedChildren = useMemo(() => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...(child.props as any),
            disableMagnification,
            distance: iconDistance,
            magnification: iconMagnification,
            mouseX,
            size: iconSize,
          } as DockIconProps);
        }
        return child;
      });
    }, [
      children,
      mouseX,
      iconSize,
      iconMagnification,
      iconDistance,
      disableMagnification,
    ]);

    const directionClass = useMemo(() => {
      if (direction === "top") {
        return "items-start";
      }
      if (direction === "bottom") {
        return "items-end";
      }
      return "items-center";
    }, [direction]);

    return (
      <motion.div
        className={cn(dockVariants(), directionClass, className)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={ref}
        {...props}
      >
        {renderedChildren as React.ReactNode}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps extends React.ComponentProps<typeof motion.div> {
  size?: number;
  magnification?: number;
  distance?: number;
  disableMagnification?: boolean;
  mouseX?: MotionValue<number>;
}

const DockIcon = memo(
  ({
    size = DOCK_SIZE,
    magnification = DOCK_MAGNIFICATION,
    distance = DOCK_DISTANCE,
    disableMagnification = false,
    mouseX,
    className,
    children,
    ...props
  }: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const defaultMouseX = useMotionValue(Number.POSITIVE_INFINITY);
    const activeMouseX = mouseX ?? defaultMouseX;

    const distanceCalc = useTransform(activeMouseX, (val) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
      return val - bounds.x - bounds.width / 2;
    });

    const targetSize = disableMagnification ? size : magnification;

    const sizeTransform = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [size, targetSize, size]
    );

    const scaleSize = useSpring(sizeTransform, SPRING_CONFIG);

    const padding = useMemo(() => Math.max(6, size * 0.2), [size]);

    return (
      <motion.div
        className={cn(
          "flex aspect-square cursor-pointer items-center justify-center rounded-full bg-background/40 backdrop-blur-sm",
          className
        )}
        ref={ref}
        style={{ width: scaleSize, height: scaleSize, padding }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

DockIcon.displayName = "DockIcon";

const DockSeparator = memo(
  ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn("mx-1 h-8 w-px rounded-full bg-border", className)}
      {...props}
    />
  )
);

DockSeparator.displayName = "DockSeparator";

export { Dock, DockIcon, DockSeparator, dockVariants };
