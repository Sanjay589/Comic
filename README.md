# ComicCraft AI — AI-Powered Comic Creation Platform

ComicCraft AI is a complete, production-ready full-stack application that transforms text prompts and user scenarios into fully designed, structured comic books. It combines Gemini's advanced text and image generation models with a premium interactive comic book editor (Comic Studio).

## Features

- **AI Story Generation:** Enter a short story idea, select style parameters (Genre, Tone, Style, Target Audience), and generate structured page segments, dialogues, camera instructions, and visual layout plans.
- **Scene Editor:** Manipulate and fine-tune each generated scene (reorder, duplicate, add custom dialogue, or request AI rewrites/re-themes).
- **Character Creator & Consistency DNA:** Define characters with visual attributes (face shape, hair color, skin tone). Lock features to construct Character DNA, ensuring consistent appearance in generated panel images.
- **Comic Studio Canvas:** Position, resize, rotate, and layer panels. Add custom speech bubbles, thought clouds, narration labels, and SFX tags using a high-fidelity Konva.js drawing canvas.
- **Autosave & History:** Integrated undo/redo stacks, and debounced background autosaving.
- **Exporting:** Compile and download final creations as high-resolution PNG grids or multi-page PDF documents.

## Technology Stack

- **Framework:** Next.js 15 (App Router with dynamic turbopack compilation)
- **Language:** strict TypeScript
- **Styling:** Tailwind CSS 4 with custom halftone background textures, comic borders, and responsive layouts
- **Drawing Canvas:** React Konva + Konva.js
- **Icons:** Lucide React
- **Exporting:** jsPDF
- **Validation:** Zod schemas

## Local Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env.local` file using the template in `.env.example`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GEMINI_TEXT_MODEL=gemini-2.5-flash
   GEMINI_IMAGE_MODEL=gemini-2.0-flash-preview-image-generation
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Database Migrations:**
   Run migrations against your Supabase Postgres instances to create the tables:
   - `profiles`
   - `comic_projects`
   - `story_versions`
   - `comic_scenes`
   - `scene_versions`
   - `comic_characters`
   - `character_versions`
   - `comic_pages`
   - `comic_panels`
   - `generation_jobs`
   - `project_exports`

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Database Schema & Row Level Security

All tables are protected under PostgreSQL Row Level Security (RLS) policies:
```sql
ALTER TABLE comic_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own projects"
  ON comic_projects
  FOR ALL
  USING (auth.uid() = user_id);
```
Updates triggers are enabled on all tables to automatically track modifications using database procedures:
```sql
CREATE TRIGGER update_comic_projects_modtime
  BEFORE UPDATE ON comic_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_modified_column();
```

## Testing

Run lint checks and compile tests using:
```bash
npm run lint
npx tsc --noEmit
```
Both steps compile successfully with zero errors.
