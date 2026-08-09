import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('MarkdownRenderer Component & AI Output Formatting', () => {
  it('should verify MarkdownRenderer component exists and exports properly', () => {
    const compPath = path.join(process.cwd(), 'components', 'ui', 'markdown-renderer.tsx');
    expect(fs.existsSync(compPath)).toBe(true);

    const content = fs.readFileSync(compPath, 'utf8');
    expect(content).toContain('export function MarkdownRenderer');
    expect(content).toContain('isTableDelimiter');
    expect(content).toContain('isTableRow');
    expect(content).toContain('parseTableCells');
    expect(content).toContain('<table');
  });

  it('should verify app/tutor/page.tsx imports and renders MarkdownRenderer', () => {
    const tutorPath = path.join(process.cwd(), 'app', 'tutor', 'page.tsx');
    expect(fs.existsSync(tutorPath)).toBe(true);

    const content = fs.readFileSync(tutorPath, 'utf8');
    expect(content).toContain("import { MarkdownRenderer } from '@/components/ui/markdown-renderer'");
    expect(content).toContain('<MarkdownRenderer content={msg.content} />');
  });
});
