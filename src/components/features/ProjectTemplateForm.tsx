import React, { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { CreateProjectTemplateData } from "@/types";

interface ProjectTemplateFormProps {
  onSubmit: (data: CreateProjectTemplateData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProjectTemplateForm: React.FC<ProjectTemplateFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateProjectTemplateData>({
    name: "",
    mainPrompt: "",
    responseFormatPrompt: "",
    responseJson: "",
  });

  const [errors, setErrors] = useState<Partial<CreateProjectTemplateData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof CreateProjectTemplateData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProjectTemplateData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Template name is required";
    }

    if (!formData.mainPrompt.trim()) {
      newErrors.mainPrompt = "Main prompt is required";
    }

    if (!formData.responseFormatPrompt.trim()) {
      newErrors.responseFormatPrompt = "Response format prompt is required";
    }

    if (!formData.responseJson.trim()) {
      newErrors.responseJson = "Response JSON is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="name"
        label="Project Template Name"
        placeholder="Enter template name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        disabled={isLoading}
      />

      <Textarea
        name="mainPrompt"
        label="Main Prompt"
        placeholder="Enter the main prompt for this template"
        value={formData.mainPrompt}
        onChange={handleInputChange}
        error={errors.mainPrompt}
        disabled={isLoading}
        rows={4}
      />

      <Textarea
        name="responseFormatPrompt"
        label="Response Format Prompt"
        placeholder="Enter the response format instructions"
        value={formData.responseFormatPrompt}
        onChange={handleInputChange}
        error={errors.responseFormatPrompt}
        disabled={isLoading}
        rows={4}
      />

      <Textarea
        name="responseJson"
        label="Response JSON"
        placeholder="Enter the expected JSON response structure"
        value={formData.responseJson}
        onChange={handleInputChange}
        error={errors.responseJson}
        disabled={isLoading}
        rows={6}
        className="font-mono text-sm"
      />

      <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          {isLoading ? "Creating..." : "Create Template"}
        </Button>
      </div>
    </form>
  );
};

export default ProjectTemplateForm;
