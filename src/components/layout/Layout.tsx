"use client";

import React from "react";
import { cn } from "@/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, className }) => {
  return (
    <div className="flex h-screen bg-secondary-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} />

        {/* Page Content */}
        <main className={cn("flex-1 overflow-auto", className)}>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
