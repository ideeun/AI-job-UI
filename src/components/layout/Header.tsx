"use client";

import React from "react";
import { cn } from "@/utils";
import { Button } from "@/components/ui";
import { useTheme } from "@/hooks";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={cn(
        "bg-white dark:bg-gray-900 border-b border-secondary-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left side - Title */}
        <div className="flex items-center">
          {title && (
            <h1 className="text-2xl font-semibold text-secondary-900 dark:text-white">
              {title}
            </h1>
          )}
        </div>

        {/* Right side - Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-secondary-400 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              className="block w-80 pl-10 pr-3 py-2 border border-secondary-300 dark:border-gray-600 rounded-lg text-sm placeholder-secondary-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-secondary-400 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-gray-200 hover:bg-secondary-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title={
              theme === "dark"
                ? "Переключить на светлую тему"
                : "Переключить на темную тему"
            }
          >
            {theme === "dark" ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 text-secondary-400 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-gray-200 hover:bg-secondary-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <UserIcon className="h-5 w-5 mr-2" />
              Profile
            </Button>
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 text-secondary-400 dark:text-gray-400 hover:text-secondary-600 dark:hover:text-gray-200 hover:bg-secondary-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
