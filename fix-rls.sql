-- Disable RLS for analyses table to allow API insertions
-- You can run this in your Supabase SQL editor

ALTER TABLE analyses DISABLE ROW LEVEL SECURITY;

-- Alternative: Create a policy that allows insertions
-- If you prefer to keep RLS enabled, you can use this instead:
-- 
-- CREATE POLICY "Allow all operations on analyses" ON analyses
-- FOR ALL USING (true) WITH CHECK (true);
--
-- Or for more security, create a policy that only allows authenticated users:
-- 
-- CREATE POLICY "Allow authenticated users to insert analyses" ON analyses
-- FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
--
-- CREATE POLICY "Allow users to read their own analyses" ON analyses
-- FOR SELECT USING (auth.uid()::text = user_id);
