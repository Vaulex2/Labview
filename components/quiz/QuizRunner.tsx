"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { submitQuiz, type SubmitQuizResult } from "@/lib/quiz/actions";
import { localize } from "@/lib/i18n/localize";
import type { Quiz, QuizQuestion, Locale } from "@/lib/types";

function MultipleChoice({ question, selected, onSelect, locale }: { question: QuizQuestion; selected?: string; onSelect: (v: string) => void; locale: Locale }) {
  return (
    <div className="space-y-3">
      {question.options?.map(opt => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={[
              "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-[border-color,background-color,box-shadow] duration-150",
              "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 active:scale-[0.99]",
              isSelected
                ? "bg-[rgba(0,180,216,0.10)] border-[#00b4d8] text-[#0d1b35] shadow-[0_0_0_2px_rgba(0,180,216,0.15)]"
                : "bg-white border-[#c8dff0] text-[#4a6080] hover:border-[#00b4d8] hover:text-[#0d1b35] hover:bg-[#f8faff]",
            ].join(" ")}
          >
            <div className="flex items-center gap-3">
              <span className={[
                "w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors duration-150",
                isSelected ? "border-[#00b4d8] bg-[#00b4d8]" : "border-[#c8dff0]",
              ].join(" ")}>
                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
              </span>
              {localize(opt.label, locale)}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function OutputPrediction({ question, selected, onSelect, locale, promptLabel }: { question: QuizQuestion; selected?: string; onSelect: (v: string) => void; locale: Locale; promptLabel: string }) {
  return (
    <div>
      <div className="p-4 rounded-xl bg-[#0d1b35] border border-[#162d5a] mb-5">
        <p className="text-xs text-[#22d3ee] font-semibold tracking-wide uppercase mb-2">{promptLabel}</p>
        <p className="text-sm text-[#c8dff0] font-mono">{localize(question.prompt, locale)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {question.options?.map(opt => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className={[
                "h-14 rounded-xl border text-base font-bold font-mono transition-[border-color,background-color,box-shadow] duration-150",
                "focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 active:scale-[0.97]",
                isSelected
                  ? "bg-[rgba(0,180,216,0.10)] border-[#00b4d8] text-[#00b4d8]"
                  : "bg-white border-[#c8dff0] text-[#4a6080] hover:border-[#00b4d8] hover:text-[#0d1b35]",
              ].join(" ")}
            >
              {localize(opt.label, locale)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const t = useTranslations("Quiz");
  const tTypes = useTranslations("Quiz.types");
  const tErr = useTranslations("AuthErrors");
  const locale = useLocale() as Locale;
  const startedAt = useRef(Date.now());

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<SubmitQuizResult | null>(null);

  const question = quiz.questions[current];
  const totalQ = quiz.questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (v: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: v }));
  };

  const handleNext = async () => {
    if (current < totalQ - 1) {
      setCurrent((c) => c + 1);
      return;
    }
    setError(null);
    setSubmitting(true);
    const elapsed = Math.round((Date.now() - startedAt.current) / 1000);
    const res = await submitQuiz(quiz.id, answers, elapsed);
    setSubmitting(false);
    if (!res.ok) {
      setError(tErr(res.error));
      return;
    }
    setOutcome(res);
  };

  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));

  if (outcome && outcome.ok) {
    const { score, maxScore, percentage, passed } = outcome.result;
    return (
      <>
        <AppTopBar title={t("complete")} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className={[
              "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-extrabold",
              passed ? "bg-emerald-50 border-2 border-emerald-200 text-emerald-600" : "bg-red-50 border-2 border-red-200 text-red-500",
            ].join(" ")} style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
              {percentage}%
            </div>
            <h2 className="text-2xl font-bold text-[#0d1b35] mb-2" style={{fontFamily:"Outfit, system-ui, sans-serif"}}>
              {passed ? t("congrats") : t("keepPracticing")}
            </h2>
            <p className="text-[#4a6080] mb-1">{t("points", { score, max: maxScore })}</p>
            <Badge variant={passed ? "success" : "danger"} className="mb-6">{passed ? t("passed") : t("notYet")}</Badge>
            <div className="flex gap-3 justify-center mt-2">
              <Button variant="outline" onClick={() => { setCurrent(0); setAnswers({}); setOutcome(null); startedAt.current = Date.now(); }}>
                {t("retake")}
              </Button>
              <Link href="/library">
                <Button variant="primary">{t("backToLibrary")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  const progressPct = Math.round(((current + 1) / totalQ) * 100);

  return (
    <>
      <AppTopBar title={localize(quiz.title, locale)} subtitle={t("questionOf", { current: current + 1, total: totalQ })} />
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-2xl mx-auto">

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8fa5bf]">{t("progress")}</span>
              <span className="text-xs font-semibold text-[#0d1b35]">{t("answered", { count: answeredCount, total: totalQ })}</span>
            </div>
            <div className="h-2 rounded-full bg-[#e4eef9] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00b4d8] to-[#22d3ee]"
                style={{width:`${progressPct}%`, transition:"width 0.4s cubic-bezier(0.16,1,0.3,1)"}}
              />
            </div>
            {/* Step dots */}
            <div className="flex gap-1.5 mt-3">
              {quiz.questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrent(i)}
                  className={[
                    "flex-1 h-1.5 rounded-full transition-colors duration-150",
                    i === current ? "bg-[#00b4d8]" : answers[q.id] ? "bg-[#10b981]" : "bg-[#c8dff0]",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Question card */}
          <div className="card-surface p-7 mb-5">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-7 h-7 rounded-lg bg-[rgba(0,180,216,0.10)] border border-[rgba(0,180,216,0.20)] flex items-center justify-center shrink-0 text-[#00b4d8] text-xs font-bold">
                {current + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="electric">{tTypes(question.type)}</Badge>
                  <span className="text-xs text-[#8fa5bf]">{t("pts", { count: question.points })}</span>
                </div>
                <p className="text-sm font-semibold text-[#0d1b35] leading-relaxed">{localize(question.prompt, locale)}</p>
              </div>
            </div>

            {question.type === "output-prediction" ? (
              <OutputPrediction question={question} selected={answers[question.id]} onSelect={handleAnswer} locale={locale} promptLabel={t("whatIsOutput")} />
            ) : (
              <MultipleChoice question={question} selected={answers[question.id]} onSelect={handleAnswer} locale={locale} />
            )}
          </div>

          {error && (
            <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handlePrev} disabled={current === 0}>
              {t("previous")}
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
              loading={submitting}
              disabled={!answers[question.id] || submitting}
            >
              {current === totalQ - 1 ? t("submitQuiz") : t("next")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
