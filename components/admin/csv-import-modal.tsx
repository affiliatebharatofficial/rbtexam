'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { parseAndValidateCSV, generateSampleCSVTemplate } from '@/lib/question-import-engine';
import { CertificationLevel, ImportValidationResult, MasterQuestion } from '@/types/master-question';
import { createQuestion } from '@/lib/master-question-bank';
import { X, Upload, CheckCircle2, AlertCircle, FileText, ArrowRight, RefreshCw, Download, Layers } from 'lucide-react';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  existingQuestions?: MasterQuestion[];
}

export function CSVImportModal({ isOpen, onClose, onSuccess, existingQuestions = [] }: CSVImportModalProps) {
  const [csvContent, setCsvContent] = useState('');
  const [targetCert, setTargetCert] = useState<CertificationLevel>('BCBA');
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);
  const [dbStems, setDbStems] = useState<MasterQuestion[]>([]);

  // Fetch all live database stems for exhaustive duplicate detection
  React.useEffect(() => {
    if (!isOpen) return;
    fetch('/api/questions/stems')
      .then((res) => res.json())
      .then((data: any) => {
        if (data && Array.isArray(data.stems)) {
          const mapped = data.stems.map((text: string) => ({ question: text } as MasterQuestion));
          setDbStems(mapped);
        }
      })
      .catch((err) => console.error('Failed to load database stems for duplicate detection:', err));
  }, [isOpen]);

  const allKnownQuestions = React.useMemo(() => {
    return [...existingQuestions, ...dbStems];
  }, [existingQuestions, dbStems]);

  const runValidation = (text: string, cert: CertificationLevel) => {
    if (!text) return;
    const result = parseAndValidateCSV(text, allKnownQuestions, cert);
    setValidationResult(result);
  };

  React.useEffect(() => {
    if (csvContent && dbStems.length > 0) {
      runValidation(csvContent, targetCert);
    }
  }, [dbStems]);

  if (!isOpen) return null;

  const handleCertChange = (cert: CertificationLevel) => {
    setTargetCert(cert);
    if (csvContent) {
      runValidation(csvContent, cert);
    }
  };

  const handleDownloadSampleCSV = () => {
    const csv = generateSampleCSVTemplate();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${targetCert.toLowerCase()}_questions_template_${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      runValidation(text, targetCert);
    };
    reader.readAsText(file);
  };

  const handleCommitImport = async () => {
    if (!validationResult || validationResult.validRows.length === 0) return;

    setIsImporting(true);

    try {
      const res = await fetch('/api/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'import',
          questions: validationResult.validRows,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data || data.success === false) {
        setIsImporting(false);
        alert(data?.error || 'Failed to import CSV questions into database.');
        return;
      }

      if (data.importedCount === 0 && (data.skippedDuplicatesCount > 0 || validationResult.validRows.length > 0)) {
        setIsImporting(false);
        alert(`All ${data.skippedDuplicatesCount || validationResult.validRows.length} question(s) already exist in the database as duplicates and were skipped.`);
        return;
      }

      const count = data.importedCount;
      setIsImporting(false);
      setImportSuccessCount(count);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error('CSV import API error:', err);
      setIsImporting(false);
      alert(err.message || 'Failed to import CSV questions into database.');
    }
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
              {/* Target Certification Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Target Certification Level:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {(['BCBA', 'BCaBA', 'RBT'] as CertificationLevel[]).map((cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => handleCertChange(cert)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        targetCert === cert
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

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
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <label
                    htmlFor="csv-file-input"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs cursor-pointer shadow-md hover:bg-blue-700 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Browse CSV File</span>
                  </label>

                  <Button
                    type="button"
                    onClick={handleDownloadSampleCSV}
                    variant="outline"
                    size="sm"
                    className="gap-2 font-bold text-xs border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 py-2.5 px-4 rounded-xl"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>Download Sample CSV Template</span>
                  </Button>
                </div>
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
