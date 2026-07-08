"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
  BookOpen,
  Users,
  Layers,
  Sparkles,
  Save,
  Play,
  Shield,
  FileText,
} from "lucide-react";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [storyApproved, setStoryApproved] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const validationChecks = [
    { label: "At least one scene exists", passed: true },
    { label: "All required scenes are valid", passed: true },
    { label: "Main characters approved", passed: true },
    { label: "Project is saved", passed: true },
    { label: "Story is approved", passed: storyApproved },
  ];

  const allPassed = validationChecks.every((v) => v.passed);

  async function handleGenerate() {
    if (!allPassed) {
      toast({ type: "warning", title: "Validation incomplete", description: "Please fix all issues before generating." });
      return;
    }
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push(`/project/${projectId}/generation`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link href={`/project/${projectId}/characters`} className="text-surface-500 hover:text-surface-300 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-surface-100">Story Review</h1>
          <p className="text-sm text-surface-400">Step 4: Review and approve before generating</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-600/10 border border-brand-600/20">
              <FileText className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-100">4</p>
              <p className="text-xs text-surface-400">Scenes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-accent-600/10 border border-accent-600/20">
              <Users className="h-5 w-5 text-accent-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-100">2</p>
              <p className="text-xs text-surface-400">Characters</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-green-600/10 border border-green-600/20">
              <Layers className="h-5 w-5 text-comic-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-100">12</p>
              <p className="text-xs text-surface-400">Panels to Generate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Story summary */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-400" />
            Story: The Robot Lab
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-surface-300 mb-4">
            A college student discovers a small sentient robot in an abandoned laboratory. Together, they uncover classified AI research that powerful forces want to keep buried.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">Sci-Fi</Badge>
            <Badge variant="default">Lighthearted</Badge>
            <Badge variant="default">Manga Style</Badge>
            <Badge variant="default">Young Adult</Badge>
            <Badge variant="default">4 Pages</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Validation */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-comic-green" />
            Validation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {validationChecks.map((check) => (
              <div key={check.label} className="flex items-center gap-3">
                {check.passed ? (
                  <div className="w-5 h-5 rounded-full bg-green-600/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-comic-green" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-yellow-600/20 flex items-center justify-center">
                    <AlertTriangle className="h-3 w-3 text-comic-yellow" />
                  </div>
                )}
                <span className={`text-sm ${check.passed ? "text-surface-300" : "text-comic-yellow"}`}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {!storyApproved ? (
          <Button
            variant="success"
            size="lg"
            className="flex-1 sm:flex-none"
            onClick={() => {
              setStoryApproved(true);
              toast({ type: "success", title: "Story approved!" });
            }}
            leftIcon={<Check className="h-5 w-5" />}
          >
            Approve Story
          </Button>
        ) : (
          <Button
            variant="comic"
            size="lg"
            className="flex-1 sm:flex-none"
            onClick={handleGenerate}
            isLoading={isGenerating}
            disabled={!allPassed}
            leftIcon={<Play className="h-5 w-5" />}
          >
            Generate Comic
          </Button>
        )}
        <Link href={`/project/${projectId}/story`}>
          <Button variant="secondary" size="lg">Back to Story Editor</Button>
        </Link>
        <Link href={`/project/${projectId}/characters`}>
          <Button variant="secondary" size="lg">Back to Characters</Button>
        </Link>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => toast({ type: "success", title: "Draft saved" })}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Draft
        </Button>
      </div>
    </div>
  );
}
