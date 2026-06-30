-- BuildHer Database Schema
-- 在 Supabase SQL Editor 中执行此文件

-- 女性 Builder 主表
CREATE TABLE IF NOT EXISTS builders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  track TEXT NOT NULL CHECK (track IN ('Founder', 'Builder', 'KOL', 'Investor')),
  region TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  twitter TEXT DEFAULT '',
  xiaohongshu TEXT DEFAULT '',
  projects TEXT[] DEFAULT ARRAY[]::TEXT[],
  score NUMERIC(5,2) DEFAULT 0,
  rank INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_builders_track ON builders(track);
CREATE INDEX IF NOT EXISTS idx_builders_score ON builders(score DESC);
CREATE INDEX IF NOT EXISTS idx_builders_rank ON builders(rank);

-- 提名表
CREATE TABLE IF NOT EXISTS nominations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  track TEXT NOT NULL CHECK (track IN ('Founder', 'Builder', 'KOL', 'Investor')),
  region TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  reason TEXT NOT NULL DEFAULT '',
  twitter TEXT DEFAULT '',
  xiaohongshu TEXT DEFAULT '',
  projects TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_nominations_status ON nominations(status);
CREATE INDEX IF NOT EXISTS idx_nominations_created ON nominations(created_at DESC);

-- 启用 Row Level Security
ALTER TABLE builders ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominations ENABLE ROW LEVEL SECURITY;

-- RLS 策略：builders 表允许所有人读取
CREATE POLICY "Allow public read access for builders"
  ON builders FOR SELECT
  USING (true);

-- RLS 策略：nominations 表允许匿名插入（提交提名）
CREATE POLICY "Allow anonymous insert for nominations"
  ON nominations FOR INSERT
  WITH CHECK (true);

-- RLS 策略：nominations 表仅允许认证用户读取
CREATE POLICY "Allow authenticated read for nominations"
  ON nominations FOR SELECT
  USING (auth.role() = 'authenticated');

-- RLS 策略：仅认证管理员可更新 nominations
CREATE POLICY "Allow authenticated update nominations"
  ON nominations FOR UPDATE
  USING (auth.role() = 'authenticated');

-- RLS 策略：仅认证管理员可删除 nominations
CREATE POLICY "Allow authenticated delete nominations"
  ON nominations FOR DELETE
  USING (auth.role() = 'authenticated');

-- RLS 策略：仅认证管理员可新增 builders
CREATE POLICY "Allow authenticated insert builders"
  ON builders FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS 策略：仅认证管理员可更新 builders
CREATE POLICY "Allow authenticated update builders"
  ON builders FOR UPDATE
  USING (auth.role() = 'authenticated');

-- RLS 策略：仅认证管理员可删除 builders
CREATE POLICY "Allow authenticated delete builders"
  ON builders FOR DELETE
  USING (auth.role() = 'authenticated');

-- Supabase Storage 配置
-- 请在 Supabase Dashboard > Storage 中手动创建 nominations 桶，或执行以下 SQL：
-- 注意：Storage 桶的创建需在 Supabase Dashboard 中操作，以下为 Storage 桶的 RLS 策略参考

-- Storage 策略：允许匿名上传提名头像
-- CREATE POLICY "Allow anonymous upload to nominations bucket"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'nominations');

-- Storage 策略：允许公开读取 nominations 桶中的文件
-- CREATE POLICY "Allow public read from nominations bucket"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'nominations');
