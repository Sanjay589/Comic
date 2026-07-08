"use client";

import * as React from "react";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/dialog";
import { CHARACTER_ROLES } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Pencil,
  Trash2,
  Copy,
  RotateCcw,
  Check,
  X,
  User,
  Wand2,
  Lock,
  Unlock,
  Star,
  Shield,
  Eye,
  Save,
  ImageIcon,
  Sparkles,
} from "lucide-react";

interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  age: string;
  gender: string;
  personality: string;
  faceShape: string;
  skinTone: string;
  hairstyle: string;
  hairColour: string;
  eyeShape: string;
  eyeColour: string;
  height: string;
  bodyType: string;
  clothing: string;
  footwear: string;
  accessories: string;
  specialMarks: string;
  powers: string;
  typicalExpressions: string;
  colourPalette: string;
  artStyle: string;
  additionalDescription: string;
  approved: boolean;
  isMainCharacter: boolean;
  referenceImageUrl: string | null;
  lockedProperties: string[];
}

const DEMO_CHARACTERS: Character[] = [
  {
    id: "char-1",
    name: "Arjun Sharma",
    role: "main",
    description: "A 19-year-old Indian engineering student with messy black hair, round glasses, a blue hoodie, black jeans, white shoes and a small smart watch. He looks curious, friendly and slightly tired.",
    age: "19",
    gender: "Male",
    personality: "Curious, resourceful, kind-hearted, slightly anxious",
    faceShape: "Oval",
    skinTone: "Medium brown",
    hairstyle: "Messy, medium length",
    hairColour: "Black",
    eyeShape: "Almond",
    eyeColour: "Dark brown",
    height: "5'9\" / 175cm",
    bodyType: "Slim, average build",
    clothing: "Blue hoodie, graphic t-shirt underneath, black jeans",
    footwear: "White sneakers",
    accessories: "Round glasses, smart watch, backpack",
    specialMarks: "Small scar on left eyebrow",
    powers: "None (relies on intelligence and resourcefulness)",
    typicalExpressions: "Curious squint, excited grin, worried frown",
    colourPalette: "Blue, black, white, grey",
    artStyle: "Manga",
    additionalDescription: "Often has a pencil behind his ear. Tends to push his glasses up when thinking.",
    approved: true,
    isMainCharacter: true,
    referenceImageUrl: null,
    lockedProperties: ["skinTone", "hairColour", "eyeColour", "faceShape"],
  },
  {
    id: "char-2",
    name: "Bolt",
    role: "main",
    description: "A small, compact robot about the size of a football with a rounded white body, large expressive blue optical sensors for eyes, and small retractable arms. Has a small LED display on its chest that shows emoticons.",
    age: "Unknown (5+ years dormant)",
    gender: "Non-binary (robot)",
    personality: "Playful, loyal, curious, sometimes glitchy",
    faceShape: "Round (robotic)",
    skinTone: "White and silver metallic",
    hairstyle: "N/A",
    hairColour: "N/A",
    eyeShape: "Large circular optical sensors",
    eyeColour: "Bright blue (glowing)",
    height: "30cm / 1 foot",
    bodyType: "Compact, spherical, with retractable limbs",
    clothing: "N/A (metallic body panels)",
    footwear: "Small wheel base / magnetic feet",
    accessories: "Antenna, chest LED display, holographic projector",
    specialMarks: "Scratch marks from years in the abandoned lab, glowing blue joints",
    powers: "Holographic projection, data analysis, basic hacking",
    typicalExpressions: "Happy eyes (^_^), sad eyes (;_;), curious tilt",
    colourPalette: "White, silver, blue accents",
    artStyle: "Manga",
    additionalDescription: "Makes little beeping sounds. Tilts its whole body to express emotions. Can project holograms from its antenna.",
    approved: false,
    isMainCharacter: true,
    referenceImageUrl: null,
    lockedProperties: ["eyeColour"],
  },
];

