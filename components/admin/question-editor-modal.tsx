'use client';

import React, { useState, useEffect } from 'react';
import { MasterQuestion, CertificationLevel, QuestionType, QuestionDifficulty, QuestionStatus, QuestionCategory } from '@/types/master-question';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Save, Eye, Check, AlertCircle, HelpCircle, Code, Table, Image, Film, Plus, Trash2, Sparkles } from 'lucide-react';

interface QuestionEditorModalProps {
  isOpen: boolean;
  question?: MasterQuestion | null;
  onClose: () => void;
  onSave: (data: Partial<MasterQuestion>) => void;
}

export function QuestionEditorModal({ isOpen, question, onClose, onSave }: QuestionEditorModalProps) {
  const [certification, setCertification] = useState<CertificationLevel>('RBT');
  const [category, setCategory] = useState<QuestionCategory>('Measurement');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('medium');
  const [questionType, setQuestionType] = useState<QuestionType>('scenario_based');
  const [status, setStatus] = useState<QuestionStatus>('published');
  const [isAiAutofilling, setIsAiAutofilling] = useState(false);

  const handleAiAutofill = async () => {
    setIsAiAutofilling(true);
    try {
      const res = await fetch('/api/questions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicPrompt: `${category} ${certification} practice question`,
          certification: certification,
          difficulty: difficulty,
          count: 1,
        }),
      });

      const data = await res.json();
      if (data.questions && data.questions[0]) {
        const q = data.questions[0];
        setQuestionText(q.question);
        setOptions(q.options.map((o: any) => ({ id: o.id, text: o.text, isCorrect: o.id === q.correctOptionId, explanation: o.explanation || '' })));
        setCorrectAnswerId(q.correctOptionId);
        setClinicalExplanation(q.clinicalExplanation);
        setAnswerExplanation(q.clinicalExplanation);
        setReferences(q.bacbCitation || `BACB RBT 3rd Edition TCO Item ${category}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiAutofilling(false);
    }
  };

  const [questionText, setQuestionText] = useState('');
  const [scenarioText, setScenarioText] = useState('');
  const [options, setOptions] = useState([
    { id: 'A', text: '', isCorrect: true, explanation: '' },
    { id: 'B', text: '', isCorrect: false, explanation: '' },
    { id: 'C', text: '', isCorrect: false, explanation: '' },
    { id: 'D', text: '', isCorrect: false, explanation: '' },
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState('A');
  const [answerExplanation, setAnswerExplanation] = useState('');
  const [clinicalExplanation, setClinicalExplanation] = useState('');
  const [references, setReferences] = useState('BACB RBT 3rd Edition TCO Item A-01');
  const [examTips, setExamTips] = useState('');
  const [commonMistakes, setCommonMistakes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    if (question) {
      setCertification(question.certification);
      setCategory(question.category);
      setDifficulty(question.difficulty);
      setQuestionType(question.questionType);
      setStatus(question.status);
      setQuestionText(question.question);
      setScenarioText(question.scenarioText || '');
      setOptions(question.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect, explanation: o.explanation || '' })));
      setCorrectAnswerId(question.correctAnswerId);
      setAnswerExplanation(question.answerExplanation);
      setClinicalExplanation(question.clinicalExplanation);
      setReferences(question.references);
      setExamTips(question.examTips || '');
      setCommonMistakes(question.commonMistakes || '');
      setInternalNotes(question.internalNotes || '');
      setIsPremium(question.isPremium);
    } else {
      // Defaults for new question
      setQuestionText('');
      setScenarioText('');
      setAnswerExplanation('');
      setClinicalExplanation('');
      setExamTips('');
      setCommonMistakes('');
    }
  }, [question, isOpen]);

  if (!isOpen) return null;

  const handleOptionTextChange = (id: string, text: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, text } : o)));
  };

  const handleOptionExplanationChange = (id: string, explanation: string) => {
    setOptions(options.map((o) => (o.id === id ? { ...o, explanation } : o)));
  };

  const handleSetCorrect = (id: string) => {
    setCorrectAnswerId(id);
    setOptions(options.map((o) => ({ ...o, isCorrect: o.id === id })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      certification,
      category,
      difficulty,
      questionType,
      status,
      question: questionText,
      scenarioText,
      options: options.map((o) => ({ ...o, isCorrect: o.id === correctAnswerId })),
      correctAnswerId,
      answerExplanation,
      clinicalExplanation,
      references,
      examTips,
      commonMistakes,
      internalNotes,
      isPremium,
      keywords: [category, certification],
      taskListVersion: '3rd_edition',
      estimatedTimeSeconds: 60,
      tags: [certification, category],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto relative">
        <Card glass className="p-6 sm:p-8 shadow-2xl border-white/90 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A]">
                {question ? `Edit Master Question (${question.id})` : 'Create Master Question'}
              </h2>
              <p className="text-xs text-slate-500">
                RBT / BCaBA / BCBA Exam Item Bank Editor with Markdown & Clinical Support
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1 rounded-lg ${activeTab === 'editor' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'}`}
                >
                  Editor Form
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-lg ${activeTab === 'preview' ? 'bg-white shadow text-slate-900 font-bold' : 'text-slate-500'}`}
                >
                  Preview Card
                </button>
              </div>

              <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Certification, Category, Difficulty, Type, Status */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Certification
                  </label>
                  <select
                    value={certification}
                    onChange={(e) => setCertification(e.target.value as CertificationLevel)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="RBT">RBT</option>
                    <option value="BCaBA">BCaBA</option>
                    <option value="BCBA">BCBA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="Measurement">Measurement</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Skill Acquisition">Skill Acquisition</option>
                    <option value="Behavior Reduction">Behavior Reduction</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Professional Conduct">Professional Conduct</option>
                    <option value="Ethics">Ethics</option>
                    <option value="Reinforcement">Reinforcement</option>
                    <option value="Token Economy">Token Economy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Type
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="scenario_based">Scenario Based</option>
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="case_study">Case Study</option>
                    <option value="true_false">True / False</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as QuestionStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>

              {/* Scenario Context */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Clinical Scenario / Case Study Text (Optional)
                </label>
                <textarea
                  rows={3}
                  value={scenarioText}
                  onChange={(e) => setScenarioText(e.target.value)}
                  placeholder="e.g. An RBT is tracking how long a client engages in vocal crying after being asked to transition..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                />
              </div>

              {/* Question Prompt */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Main Question Prompt *
                  </label>
                  <Button
                    type="button"
                    onClick={handleAiAutofill}
                    disabled={isAiAutofilling}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-[11px] font-black text-indigo-700 border-indigo-200 bg-indigo-50 hover:bg-indigo-100"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isAiAutofilling ? 'AI Generating...' : '⚡ Auto-Fill Question with AI'}</span>
                  </Button>
                </div>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="e.g. Which continuous measurement procedure is being implemented?"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40"
                />
              </div>

              {/* Options Section */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Options & Distractor Explanations *
                </label>

                {options.map((opt) => (
                  <div key={opt.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleSetCorrect(opt.id)}
                        className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center border transition-all ${
                          correctAnswerId === opt.id
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        {opt.id}
                      </button>
                      <input
                        type="text"
                        required
                        value={opt.text}
                        onChange={(e) => handleOptionTextChange(opt.id, e.target.value)}
                        placeholder={`Option ${opt.id} text...`}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none"
                      />
                      {correctAnswerId === opt.id && (
                        <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                          CORRECT CHOICE
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      value={opt.explanation}
                      onChange={(e) => handleOptionExplanationChange(opt.id, e.target.value)}
                      placeholder={`Distractor rationale for choice ${opt.id}...`}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Explanations & Citations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Standard Answer Explanation *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={answerExplanation}
                    onChange={(e) => setAnswerExplanation(e.target.value)}
                    placeholder="Short core rationale explaining why the correct choice is right..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Detailed Clinical ABA Explanation *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={clinicalExplanation}
                    onChange={(e) => setClinicalExplanation(e.target.value)}
                    placeholder="In-depth clinical ABA analysis and task item justification..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* References & Exam Tips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    BACB References / Citation
                  </label>
                  <input
                    type="text"
                    required
                    value={references}
                    onChange={(e) => setReferences(e.target.value)}
                    placeholder="e.g. BACB RBT 3rd Edition TCO Item A-01"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Exam Pro Tip
                  </label>
                  <input
                    type="text"
                    value={examTips}
                    onChange={(e) => setExamTips(e.target.value)}
                    placeholder="e.g. Look for SD delivery timestamp"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Common Mistake Trap
                  </label>
                  <input
                    type="text"
                    value={commonMistakes}
                    onChange={(e) => setCommonMistakes(e.target.value)}
                    placeholder="e.g. Confusing Latency with Duration"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Submit Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button type="button" onClick={onClose} variant="outline" size="md" className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" className="gap-2 shadow-md px-8">
                  <Save className="w-4 h-4" />
                  <span>Save Question to Bank</span>
                </Button>
              </div>
            </form>
          ) : (
            /* PREVIEW CARD TAB */
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-[#2563EB]">
                    {certification} • {category} • {difficulty.toUpperCase()}
                  </span>
                  <span className="text-slate-500">Status: {status}</span>
                </div>
                {scenarioText && <p className="italic text-slate-700">{scenarioText}</p>}
                <h3 className="text-sm font-bold text-slate-900">{questionText || 'Enter question text...'}</h3>
                <div className="space-y-2">
                  {options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border flex items-center justify-between ${
                        correctAnswerId === opt.id
                          ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{opt.id}. {opt.text || 'Option text...'}</span>
                      {correctAnswerId === opt.id && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-blue-50 text-slate-800 space-y-1">
                  <div className="font-bold text-[#2563EB]">Socrates AI Rationale Preview:</div>
                  <p>{clinicalExplanation || answerExplanation || 'Clinical explanation preview...'}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
