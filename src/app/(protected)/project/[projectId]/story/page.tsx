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
  ArrowRight,
  Users,
  Plus,
  GripVertical,
  Pencil,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Wand2,
  MessageSquare,
  Eye,
  MapPin,
  Clock,
  Camera,
  Sparkles,
  Save,
  Check,
  X,
} from "lucide-react";

// Demo scene data
const DEMO_SCENES = [
  {
    id: "scene-1",
    sceneNumber: 1,
    title: "The Abandoned Laboratory",
    description: "Arjun walks through a dark, overgrown corridor of an abandoned university lab building. Dust particles float in the air, illuminated by shafts of light breaking through broken windows.",
    location: "Abandoned University Lab",
    timeOfDay: "Afternoon",
    mood: "Mysterious",
    cameraAngle: "Wide Shot",
    lighting: "Natural light through broken windows",
    weather: "Clear",
    characters: ["Arjun"],
    actions: ["Walking cautiously", "Looking around with curiosity"],
    dialogue: [
      { speaker: "Arjun", text: "This place hasn't been touched in years...", emotion: "Curious" },
    ],
    narration: "The old engineering wing had been sealed since the incident five years ago.",
    soundEffects: ["Footsteps echoing", "Distant dripping water"],
    imageInstructions: "Dark atmospheric corridor with overgrown plants, broken windows letting in golden afternoon light, dust particles visible in light shafts, abandoned lab equipment visible in background",
    approved: false,
  },
  {
    id: "scene-2",
    sceneNumber: 2,
    title: "The Discovery",
    description: "Arjun stumbles upon a small, dormant robot partially hidden under debris on a dusty lab bench. The robot is compact, with a rounded body and large expressive optical sensors.",
    location: "Lab Room 404",
    timeOfDay: "Afternoon",
    mood: "Exciting",
    cameraAngle: "Close-Up",
    lighting: "Dim with a shaft of light on the robot",
    weather: "Clear",
    characters: ["Arjun", "Bolt"],
    actions: ["Arjun carefully clears debris", "Robot's eyes flicker to life"],
    dialogue: [
      { speaker: "Arjun", text: "What is this? Some kind of... robot?", emotion: "Surprised" },
      { speaker: "Bolt", text: "...*bzzzt*... Hello?", emotion: "Confused" },
    ],
    narration: "Under layers of dust and broken ceiling tiles, something extraordinary was waiting.",
    soundEffects: ["Electronic whirring", "Beeping"],
    imageInstructions: "Close-up of a small cute robot with large blue optical eyes awakening on a dusty lab bench, debris being cleared away by hands, shaft of golden light illuminating the robot, dust particles floating",
    approved: false,
  },
  {
    id: "scene-3",
    sceneNumber: 3,
    title: "First Connection",
    description: "Arjun sits cross-legged on the lab floor with Bolt in his lap, attempting to communicate. Bolt's small screen displays simple emoticons as it tries to express itself.",
    location: "Lab Room 404",
    timeOfDay: "Late Afternoon",
    mood: "Heartwarming",
    cameraAngle: "Medium Shot",
    lighting: "Warm sunset light",
    weather: "Clear",
    characters: ["Arjun", "Bolt"],
    actions: ["Arjun smiling at Bolt", "Bolt displaying a happy face emoji on its screen"],
    dialogue: [
      { speaker: "Arjun", text: "I'm going to call you Bolt. You like that?", emotion: "Friendly" },
      { speaker: "Bolt", text: "Bolt! Bolt! 😊", emotion: "Happy" },
    ],
    narration: "In that dusty forgotten lab, an unlikely friendship began.",
    soundEffects: ["Happy beeping", "Gentle whirring"],
    imageInstructions: "Warm medium shot of a young Indian student sitting cross-legged on lab floor, holding a small cute robot in his lap, warm sunset light through window, both looking at each other with warmth, robot displaying a smiley face on its small screen",
    approved: false,
  },
  {
    id: "scene-4",
    sceneNumber: 4,
    title: "The Secret Files",
    description: "Back in Arjun's dorm room at night, Bolt projects holographic files from its memory core — classified research documents about advanced AI development.",
    location: "Arjun's Dorm Room",
    timeOfDay: "Night",
    mood: "Tense",
    cameraAngle: "Three-Quarter View",
    lighting: "Blue holographic glow, desk lamp",
    weather: "Rain outside",
    characters: ["Arjun", "Bolt"],
    actions: ["Bolt projecting holograms", "Arjun reading files intensely"],
    dialogue: [
      { speaker: "Arjun", text: "Bolt... these files are classified. Who created you?", emotion: "Serious" },
      { speaker: "Bolt", text: "Creator... Professor... gone.", emotion: "Sad" },
    ],
    narration: "The truth about Bolt's origins would change everything Arjun thought he knew.",
    soundEffects: ["Rain on window", "Holographic hum"],
    imageInstructions: "Night scene in a college dorm room, small robot projecting blue holographic documents into the air, student reading them with intense expression, desk lamp providing warm contrast to blue holograms, rain visible on window",
    approved: false,
  },
];

