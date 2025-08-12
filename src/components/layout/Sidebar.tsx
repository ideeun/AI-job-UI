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
    label: "Template Projectss",
    href: "/",
    icon: BriefcaseIcon,
  },
  {
    id: "json",
    label: "Projects",
    href: "/projects",
    icon: BookmarkIcon,
  },
  {
    id: "format",
    label: "Settings",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];

interface SidebarProps {
  className?: string;
  onMobileClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = () => {
    // Закрываем мобильное меню при клике на ссылку
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-white dark:bg-gray-900 border-r border-secondary-200 dark:border-gray-700 transition-all duration-300 ease-in-out h-full",
        // Для мобильных устройств всегда фиксированная ширина
        onMobileClose ? "w-64" : isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200 dark:border-gray-700">
        {/* Logo and Brand - показываем всегда на мобильных, и когда не свернуто на десктопе */}
        {(onMobileClose || !isCollapsed) && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AR</span>
            </div>
            <span className="font-semibold text-secondary-900 dark:text-white">
              AI RPA
            </span>
          </div>
        )}

        {/* Collapse button - только для десктопной версии */}
        {!onMobileClose && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-secondary-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-secondary-600 dark:text-gray-400" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-secondary-600 dark:text-gray-400" />
            )}
          </button>
        )}
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
              onClick={handleLinkClick}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                isActive
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-600 dark:border-primary-400"
                  : "text-secondary-700 dark:text-gray-300 hover:bg-secondary-100 dark:hover:bg-gray-800 hover:text-secondary-900 dark:hover:text-white",
                isCollapsed && !onMobileClose && "justify-center"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : "text-secondary-400 dark:text-gray-500 group-hover:text-secondary-600 dark:group-hover:text-gray-300",
                    (!isCollapsed || onMobileClose) && "mr-3"
                  )}
                />
              )}
              {(!isCollapsed || onMobileClose) && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {(!isCollapsed || onMobileClose) && (
        <div className="p-4 border-t border-secondary-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-secondary-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 dark:text-white truncate">
                User
              </p>
              <p className="text-xs text-secondary-500 dark:text-gray-400 truncate">
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
