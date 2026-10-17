/*
# Create turtles table (single-tenant, no auth)

Educational game about Mediterranean sea turtles (Ocean Hackathon).
Players create a personalized turtle (name + gender + origin location)
that is persisted so progress can be resumed across reloads.

1. New Tables
- `turtles`
  - `id` (uuid, primary key)
  - `name` (text, not null) — the turtle's given name, e.g. "Caretta"
  - `gender` (text, not null, CHECK in 'male','female') — chosen gender
  - `origin` (text, not null, CHECK in 'cote_azur','baleares','sicile') — starting nesting hotspot
  - `created_at` (timestamptz, defaults to now())
2. Security
- Enable RLS on `turtles`.
- Single-tenant (no sign-in): allow anon + authenticated full CRUD because the data is intentionally shared/public for this educational game.
3. Notes
- No user_id column — no sign-in screen in this game.
- Origin values map to the three Mediterranean hotspots shown on the onboarding map.
*/

CREATE TABLE IF NOT EXISTS turtles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  origin text NOT NULL CHECK (origin IN ('cote_azur', 'baleares', 'sicile')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE turtles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_turtles" ON turtles;
CREATE POLICY "anon_select_turtles" ON turtles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_turtles" ON turtles;
CREATE POLICY "anon_insert_turtles" ON turtles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_turtles" ON turtles;
CREATE POLICY "anon_update_turtles" ON turtles FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_turtles" ON turtles;
CREATE POLICY "anon_delete_turtles" ON turtles FOR DELETE
  TO anon, authenticated USING (true);