type Scene = typeof DEMO_SCENES[number];

export default function StoryEditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const [scenes, setScenes] = React.useState<Scene[]>(DEMO_SCENES);
  const [editingSceneId, setEditingSceneId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Scene | null>(null);

  const storyMeta = {
    title: "The Robot Lab",
    synopsis: "A college student discovers a small sentient robot in an abandoned laboratory. Together, they uncover classified AI research that powerful forces want to keep buried.",
    beginning: "Arjun, a curious engineering student, explores a sealed-off university lab wing and discovers Bolt, a small AI robot that has been dormant for five years.",
    middle: "As Arjun bonds with Bolt, the robot reveals classified research files from its memory. They discover Bolt was created as part of a secret government AI program that was shut down under mysterious circumstances.",
    ending: "Arjun and Bolt decide to go public with the research, but must first evade the shadowy organization that wants Bolt permanently deactivated.",
  };

  function startEditing(scene: Scene) {
    setEditingSceneId(scene.id);
    setEditForm({ ...scene });
  }

  function cancelEditing() {
    setEditingSceneId(null);
    setEditForm(null);
  }

  function saveScene() {
    if (!editForm) return;
    setScenes((prev) => prev.map((s) => (s.id === editForm.id ? editForm : s)));
    setEditingSceneId(null);
    setEditForm(null);
    toast({ type: "success", title: "Scene saved" });
  }

  function deleteScene(id: string) {
    setScenes((prev) => {
      const filtered = prev.filter((s) => s.id !== id);
      return filtered.map((s, i) => ({ ...s, sceneNumber: i + 1 }));
    });
    toast({ type: "success", title: "Scene deleted" });
  }

  function duplicateScene(id: string) {
    const scene = scenes.find((s) => s.id === id);
    if (!scene) return;
    const idx = scenes.findIndex((s) => s.id === id);
    const copy: Scene = {
      ...scene,
      id: `scene-copy-${Date.now()}`,
      title: `${scene.title} (Copy)`,
    };
    const newScenes = [...scenes];
    newScenes.splice(idx + 1, 0, copy);
    setScenes(newScenes.map((s, i) => ({ ...s, sceneNumber: i + 1 })));
    toast({ type: "success", title: "Scene duplicated" });
  }

  function moveScene(id: string, direction: "up" | "down") {
    const idx = scenes.findIndex((s) => s.id === id);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === scenes.length - 1) return;
    const newScenes = [...scenes];
    const target = direction === "up" ? idx - 1 : idx + 1;
    [newScenes[idx], newScenes[target]] = [newScenes[target], newScenes[idx]];
    setScenes(newScenes.map((s, i) => ({ ...s, sceneNumber: i + 1 })));
  }

  function addNewScene() {
    const newScene: Scene = {
      id: `scene-new-${Date.now()}`,
      sceneNumber: scenes.length + 1,
      title: "New Scene",
      description: "",
      location: "",
      timeOfDay: "Afternoon",
      mood: "Neutral",
      cameraAngle: "Medium Shot",
      lighting: "",
      weather: "Clear",
      characters: [],
      actions: [],
      dialogue: [],
      narration: "",
      soundEffects: [],
      imageInstructions: "",
      approved: false,
    };
    setScenes((prev) => [...prev, newScene]);
    setEditingSceneId(newScene.id);
    setEditForm(newScene);
    toast({ type: "info", title: "New scene added — edit it below" });
  }

  async function regenerateScene(id: string) {
    toast({ type: "info", title: "Regenerating scene...", description: "AI is rewriting this scene" });
    await new Promise((r) => setTimeout(r, 2000));
    toast({ type: "success", title: "Scene regenerated" });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard"
              className="text-surface-500 hover:text-surface-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold text-surface-100">
              Story Editor
            </h1>
          </div>
          <p className="text-sm text-surface-400">
            Step 2: Review and edit your AI-generated story
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toast({ type: "success", title: "Story saved" })}
            leftIcon={<Save className="h-4 w-4" />}
          >
            Save
          </Button>
          <Link href={`/project/${projectId}/characters`}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Characters
            </Button>
          </Link>
        </div>
      </div>

      {/* Story overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{storyMeta.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-surface-300">{storyMeta.synopsis}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg bg-dark-hover p-3">
              <p className="text-xs text-surface-500 mb-1">Beginning</p>
              <p className="text-xs text-surface-300">{storyMeta.beginning}</p>
            </div>
            <div className="rounded-lg bg-dark-hover p-3">
              <p className="text-xs text-surface-500 mb-1">Middle</p>
              <p className="text-xs text-surface-300">{storyMeta.middle}</p>
            </div>
            <div className="rounded-lg bg-dark-hover p-3">
              <p className="text-xs text-surface-500 mb-1">Ending</p>
              <p className="text-xs text-surface-300">{storyMeta.ending}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-surface-500">
            <span>{scenes.length} scenes</span>
            <span>•</span>
            <span>4 estimated pages</span>
            <span>•</span>
            <span>12 panels</span>
          </div>
        </CardContent>
      </Card>

      {/* Scenes */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-surface-100">
          Scenes ({scenes.length})
        </h2>
        <Button
          variant="secondary"
          size="sm"
          onClick={addNewScene}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Add Scene
        </Button>
      </div>

      <div className="space-y-4">
        {scenes.map((scene) => {
          const isEditing = editingSceneId === scene.id;

          return (
            <Card key={scene.id} className={isEditing ? "ring-2 ring-brand-500" : ""}>
              <div className="p-5">
                {/* Scene header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600/10 border border-brand-600/20 text-brand-400 text-sm font-bold flex-shrink-0 mt-0.5">
                    {scene.sceneNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    {isEditing && editForm ? (
                      <input
                        className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                    ) : (
                      <h3 className="text-sm font-semibold text-surface-100">
                        {scene.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => moveScene(scene.id, "up")}
                          className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors disabled:opacity-30"
                          disabled={scene.sceneNumber === 1}
                          aria-label="Move scene up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveScene(scene.id, "down")}
                          className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors disabled:opacity-30"
                          disabled={scene.sceneNumber === scenes.length}
                          aria-label="Move scene down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => startEditing(scene)}
                          className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors"
                          aria-label="Edit scene"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => regenerateScene(scene.id)}
                          className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors"
                          aria-label="Regenerate scene"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => duplicateScene(scene.id)}
                          className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors"
                          aria-label="Duplicate scene"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteScene(scene.id)}
                          className="p-1.5 rounded-md text-surface-500 hover:text-comic-red hover:bg-red-900/20 transition-colors"
                          aria-label="Delete scene"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <Button variant="primary" size="sm" onClick={saveScene} leftIcon={<Check className="h-3.5 w-3.5" />}>
                          Save
                        </Button>
                        <Button variant="ghost" size="sm" onClick={cancelEditing} leftIcon={<X className="h-3.5 w-3.5" />}>
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Scene content */}
                {isEditing && editForm ? (
                  <div className="space-y-3 ml-11">
                    <div>
                      <label className="text-xs text-surface-500 mb-1 block">Description</label>
                      <textarea
                        className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-surface-100 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Location</label>
                        <input
                          className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Time</label>
                        <input
                          className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          value={editForm.timeOfDay}
                          onChange={(e) => setEditForm({ ...editForm, timeOfDay: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Mood</label>
                        <input
                          className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          value={editForm.mood}
                          onChange={(e) => setEditForm({ ...editForm, mood: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-surface-500 mb-1 block">Camera</label>
                        <input
                          className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          value={editForm.cameraAngle}
                          onChange={(e) => setEditForm({ ...editForm, cameraAngle: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-surface-500 mb-1 block">Narration</label>
                      <textarea
                        className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-surface-100 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                        value={editForm.narration}
                        onChange={(e) => setEditForm({ ...editForm, narration: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-surface-500 mb-1 block">Image Instructions</label>
                      <textarea
                        className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-surface-100 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                        value={editForm.imageInstructions}
                        onChange={(e) => setEditForm({ ...editForm, imageInstructions: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="ml-11 space-y-3">
                    <p className="text-sm text-surface-300">{scene.description}</p>

                    {/* Metadata pills */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs text-surface-400 bg-dark-hover rounded-md px-2 py-1">
                        <MapPin className="h-3 w-3" /> {scene.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-surface-400 bg-dark-hover rounded-md px-2 py-1">
                        <Clock className="h-3 w-3" /> {scene.timeOfDay}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-surface-400 bg-dark-hover rounded-md px-2 py-1">
                        <Camera className="h-3 w-3" /> {scene.cameraAngle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-surface-400 bg-dark-hover rounded-md px-2 py-1">
                        <Sparkles className="h-3 w-3" /> {scene.mood}
                      </span>
                    </div>

                    {/* Characters */}
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-surface-500" />
                      <div className="flex gap-1">
                        {scene.characters.map((char) => (
                          <Badge key={char} variant="brand">{char}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Dialogue */}
                    {scene.dialogue.length > 0 && (
                      <div className="space-y-1.5">
                        {scene.dialogue.map((d, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <MessageSquare className="h-3.5 w-3.5 text-brand-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-surface-300">
                              <span className="font-semibold text-surface-200">{d.speaker}:</span>{" "}
                              &ldquo;{d.text}&rdquo;{" "}
                              <span className="text-surface-500">({d.emotion})</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Narration */}
                    {scene.narration && (
                      <div className="rounded-lg bg-dark-hover/50 border border-dark-border px-3 py-2">
                        <p className="text-xs text-surface-400 italic">{scene.narration}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add scene button at bottom */}
      <button
        onClick={addNewScene}
        className="w-full mt-4 py-4 rounded-xl border-2 border-dashed border-dark-border text-surface-500 hover:text-surface-300 hover:border-surface-500 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Plus className="h-4 w-4" />
        Add New Scene
      </button>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
        <Link href="/dashboard">
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Dashboard
          </Button>
        </Link>
        <Link href={`/project/${projectId}/characters`}>
          <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Continue to Characters
          </Button>
        </Link>
      </div>
    </div>
  );
}