export default function CharactersPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { toast } = useToast();
  const [characters, setCharacters] = React.useState<Character[]>(DEMO_CHARACTERS);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Character | null>(null);
  const [showCreator, setShowCreator] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null);
  const [generatingImageId, setGeneratingImageId] = React.useState<string | null>(null);

  function startEditing(char: Character) {
    setEditingId(char.id);
    setEditForm({ ...char });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm(null);
  }

  function saveCharacter() {
    if (!editForm) return;
    setCharacters((prev) => prev.map((c) => (c.id === editForm.id ? editForm : c)));
    setEditingId(null);
    setEditForm(null);
    toast({ type: "success", title: "Character saved" });
  }

  function toggleApproval(id: string) {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, approved: !c.approved } : c))
    );
    const char = characters.find((c) => c.id === id);
    toast({
      type: "success",
      title: char?.approved ? "Approval removed" : "Character approved",
    });
  }

  function toggleMainCharacter(id: string) {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isMainCharacter: !c.isMainCharacter } : c))
    );
  }

  function duplicateCharacter(id: string) {
    const char = characters.find((c) => c.id === id);
    if (!char) return;
    const copy: Character = {
      ...char,
      id: `char-${Date.now()}`,
      name: `${char.name} (Copy)`,
      approved: false,
    };
    setCharacters((prev) => [...prev, copy]);
    toast({ type: "success", title: "Character duplicated" });
  }

  function deleteCharacter() {
    if (!deleteTarget) return;
    setCharacters((prev) => prev.filter((c) => c.id !== deleteTarget));
    setDeleteTarget(null);
    toast({ type: "success", title: "Character deleted" });
  }

  async function generateImage(id: string) {
    setGeneratingImageId(id);
    await new Promise((r) => setTimeout(r, 2500));
    setGeneratingImageId(null);
    toast({ type: "success", title: "Character image generated", description: "Reference image saved" });
  }

  function toggleLock(charId: string, property: string) {
    setCharacters((prev) =>
      prev.map((c) => {
        if (c.id !== charId) return c;
        const locked = c.lockedProperties.includes(property)
          ? c.lockedProperties.filter((p) => p !== property)
          : [...c.lockedProperties, property];
        return { ...c, lockedProperties: locked };
      })
    );
  }

  function addNewCharacter() {
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: "New Character",
      role: "supporting",
      description: "",
      age: "",
      gender: "",
      personality: "",
      faceShape: "",
      skinTone: "",
      hairstyle: "",
      hairColour: "",
      eyeShape: "",
      eyeColour: "",
      height: "",
      bodyType: "",
      clothing: "",
      footwear: "",
      accessories: "",
      specialMarks: "",
      powers: "",
      typicalExpressions: "",
      colourPalette: "",
      artStyle: "Manga",
      additionalDescription: "",
      approved: false,
      isMainCharacter: false,
      referenceImageUrl: null,
      lockedProperties: [],
    };
    setCharacters((prev) => [...prev, newChar]);
    startEditing(newChar);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/project/${projectId}/story`} className="text-surface-500 hover:text-surface-300 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold text-surface-100">Character Creator</h1>
          </div>
          <p className="text-sm text-surface-400">
            Step 3: Design and approve your characters
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={addNewCharacter} leftIcon={<Plus className="h-4 w-4" />}>
            Add Character
          </Button>
          <Link href={`/project/${projectId}/review`}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Review Story
            </Button>
          </Link>
        </div>
      </div>

      {/* Character cards */}
      <div className="space-y-6">
        {characters.map((char) => {
          const isEditing = editingId === char.id;

          return (
            <Card key={char.id} className={isEditing ? "ring-2 ring-brand-500" : ""}>
              <div className="p-5">
                {/* Character header */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-600/20 to-accent-600/20 border border-dark-border flex items-center justify-center flex-shrink-0">
                    {char.referenceImageUrl ? (
                      <img src={char.referenceImageUrl} alt={char.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <User className="h-8 w-8 text-surface-500" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-surface-100">{char.name}</h3>
                      {char.approved && (
                        <Badge variant="success">
                          <Check className="h-3 w-3 mr-1" /> Approved
                        </Badge>
                      )}
                      {char.isMainCharacter && (
                        <Badge variant="brand">
                          <Star className="h-3 w-3 mr-1" /> Main
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-surface-400 mb-2">
                      {CHARACTER_ROLES.find((r) => r.value === char.role)?.label || char.role}
                      {char.age && ` • ${char.age}`}
                      {char.gender && ` • ${char.gender}`}
                    </p>
                    <p className="text-sm text-surface-300 line-clamp-2">{char.description}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!isEditing ? (
                      <>
                        <button onClick={() => toggleApproval(char.id)} className="p-1.5 rounded-md text-surface-500 hover:text-comic-green hover:bg-green-900/20 transition-colors" aria-label={char.approved ? "Remove approval" : "Approve"}>
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => startEditing(char)} className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors" aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => generateImage(char.id)} disabled={generatingImageId === char.id} className="p-1.5 rounded-md text-surface-500 hover:text-brand-400 hover:bg-brand-600/10 transition-colors disabled:opacity-50" aria-label="Generate image">
                          {generatingImageId === char.id ? <RotateCcw className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
                        </button>
                        <button onClick={() => toggleMainCharacter(char.id)} className="p-1.5 rounded-md text-surface-500 hover:text-comic-yellow hover:bg-yellow-900/20 transition-colors" aria-label="Toggle main character">
                          <Star className="h-4 w-4" />
                        </button>
                        <button onClick={() => duplicateCharacter(char.id)} className="p-1.5 rounded-md text-surface-500 hover:text-surface-300 hover:bg-dark-hover transition-colors" aria-label="Duplicate">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(char.id)} className="p-1.5 rounded-md text-surface-500 hover:text-comic-red hover:bg-red-900/20 transition-colors" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <Button variant="primary" size="sm" onClick={saveCharacter} leftIcon={<Check className="h-3.5 w-3.5" />}>Save</Button>
                        <Button variant="ghost" size="sm" onClick={cancelEditing} leftIcon={<X className="h-3.5 w-3.5" />}>Cancel</Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit form */}
                {isEditing && editForm ? (
                  <div className="space-y-4 border-t border-dark-border pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                      <Select label="Role" options={[...CHARACTER_ROLES]} value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} />
                    </div>
                    <Textarea label="Full Description" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="min-h-[100px]" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: "age", label: "Age" },
                        { key: "gender", label: "Gender" },
                        { key: "faceShape", label: "Face Shape" },
                        { key: "skinTone", label: "Skin Tone" },
                        { key: "hairstyle", label: "Hairstyle" },
                        { key: "hairColour", label: "Hair Colour" },
                        { key: "eyeShape", label: "Eye Shape" },
                        { key: "eyeColour", label: "Eye Colour" },
                        { key: "height", label: "Height" },
                        { key: "bodyType", label: "Body Type" },
                        { key: "clothing", label: "Clothing" },
                        { key: "footwear", label: "Footwear" },
                      ].map(({ key, label }) => (
                        <div key={key} className="relative">
                          <Input
                            label={label}
                            value={(editForm[key as keyof Character] as string) || ""}
                            onChange={(e) => setEditForm({ ...editForm, [key as keyof Character]: e.target.value })}
                          />
                          <button
                            onClick={() => toggleLock(editForm.id, key)}
                            className={`absolute right-2 top-[34px] p-0.5 rounded transition-colors ${
                              editForm.lockedProperties.includes(key)
                                ? "text-comic-yellow"
                                : "text-surface-600 hover:text-surface-400"
                            }`}
                            aria-label={editForm.lockedProperties.includes(key) ? `Unlock ${label}` : `Lock ${label}`}
                            type="button"
                          >
                            {editForm.lockedProperties.includes(key) ? (
                              <Lock className="h-3.5 w-3.5" />
                            ) : (
                              <Unlock className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Accessories" value={editForm.accessories} onChange={(e) => setEditForm({ ...editForm, accessories: e.target.value })} />
                      <Input label="Special Marks" value={editForm.specialMarks} onChange={(e) => setEditForm({ ...editForm, specialMarks: e.target.value })} />
                      <Input label="Powers / Abilities" value={editForm.powers} onChange={(e) => setEditForm({ ...editForm, powers: e.target.value })} />
                      <Input label="Typical Expressions" value={editForm.typicalExpressions} onChange={(e) => setEditForm({ ...editForm, typicalExpressions: e.target.value })} />
                      <Input label="Colour Palette" value={editForm.colourPalette} onChange={(e) => setEditForm({ ...editForm, colourPalette: e.target.value })} />
                      <Input label="Art Style" value={editForm.artStyle} onChange={(e) => setEditForm({ ...editForm, artStyle: e.target.value })} />
                    </div>
                    <Textarea label="Additional Description" value={editForm.additionalDescription} onChange={(e) => setEditForm({ ...editForm, additionalDescription: e.target.value })} placeholder="Describe any additional details about your character..." />
                  </div>
                ) : (
                  /* Display mode: show key details */
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-dark-border pt-4">
                    {[
                      { label: "Hair", value: `${char.hairstyle} (${char.hairColour})` },
                      { label: "Eyes", value: `${char.eyeShape} (${char.eyeColour})` },
                      { label: "Skin", value: char.skinTone },
                      { label: "Build", value: `${char.height}, ${char.bodyType}` },
                      { label: "Clothing", value: char.clothing },
                      { label: "Accessories", value: char.accessories },
                      { label: "Personality", value: char.personality },
                      { label: "Palette", value: char.colourPalette },
                    ].filter(item => item.value && item.value !== " ()" && item.value !== ", ").map(({ label, value }) => (
                      <div key={label} className="text-xs">
                        <span className="text-surface-500">{label}: </span>
                        <span className="text-surface-300">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Locked properties display */}
                {char.lockedProperties.length > 0 && !isEditing && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dark-border">
                    <Lock className="h-3 w-3 text-comic-yellow" />
                    <span className="text-xs text-surface-500">Locked:</span>
                    {char.lockedProperties.map((prop) => (
                      <Badge key={prop} variant="warning">{prop}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add character button */}
      <button
        onClick={addNewCharacter}
        className="w-full mt-4 py-4 rounded-xl border-2 border-dashed border-dark-border text-surface-500 hover:text-surface-300 hover:border-surface-500 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Plus className="h-4 w-4" />
        Add New Character
      </button>

      {/* Bottom nav */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-border">
        <Link href={`/project/${projectId}/story`}>
          <Button variant="ghost" leftIcon={<ArrowLeft className="h-4 w-4" />}>Story Editor</Button>
        </Link>
        <Link href={`/project/${projectId}/review`}>
          <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>Review & Approve</Button>
        </Link>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete Character"
        description="This character will be permanently removed from the project. This action cannot be undone."
        confirmLabel="Delete Character"
        variant="danger"
        onConfirm={deleteCharacter}
      />
    </div>
  );
}
