"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react";

// Mock generation stages
const STAGES = [
  { id: "validate", label: "Validating story & configuration" },
  { id: "load_chars", label: "Loading characters & details" },
  { id: "prep_refs", label: "Preparing character references" },
  { id: "panel_1", label: "Generating Panel 1" },
  { id: "panel_2", label: "Generating Panel 2" },
  { id: "panel_3", label: "Generating Panel 3" },
  { id: "panel_4", label: "Generating Panel 4" },
  { id: "layout", label: "Creating comic layout and pages" },
];

export default function GenerationPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [currentStageIdx, setCurrentStageIdx] = React.useState(0);
  const [stageStatuses, setStageStatuses] = React.useState<Record<string, "pending" | "processing" | "completed" | "failed">>({
    validate: "processing",
    load_chars: "pending",
    prep_refs: "pending",
    panel_1: "pending",
    panel_2: "pending",
    panel_3: "pending",
    panel_4: "pending",
    layout: "pending",
  });
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [jobFailed, setJobFailed] = React.useState(false);

  React.useEffect(() => {
    if (!isPlaying || jobFailed) return;

    const timer = setInterval(() => {
      setCurrentStageIdx((prevIdx) => {
        if (prevIdx >= STAGES.length) {
          clearInterval(timer);
          toast({
            type: "success",
            title: "Comic generation complete!",
            description: "Opening the Comic Studio...",
          });
          setTimeout(() => {
            router.push(`/studio/${projectId}`);
          }, 1500);
          return prevIdx;
        }

        const currentStage = STAGES[prevIdx];
        
        // Randomly simulate a failed panel for testing retry capability
        if (currentStage.id === "panel_3" && Math.random() > 0.8 && stageStatuses["panel_3"] !== "completed") {
          setStageStatuses((prev) => ({
            ...prev,
            [currentStage.id]: "failed",
          }));
          setJobFailed(true);
          toast({
            type: "error",
            title: "Generation Failed",
            description: "Failed to generate Panel 3. Click retry to attempt again.",
          });
          clearInterval(timer);
          return prevIdx;
        }

        setStageStatuses((prev) => {
          const next = { ...prev };
          next[currentStage.id] = "completed";
          if (prevIdx + 1 < STAGES.length) {
            next[STAGES[prevIdx + 1].id] = "processing";
          }
          return next;
        });

        return prevIdx + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, projectId, router, toast, jobFailed, stageStatuses]);

  function handleRetry() {
    const failedStageId = STAGES[currentStageIdx].id;
    setStageStatuses((prev) => ({
      ...prev,
      [failedStageId]: "processing",
    }));
    setJobFailed(false);
    setIsPlaying(true);
    toast({
      type: "info",
      title: "Retrying panel generation...",
    });
  }

  function handlePausePlay() {
    setIsPlaying(!isPlaying);
    toast({
      type: "info",
      title: isPlaying ? "Generation paused" : "Generation resumed",
    });
  }

  const progressPct = Math.min(
    100,
    Math.round((currentStageIdx / STAGES.length) * 100)
  );

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Link
          href={`/project/${projectId}/review`}
          className="text-surface-500 hover:text-surface-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-surface-100">Comic Generation</h1>
          <p className="text-sm text-surface-400">
            AI is drawing your comic. Please do not close this window.
          </p>
        </div>
      </div>

      {/* Progress Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-surface-200">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-brand-400">
              {progressPct}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-3 bg-dark-surface rounded-full border border-dark-border overflow-hidden mb-6">
            <div
              className="h-full bg-brand-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Job control buttons */}
          <div className="flex items-center gap-3">
            {!jobFailed && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePausePlay}
                leftIcon={isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              >
                {isPlaying ? "Pause" : "Resume"}
              </Button>
            )}
            {jobFailed && (
              <Button
                variant="comic"
                size="sm"
                onClick={handleRetry}
                leftIcon={<RotateCcw className="h-4 w-4" />}
              >
                Retry Failed Panel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stages List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generation Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {STAGES.map((stage) => {
            const status = stageStatuses[stage.id];
            return (
              <div
                key={stage.id}
                className="flex items-center justify-between text-sm py-1 border-b border-dark-border/50 last:border-0"
              >
                <span
                  className={
                    status === "completed"
                      ? "text-surface-400 line-through"
                      : status === "processing"
                      ? "text-surface-100 font-medium"
                      : "text-surface-500"
                  }
                >
                  {stage.label}
                </span>

                <div className="flex-shrink-0 ml-4">
                  {status === "processing" && (
                    <Loader2 className="h-4 w-4 animate-spin text-brand-400" />
                  )}
                  {status === "completed" && (
                    <CheckCircle2 className="h-4 w-4 text-comic-green" />
                  )}
                  {status === "failed" && (
                    <AlertCircle className="h-4 w-4 text-comic-red" />
                  )}
                  {status === "pending" && (
                    <span className="text-xs text-surface-600">Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
