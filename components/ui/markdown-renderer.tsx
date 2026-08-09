'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Enhanced Markdown & Table Renderer for AI Tutor responses.
 * Parses GFM Markdown tables, headings, code blocks, lists, bold text, blockquotes, and inline formatting
 * into Apple-level styled HTML elements.
 */
export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) return null;

  // Render inline formatting (**bold**, *italic*, `code`, etc.)
  const renderInline = (text: string): React.ReactNode[] => {
    // Regex matching **bold**, *italic*, `code`, and [link](url)
    const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g);

    return tokens.map((token, idx) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={idx} className="font-extrabold text-slate-900 dark:text-slate-100">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith('*') && token.endsWith('*') && !token.startsWith('**')) {
        return (
          <em key={idx} className="italic text-slate-800 dark:text-slate-200">
            {token.slice(1, -1)}
          </em>
        );
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-[#2563EB] dark:text-blue-300 font-mono text-xs font-bold border border-blue-100 dark:border-blue-900"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a
            key={idx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2563EB] underline font-bold hover:text-blue-700"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return token;
    });
  };

  // Helper to parse GFM Markdown Tables
  const isTableDelimiter = (line: string) => {
    return /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(line.trim());
  };

  const isTableRow = (line: string) => {
    return line.trim().startsWith('|') && line.trim().endsWith('|');
  };

  const parseTableCells = (line: string): string[] => {
    return line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());
  };

  // Process lines into block structures (Paragraphs, Headings, Tables, Lists, Code, Quotes)
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Table Detection
    if (isTableRow(line) && i + 1 < lines.length && isTableDelimiter(lines[i + 1])) {
      const headerCells = parseTableCells(line);
      i += 2; // Skip header and delimiter

      const rowCellsList: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rowCellsList.push(parseTableCells(lines[i]));
        i++;
      }

      blocks.push(
        <div
          key={`table-${blockKey++}`}
          className="my-4 overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900 transition-all"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 dark:bg-slate-950 text-white">
                  {headerCells.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-4 py-3.5 font-black text-xs uppercase tracking-wider text-slate-100 border-b border-slate-800"
                    >
                      {renderInline(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {rowCellsList.map((rowCells, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors even:bg-slate-50/50 dark:even:bg-slate-900/50"
                  >
                    {headerCells.map((_, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-3 text-slate-800 dark:text-slate-200 font-medium leading-normal"
                      >
                        {renderInline(rowCells[cIdx] || '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
      continue;
    }

    // 2. Code Block Detection (```lang ... ```)
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace(/^```/, '');
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++; // Skip closing fence
      }

      blocks.push(
        <div
          key={`code-${blockKey++}`}
          className="my-3 rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner"
        >
          {lang && (
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 border-b border-slate-800 pb-1">
              {lang}
            </div>
          )}
          <pre className="whitespace-pre">{codeLines.join('\n')}</pre>
        </div>
      );
      continue;
    }

    // 3. Headings (#, ##, ###, ####)
    if (line.startsWith('# ')) {
      blocks.push(
        <h1
          key={`h1-${blockKey++}`}
          className="text-xl font-black text-slate-900 dark:text-slate-100 mt-5 mb-2.5 tracking-tight border-b border-slate-200 pb-1"
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2
          key={`h2-${blockKey++}`}
          className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-4 mb-2 tracking-tight flex items-center gap-2"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(
        <h3
          key={`h3-${blockKey++}`}
          className="text-base font-bold text-slate-800 dark:text-slate-200 mt-3.5 mb-1.5"
        >
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('#### ')) {
      blocks.push(
        <h4
          key={`h4-${blockKey++}`}
          className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-3 mb-1"
        >
          {renderInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // 4. Blockquotes (> quote)
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push(
        <blockquote
          key={`quote-${blockKey++}`}
          className="my-3 p-3.5 rounded-r-xl border-l-4 border-[#2563EB] bg-blue-50/60 dark:bg-blue-950/40 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium shadow-sm"
        >
          {renderInline(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // 5. Unordered List Items (- or *)
    if (/^[-*]\s+/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul-${blockKey++}`} className="my-2.5 space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx} className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 flex-shrink-0" />
              <span className="flex-1 leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered List Items (1. , 2. )
    if (/^\d+\.\s+/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={`ol-${blockKey++}`} className="my-2.5 space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx} className="flex items-start space-x-2.5">
              <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-[10px] font-bold flex-shrink-0 mt-0.5">
                {itemIdx + 1}
              </span>
              <span className="flex-1 leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Empty Line / Line Breaks
    if (!line.trim()) {
      i++;
      continue;
    }

    // 8. Default Paragraph
    blocks.push(
      <p
        key={`p-${blockKey++}`}
        className="my-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed"
      >
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className={`space-y-1 text-slate-900 dark:text-slate-100 ${className}`}>{blocks}</div>;
}
