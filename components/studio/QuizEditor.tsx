"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LocalizedField, emptyLocalized } from "@/components/studio/LocalizedField";
import { saveQuiz, deleteQuiz } from "@/lib/admin/actions";
import { localize } from "@/lib/i18n/localize";
import type { QuizInput } from "@/lib/validation/content";
import type { LocalizedText, Locale } from "@/lib/types";

const QUESTION_TYPES = ["multiple-choice", "drag-drop", "output-prediction", "labview-analysis"] as const;

type OptionState = { value: string; label: LocalizedText };
type QuestionState = {
  id?: string;
  type: (typeof QUESTION_TYPES)[number];
  prompt: LocalizedText;
  options: OptionState[];
  correctAnswer: string;
  explanation: LocalizedText;
  points: number;
  order: number;
};

const selectCls =
  "w-full rounded-lg border border-[#c8dff0] bg-white text-[#0d1b35] text-sm px-3 py-2 outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.18)] transition-[border-color,box-shadow] duration-150";
const cardCls = "bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]";

export function QuizEditor({
  initial,
  lessons,
}: {
  initial: QuizInput;
  lessons: { id: string; title: LocalizedText }[];
}) {
  const t = useTranslations("Studio");
  const tErr = useTranslations("AuthErrors");
  const locale = useLocale() as Locale;
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lessonId, setLessonId] = useState(initial.lessonId ?? lessons[0]?.id ?? "");
  const [title, setTitle] = useState<LocalizedText>(initial.title as LocalizedText);
  const [description, setDescription] = useState<LocalizedText>(initial.description as LocalizedText);
  const [passingScore, setPassingScore] = useState(initial.passingScore ?? 70);
  const [timeLimit, setTimeLimit] = useState<number | "">(initial.timeLimitMinutes ?? "");
  const [questions, setQuestions] = useState<QuestionState[]>(
    ((initial.questions as QuestionState[]) ?? []).map((q) => ({
      ...q,
      correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer[0] ?? "" : q.correctAnswer,
    }))
  );

  const patchQ = (i: number, patch: Partial<QuestionState>) =>
    setQuestions(questions.map((q, j) => (j === i ? { ...q, ...patch } : q)));

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    const res = await saveQuiz({
      id: initial.id,
      lessonId,
      title,
      description,
      passingScore: Number(passingScore) || 0,
      timeLimitMinutes: timeLimit === "" ? null : Number(timeLimit),
      questions: questions.map((q, i) => ({
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        points: Number(q.points) || 0,
        order: i,
      })),
    });
    setSaving(false);
    if (!res.ok) {
      setError(tErr(res.error) ?? res.error);
      return;
    }
    router.push("/admin/quizzes");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!initial.id) return;
    setDeleting(true);
    const res = await deleteQuiz(initial.id);
    setDeleting(false);
    if (!res.ok) {
      setError(tErr(res.error) ?? res.error);
      return;
    }
    router.push("/admin/quizzes");
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className={cardCls + " space-y-4"}>
        <h2 className="text-sm font-bold text-[#0d1b35]">{t("quizBasics")}</h2>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0d1b35]">{t("lesson")}</label>
          <select className={selectCls} value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            <option value="">{t("selectLesson")}</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>{localize(l.title, locale)}</option>
            ))}
          </select>
        </div>
        <LocalizedField label={t("fieldTitle")} value={title} onChange={setTitle} required />
        <LocalizedField label={t("fieldDescription")} value={description} onChange={setDescription} multiline />
        <div className="grid grid-cols-2 gap-4">
          <Input label={t("passingScore")} type="number" value={passingScore} onChange={(e) => setPassingScore(Number(e.target.value))} />
          <Input label={t("timeLimit")} type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value === "" ? "" : Number(e.target.value))} />
        </div>
      </div>

      <div className={cardCls + " space-y-4"}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0d1b35]">{t("questions")}</h2>
          <Button variant="outline" size="sm" onClick={() => setQuestions([...questions, { type: "multiple-choice", prompt: emptyLocalized(), options: [], correctAnswer: "", explanation: emptyLocalized(), points: 1, order: questions.length }])}>{t("addQuestion")}</Button>
        </div>
        {questions.map((q, i) => (
          <div key={i} className="rounded-lg border border-[#e4eef9] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8fa5bf]">#{i + 1}</span>
              <button type="button" onClick={() => setQuestions(questions.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600">{t("remove")}</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0d1b35]">{t("questionType")}</label>
                <select className={selectCls} value={q.type} onChange={(e) => patchQ(i, { type: e.target.value as QuestionState["type"] })}>
                  {QUESTION_TYPES.map((qt) => <option key={qt} value={qt}>{qt}</option>)}
                </select>
              </div>
              <Input label={t("points")} type="number" value={q.points} onChange={(e) => patchQ(i, { points: Number(e.target.value) })} />
            </div>
            <LocalizedField label={t("prompt")} value={q.prompt} onChange={(v) => patchQ(i, { prompt: v })} required />

            {/* Options */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0d1b35]">{t("options")}</label>
                <Button variant="ghost" size="sm" onClick={() => patchQ(i, { options: [...q.options, { value: `opt${q.options.length + 1}`, label: emptyLocalized() }] })}>{t("addOption")}</Button>
              </div>
              {q.options.map((opt, oi) => (
                <div key={oi} className="flex items-end gap-2">
                  <div className="w-28">
                    <Input label={oi === 0 ? t("optionValue") : undefined} value={opt.value} onChange={(e) => patchQ(i, { options: q.options.map((o, k) => (k === oi ? { ...o, value: e.target.value } : o)) })} />
                  </div>
                  <div className="flex-1">
                    <LocalizedField label={oi === 0 ? t("optionLabel") : undefined} value={opt.label} onChange={(v) => patchQ(i, { options: q.options.map((o, k) => (k === oi ? { ...o, label: v } : o)) })} />
                  </div>
                  <button type="button" onClick={() => patchQ(i, { options: q.options.filter((_, k) => k !== oi) })} className="text-xs text-red-500 hover:text-red-600 pb-2">{t("remove")}</button>
                </div>
              ))}
            </div>

            {/* Correct answer */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#0d1b35]">{t("correctAnswer")}</label>
              {q.options.length > 0 ? (
                <select className={selectCls} value={q.correctAnswer} onChange={(e) => patchQ(i, { correctAnswer: e.target.value })}>
                  <option value="">{t("selectAnswer")}</option>
                  {q.options.map((o) => <option key={o.value} value={o.value}>{o.value} — {localize(o.label, locale)}</option>)}
                </select>
              ) : (
                <Input value={q.correctAnswer} onChange={(e) => patchQ(i, { correctAnswer: e.target.value })} placeholder={t("answerPlaceholder")} />
              )}
            </div>

            <LocalizedField label={t("explanation")} value={q.explanation} onChange={(v) => patchQ(i, { explanation: v })} multiline />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {initial.id ? (
          <Button variant="ghost" size="sm" onClick={handleDelete} loading={deleting} className="text-red-500">{t("deleteQuiz")}</Button>
        ) : <span />}
        <Button variant="primary" onClick={handleSave} loading={saving}>{t("save")}</Button>
      </div>
    </div>
  );
}
