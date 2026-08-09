-- RBT 3rd Edition Test Content Outline (TCO) Production Database Migration
-- Non-destructive: Existing 2nd_edition records are preserved as legacy.

BEGIN;

-- 1. Update default task_list_version for master_questions table to '3rd_edition'
ALTER TABLE IF EXISTS public.master_questions 
  ALTER COLUMN task_list_version SET DEFAULT '3rd_edition';

-- 2. Update default task_list_version for ai_generated_content if column exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'ai_generated_content' 
      AND column_name = 'task_list_version'
  ) THEN
    ALTER TABLE public.ai_generated_content ALTER COLUMN task_list_version SET DEFAULT '3rd_edition';
  END IF;
END $$;

-- 3. Ensure index exists for fast version filtering
CREATE INDEX IF NOT EXISTS idx_master_questions_task_list_ver 
  ON public.master_questions(task_list_version);

COMMIT;
