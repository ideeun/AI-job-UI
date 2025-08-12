import React from "react";
import { cn } from "@/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-3 py-2 border border-secondary-300 dark:border-gray-600 rounded-md shadow-sm",
          "placeholder-secondary-400 dark:placeholder-gray-400 bg-white dark:bg-gray-800 text-secondary-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-offset-gray-900",
          "transition-colors duration-200 resize-vertical min-h-[100px]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-secondary-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Textarea;
