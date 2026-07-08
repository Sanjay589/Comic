"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  HelpCircle,
  BookOpen,
  Palette,
  Layers,
  MessageSquare,
  Wand2,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function HelpPage() {
  const topics = [
    {
      icon: <Wand2 className="h-5 w-5 text-brand-400" />,
      title: "AI Story Generation",
      description: "Learn how to use general prompts, target settings, style definitions, and length bounds to generate high-quality starting story arcs.",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-accent-400" />,
      title: "Scene Editor & Assist",
      description: "How to use the inline controls to manipulate scene dialogues, actions, backgrounds, lighting, and invoke local AI assists.",
    },
    {
      icon: <Palette className="h-5 w-5 text-comic-green" />,
      title: "Character Design & DNA",
      description: "Understanding character DNA fields, outfit variations, facial property locking, and maintaining style consistency.",
    },
    {
      icon: <Layers className="h-5 w-5 text-comic-yellow" />,
      title: "Panel Artwork Workflow",
      description: "How panels are processed step-by-step, including error recovery, individual panel regeneration, and custom image uploads.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-comic-pink" />,
      title: "Comic Studio Canvas",
      description: "Using the multi-layer canvas editor to position dialog bubbles, configure text styles, rearrange layers, and export high-res PNG/PDF.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-lg bg-brand-600/10 border border-brand-600/20">
          <HelpCircle className="h-6 w-6 text-brand-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-surface-100">Help Center</h1>
          <p className="text-sm text-surface-400 mt-1">
            Guide library and best practices to master ComicCraft AI.
          </p>
        </div>
      </div>

      {/* Grid Guide list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic, index) => (
          <Card key={index} hover>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="p-2 rounded-lg bg-dark-hover border border-dark-border flex-shrink-0">
                {topic.icon}
              </div>
              <CardTitle className="text-sm font-semibold">{topic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-surface-400 leading-relaxed mb-4">
                {topic.description}
              </p>
              <Button variant="link" size="sm" rightIcon={<ChevronRight className="h-3 w-3" />}>
                Read Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Troubleshooting Section */}
      <Card>
        <CardHeader>
          <CardTitle>Troubleshooting & Tips</CardTitle>
          <CardDescription>Common issues and how to resolve them quickly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-surface-200">My panel failed to generate?</h4>
            <p className="text-xs text-surface-400">
              {"This usually happens due to temporary API rate limits or network issues. Simply click the 'Retry Failed Panel' or panel-specific 'Retry' button to request generation again. Completed panels will not be affected."}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-surface-200">How do I keep character details perfectly consistent?</h4>
            <p className="text-xs text-surface-400">
              Make sure to lock critical features (like hair color, skin tone, or accessories) inside the Character Creator. When locked, these details are embedded in the prompt DNA structure and are preserved across panels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
