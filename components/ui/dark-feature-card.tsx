"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DarkFeatureCardProps {
  icon?: LucideIcon;
  iconElement?: ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: "default" | "hover-lift" | "hover-glow" | "compact";
  iconColor?: string;
  onClick?: () => void;
}

export function DarkFeatureCard({
  icon: Icon,
  iconElement,
  title,
  description,
  className,
  variant = "default",
  iconColor = "text-purple-400",
  onClick,
}: DarkFeatureCardProps) {
  const isInteractive = !!onClick;

  const variantStyles = {
    default: "p-6",
    "hover-lift": "p-6 hover:-translate-y-1",
    "hover-glow": "p-6 hover:shadow-glow",
    compact: "p-4",
  };

  return (
    <motion.div
      className={cn(
        "card-dark card-dark-hover rounded-xl",
        variantStyles[variant],
        isInteractive && "cursor-pointer",
        className
      )}
      whileHover={{ scale: isInteractive ? 1.02 : 1 }}
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {/* Icon */}
      <div className="mb-4">
        {iconElement ? (
          iconElement
        ) : Icon ? (
          <div
            className={cn(
              "inline-flex items-center justify-center w-12 h-12 rounded-lg bg-dark-800/50 border border-dark-700",
              iconColor
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
        ) : null}
      </div>

      {/* Title */}
      <h3 className="heading-dark text-lg mb-2">{title}</h3>

      {/* Description */}
      <p className="body-dark text-sm">{description}</p>
    </motion.div>
  );
}

// Feature Grid Container
export interface FeatureGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export function FeatureGrid({
  children,
  columns = 3,
  gap = "md",
  className,
}: FeatureGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const gridGap = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <div className={cn("grid", gridCols[columns], gridGap[gap], className)}>
      {children}
    </div>
  );
}

// Icon Grid for integrations/frameworks section
export interface IconCardProps {
  icon: ReactNode;
  label: string;
  href?: string;
  className?: string;
}

export function IconCard({ icon, label, href, className }: IconCardProps) {
  const Component = href ? motion.a : motion.div;
  const linkProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...linkProps}
      className={cn(
        "flex flex-col items-center justify-center p-6 rounded-xl card-dark card-dark-hover group",
        href && "cursor-pointer",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="mb-3 text-dark-400 group-hover:text-purple-400 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-dark-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </Component>
  );
}

// Large feature section with image/graphic
export interface FeatureSectionProps {
  title: string;
  description: string;
  graphic?: ReactNode;
  graphicPosition?: "left" | "right";
  features?: Array<{
    icon?: LucideIcon;
    title: string;
    description: string;
  }>;
  className?: string;
}

export function FeatureSection({
  title,
  description,
  graphic,
  graphicPosition = "right",
  features,
  className,
}: FeatureSectionProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
        className
      )}
    >
      {/* Content */}
      <div
        className={cn(
          "space-y-6",
          graphicPosition === "right" ? "lg:order-1" : "lg:order-2"
        )}
      >
        <div className="space-y-4">
          <h2 className="heading-dark text-4xl">{title}</h2>
          <p className="body-dark text-lg">{description}</p>
        </div>

        {features && features.length > 0 && (
          <div className="space-y-4 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                {feature.icon && (
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-purple-950/30 border border-purple-600/30 flex items-center justify-center text-purple-400">
                      <feature.icon className="w-5 h-5" />
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="subheading-dark text-base mb-1">
                    {feature.title}
                  </h4>
                  <p className="caption-dark text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Graphic */}
      {graphic && (
        <div
          className={cn(
            "flex items-center justify-center",
            graphicPosition === "right" ? "lg:order-2" : "lg:order-1"
          )}
        >
          {graphic}
        </div>
      )}
    </div>
  );
}
