import React from "react";
import { cn } from "@/utils";
import { CardProps } from "@/types";

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = "md",
  ...props
}) => {
  const baseClasses =
    "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-secondary-200 dark:border-gray-700 transition-colors duration-200";

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(baseClasses, paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
