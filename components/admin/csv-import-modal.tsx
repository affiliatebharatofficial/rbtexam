'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { parseAndValidateCSV } from '@/lib/question-import-engine';
import { ImportValidationResult, MasterQuestion } from '@/types/master-question';
import { createQuestion } from '@/lib/master-question-bank';
import { X, Upload, CheckCircle2, AlertCircle, FileText, ArrowRight, RefreshCw } from 'lucide-react';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CSVImportModal({ isOpen, onClose, onSuccess }: CSVImportModalProps) {
  const [csvContent, setCsvContent] = useState('');
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      const result = parseAndValidateCSV(text);
      setValidationResult(result);
    };
    reader.readAsText(file);
  };

  const handleCommitImport = async () => {
    if (!validationResult || validationResult.validRows.length === 0) return;

    setIsImporting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    let count = 0;
    validationResult.validRows.forEach((row) => {
      createQuestion(row as any);
      count++;
    });

    setIsImporting(false);
    setImportSuccessCount(count);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl relative">
        <Card glass className="p-6 sm:p-8 shadow-2xl border-white/90 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Bulk Import Questions (CSV / Excel)</h2>
              <p className="text-xs text-slate-500">Upload CSV file to import RBT, BCaBA, or BCBA practice questions</p>
            </div>

            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          {importSuccessCount === null ? (
            <div className="space-y-6">
              {/* File Upload Zone */}
              <div className="p-8 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl text-center space-y-3 bg-slate-50/50">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Select a CSV file to validate</p>
                  <p className="text-xs text-slate-500">Expected columns: ID, Certification, Category, Difficulty, Type, Question, Scenario, Option A, Option B, Option C, Option D, Correct Choice</p>
                </div>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  id="csv-file-input"
                />
                <label
                  htmlFor="csv-file-input"
                  className="inline-block px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Browse File
                </label>
              </div>

              {/* Validation Summary Box */}
              {validationResult && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span>Validation Summary</span>
                    <span className="text-[#2563EB]">Total Rows: {validationResult.totalRows}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <div className="text-lg font-black">{validationResult.validRows.length}</div>
                      <div className="text-[10px] font-bold">Valid Questions</div>
                    </div>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800">
                      <div className="text-lg font-black">{validationResult.invalidRows.length}</div>
                      <div className="text-[10px] font-bold">Invalid Rows</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800">
                      <div className="text-lg font-black">{validationResult.duplicateCount}</div>
                      <div className="text-[10px] font-bold">Duplicates</div>
                    </div>
                  </div>

                  {/* Error Logs Preview */}
                  {validationResult.invalidRows.length > 0 && (
                    <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-900 space-y-1 max-h-32 overflow-y-auto">
                      <div className="font-bold">Error Logs:</div>
                      {validationResult.invalidRows.map((inv, idx) => (
                        <div key={idx} className="text-[11px]">
                          Row {inv.row}: {inv.errors.join(', ')}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button onClick={onClose} variant="outline" size="md" className="text-xs">
                  Cancel
                </Button>
                <Button
                  onClick={handleCommitImport}
                  disabled={!validationResult || validationResult.validRows.length === 0 || isImporting}
                  variant="primary"
                  size="md"
                  className="gap-2 shadow-md px-6"
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Importing...</span>
                    </>
                  ) : (
                    <>
                      <span>Import {validationResult?.validRows.length || 0} Questions</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            /* Success View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Successfully Imported {importSuccessCount} Questions!
              </h3>
              <p className="text-xs text-slate-500">The questions have been added to the master question bank.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
