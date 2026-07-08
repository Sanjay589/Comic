"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import {
  COMIC_STYLES,
  GENRES,
  TONES,
  TARGET_AUDIENCES,
  LANGUAGES,
} from "@/lib/constants";
import {
  Wand2,
  Save,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";

interface StoryForm {
  storyIdea: string;
  title: string;
  genre: string;
  tone: string;
  targetAudience: string;
  language: string;
  numberOfPages: number;
  numberOfPanels: number;
  comicStyle: string;
  endingPreference: string;
  customInstructions: string;
}

const initialForm: StoryForm = {
  storyIdea: "",
  title: "",
  genre: "adventure",
  tone: "lighthearted",
  targetAudience: "young-adult",
  language: "en",
  numberOfPages: 4,
  numberOfPanels: 12,
  comicStyle: "manga",
  endingPreference: "",
  customInstructions: "",
};

export default function CreatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = React.useState<StoryForm>(initialForm);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  function update<K extends keyof StoryForm>(key: K, value: StoryForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.storyIdea.trim())
      newErrors.storyIdea = "Please enter your story idea";
    if (form.storyIdea.length > 0 && form.storyIdea.length < 10)
      newErrors.storyIdea = "Please provide more detail (at least 10 characters)";
    if (form.numberOfPages < 1 || form.numberOfPages > 50)
      newErrors.numberOfPages = "Pages must be between 1 and 50";
    if (form.numberOfPanels < 1 || form.numberOfPanels > 200)
      newErrors.numberOfPanels = "Panels must be between 1 and 200";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsGenerating(true);
    try {
      // In demo mode, simulate generation and redirect
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const projectId = `project-${Date.now()}`;
      toast({
        type: "success",
        title: "Story generated!",
        description: "Redirecting to story editor...",
      });
      router.push(`/project/${projectId}/story`);
    } catch {
      toast({
        type: "error",
        title: "Generation failed",
        description: "Please check your configuration and try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveDraft() {
    if (!form.storyIdea.trim()) {
      toast({ type: "warning", title: "Enter a story idea first" });
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    toast({ type: "success", title: "Draft saved!", description: "You can continue later from the dashboard." });
    setIsSaving(false);
  }

  function handleClear() {
    setForm(initialForm);
    setErrors({});
    toast({ type: "info", title: "Form cleared" });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600/10 border border-brand-600/20">
            <BookOpen className="h-5 w-5 text-brand-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-surface-100">
              Create New Comic
            </h1>
            <p className="text-sm text-surface-400">
              Step 1: Describe your story idea
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Main story idea */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-400" />
              Your Story Idea
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your comic story idea... For example: 'A college student finds a small robot inside an abandoned laboratory. Together they uncover a secret that could change the world.'"
              value={form.storyIdea}
              onChange={(e) => update("storyIdea", e.target.value)}
              error={errors.storyIdea}
              className="min-h-[120px]"
              helperText={`${form.storyIdea.length} characters`}
            />
          </CardContent>
        </Card>

        {/* Basic settings */}
        <Card>
          <CardHeader>
            <CardTitle>Story Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title (optional)"
              placeholder="Leave blank to let AI suggest a title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Genre"
                options={[...GENRES]}
                value={form.genre}
                onChange={(e) => update("genre", e.target.value)}
              />
              <Select
                label="Tone"
                options={[...TONES]}
                value={form.tone}
                onChange={(e) => update("tone", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Target Audience"
                options={[...TARGET_AUDIENCES]}
                value={form.targetAudience}
                onChange={(e) => update("targetAudience", e.target.value)}
              />
              <Select
                label="Comic Style"
                options={[...COMIC_STYLES]}
                value={form.comicStyle}
                onChange={(e) => update("comicStyle", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Number of Pages"
                value={form.numberOfPages.toString()}
                onChange={(e) => update("numberOfPages", parseInt(e.target.value) || 1)}
                min={1}
                max={50}
                error={errors.numberOfPages}
              />
              <Input
                type="number"
                label="Number of Panels"
                value={form.numberOfPanels.toString()}
                onChange={(e) => update("numberOfPanels", parseInt(e.target.value) || 1)}
                min={1}
                max={200}
                error={errors.numberOfPanels}
              />
            </div>

            <Select
              label="Language"
              options={[...LANGUAGES]}
              value={form.language}
              onChange={(e) => update("language", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Advanced settings (collapsible) */}
        <Card>
          <button
            type="button"
            className="w-full flex items-center justify-between p-5 text-left"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
          >
            <CardTitle>Advanced Options</CardTitle>
            {showAdvanced ? (
              <ChevronUp className="h-5 w-5 text-surface-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-surface-400" />
            )}
          </button>
          {showAdvanced && (
            <CardContent className="space-y-4 pt-0">
              <Input
                label="Ending Preference (optional)"
                placeholder="e.g., Happy ending, Cliffhanger, Open-ended"
                value={form.endingPreference}
                onChange={(e) => update("endingPreference", e.target.value)}
              />
              <Textarea
                label="Custom Instructions (optional)"
                placeholder="Any additional instructions for the AI story generator..."
                value={form.customInstructions}
                onChange={(e) => update("customInstructions", e.target.value)}
                className="min-h-[80px]"
              />
            </CardContent>
          )}
        </Card>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            type="submit"
            variant="comic"
            size="lg"
            className="flex-1 sm:flex-none"
            isLoading={isGenerating}
            leftIcon={<Wand2 className="h-5 w-5" />}
          >
            Generate Story
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleSaveDraft}
            isLoading={isSaving}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={handleClear}
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </div>
  );
}
