// Application Constants

export const APP_NAME = "ComicCraft AI";
export const APP_DESCRIPTION =
  "Transform your imagination into stunning comics with AI-powered story generation, character creation, and panel artwork.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Comic styles available for generation
export const COMIC_STYLES = [
  { value: "superhero", label: "Superhero Comic" },
  { value: "manga", label: "Manga" },
  { value: "anime", label: "Anime-Inspired" },
  { value: "cartoon", label: "Cartoon" },
  { value: "watercolor", label: "Watercolour Storybook" },
  { value: "noir", label: "Noir Graphic Novel" },
  { value: "retro", label: "Retro Newspaper" },
  { value: "scifi", label: "Sci-Fi Comic" },
  { value: "fantasy", label: "Fantasy Illustration" },
  { value: "minimal", label: "Minimal Flat Illustration" },
] as const;

export const GENRES = [
  { value: "action", label: "Action" },
  { value: "adventure", label: "Adventure" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "scifi", label: "Sci-Fi" },
  { value: "slice-of-life", label: "Slice of Life" },
  { value: "superhero", label: "Superhero" },
  { value: "thriller", label: "Thriller" },
] as const;

export const TONES = [
  { value: "lighthearted", label: "Lighthearted" },
  { value: "serious", label: "Serious" },
  { value: "humorous", label: "Humorous" },
  { value: "dark", label: "Dark" },
  { value: "epic", label: "Epic" },
  { value: "nostalgic", label: "Nostalgic" },
  { value: "suspenseful", label: "Suspenseful" },
  { value: "whimsical", label: "Whimsical" },
  { value: "dramatic", label: "Dramatic" },
  { value: "inspirational", label: "Inspirational" },
] as const;

export const TARGET_AUDIENCES = [
  { value: "children", label: "Children (6-12)" },
  { value: "teens", label: "Teens (13-17)" },
  { value: "young-adult", label: "Young Adult (18-25)" },
  { value: "adult", label: "Adult (25+)" },
  { value: "all-ages", label: "All Ages" },
] as const;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "zh", label: "Chinese" },
  { value: "hi", label: "Hindi" },
  { value: "pt", label: "Portuguese" },
  { value: "it", label: "Italian" },
] as const;

export const CAMERA_ANGLES = [
  "Wide Shot",
  "Medium Shot",
  "Close-Up",
  "Extreme Close-Up",
  "Bird's Eye View",
  "Worm's Eye View",
  "Over-the-Shoulder",
  "Dutch Angle",
  "Profile Shot",
  "Three-Quarter View",
] as const;

export const TIMES_OF_DAY = [
  "Dawn",
  "Morning",
  "Noon",
  "Afternoon",
  "Sunset",
  "Evening",
  "Night",
  "Midnight",
] as const;

export const MOODS = [
  "Happy",
  "Sad",
  "Tense",
  "Mysterious",
  "Peaceful",
  "Chaotic",
  "Romantic",
  "Scary",
  "Comedic",
  "Epic",
  "Melancholic",
  "Exciting",
] as const;

export const CHARACTER_ROLES = [
  { value: "main", label: "Main Character" },
  { value: "supporting", label: "Supporting Character" },
  { value: "villain", label: "Villain" },
  { value: "mentor", label: "Mentor" },
  { value: "sidekick", label: "Sidekick" },
  { value: "love-interest", label: "Love Interest" },
  { value: "comic-relief", label: "Comic Relief" },
  { value: "background", label: "Background Character" },
] as const;

export const PROJECT_STATUSES = {
  draft: { label: "Draft", color: "bg-surface-500" },
  story_created: { label: "Story Created", color: "bg-brand-500" },
  characters_created: { label: "Characters Created", color: "bg-accent-500" },
  approved: { label: "Approved", color: "bg-comic-green" },
  generating: { label: "Generating", color: "bg-comic-yellow" },
  completed: { label: "Completed", color: "bg-comic-green" },
  failed: { label: "Failed", color: "bg-comic-red" },
} as const;

export const BUBBLE_TYPES = [
  { value: "speech", label: "Speech Bubble" },
  { value: "thought", label: "Thought Bubble" },
  { value: "narration", label: "Narration Box" },
  { value: "sfx", label: "Sound Effect" },
  { value: "whisper", label: "Whisper" },
  { value: "shout", label: "Shout" },
] as const;

// Demo mode detection
export function isDemoMode(): boolean {
  return (
    !process.env.GEMINI_API_KEY ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
