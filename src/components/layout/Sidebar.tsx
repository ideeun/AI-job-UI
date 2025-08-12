"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import { NavItem } from "@/types";
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const navigationItems: NavItem[] = [
  {
    id: "prompt",
    label: "Main Prompt",
    href: "/",
    icon: BriefcaseIcon,
  },

  {
    id: "format",
    label: "Response Format Prompt",
    href: "/format",
    icon: Cog6ToothIcon,
  },
  {
    id: "json",
    label: "Response JSON",
    href: "/json",
    icon: BookmarkIcon,
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-secondary-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PT</span>
            </div>
            <span className="font-semibold text-secondary-900">
              Project Template
            </span>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-secondary-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-secondary-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-secondary-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                  : "text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900",
                isCollapsed && "justify-center"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive
                      ? "text-primary-600"
                      : "text-secondary-400 group-hover:text-secondary-600",
                    !isCollapsed && "mr-3"
                  )}
                />
              )}
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-secondary-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary-300 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-secondary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">
                User
              </p>
              <p className="text-xs text-secondary-500 truncate">
                user@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
