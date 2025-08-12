"use client";

import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { Button, Modal } from "@/components/ui";
import { ProjectTemplateForm } from "@/components/features";
import { CreateProjectTemplateData } from "@/types";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTemplate = async (data: CreateProjectTemplateData) => {
    setIsLoading(true);
    try {
      // Here you would typically call an API to save the template
      console.log("Creating template:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Close modal on success
      setIsModalOpen(false);

      // You might want to show a success message or refresh the data
      alert("Template created successfully!");
    } catch (error) {
      console.error("Error creating template:", error);
      alert("Error creating template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (!isLoading) {
      setIsModalOpen(false);
    }
  };

  return (
    <Layout title="Template Projects">
      <div className="h-full">
        {/* Header with create button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white mb-1 md:mb-2">
              Project Templates
            </h1>
            <p className="text-sm md:text-base text-secondary-600 dark:text-gray-400">
              Create and manage your project templates
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 w-full sm:w-auto justify-center"
            size="sm"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-sm md:text-base">Create Template</span>
          </Button>
        </div>

        {/* Main content area */}
        <div className="flex items-center justify-center min-h-64 px-4">
          <div className="text-center max-w-md w-full">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 bg-secondary-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-secondary-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg font-medium text-secondary-900 dark:text-white mb-2">
              No templates yet
            </h3>
            <p className="text-sm md:text-base text-secondary-500 dark:text-gray-400 mb-4 px-2">
              Get started by creating your first project template
            </p>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto"
              size="sm"
            >
              Create your first template
            </Button>
          </div>
        </div>

        {/* Modal for creating new template */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Create Project Template"
          size="lg"
        >
          <ProjectTemplateForm
            onSubmit={handleCreateTemplate}
            onCancel={handleCloseModal}
            isLoading={isLoading}
          />
        </Modal>
      </div>
    </Layout>
  );
}
