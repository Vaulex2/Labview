"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LocalizedField, emptyLocalized } from "@/components/studio/LocalizedField";
import { MediaUpload } from "@/components/studio/MediaUpload";
import { saveLesson, deleteLesson } from "@/lib/admin/actions";
import type { LessonInput } from "@/lib/validation/content";
import type { LocalizedText } from "@/lib/types";

const CATEGORIES = [
  "loops", "arrays", "clusters", "arithmetic", "boolean", "events",
  "waveforms", "subvi", "structures", "data-types", "debugging",
] as const;
const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

type SummaryState = { id?: string; sectionTitle: LocalizedText; paragraphs: LocalizedText[]; order: number };
type VizState = { id?: string; title: LocalizedText; description: LocalizedText; complexity: "simple" | "advanced"; diagramId: string; order: number };

const selectCls =
  "w-full rounded-lg border border-[#c8dff0] bg-white text-[#0d1b35] text-sm px-3 py-2 outline-none focus:border-[#00b4d8] focus:ring-2 focus:ring-[rgba(0,180,216,0.18)] transition-[border-color,box-shadow] duration-150";
const cardCls = "bg-white border border-[#deedf7] rounded-xl p-5 shadow-[0_2px_8px_rgba(13,27,53,0.06)]";
const sectionTitleCls = "text-sm font-bold text-[#0d1b35]";

export function LessonEditor({
  initial,
  diagramIds,
}: {
  initial: LessonInput;
  diagramIds: string[];
}) {
  const t = useTranslations("Studio");
  const tErr = useTranslations("AuthErrors");
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<LocalizedText>(initial.title as LocalizedText);
  const [slug, setSlug] = useState(initial.slug);
  const [category, setCategory] = useState<string>(initial.category);
  const [difficulty, setDifficulty] = useState<string>(initial.difficulty);
  const [durationMinutes, setDurationMinutes] = useState(initial.durationMinutes ?? 0);
  const [orderIndex, setOrderIndex] = useState(initial.orderIndex ?? 0);
  const [isPublished, setIsPublished] = useState(initial.isPublished ?? false);
  const [thumbnailPath, setThumbnailPath] = useState<string | null>(initial.thumbnailPath ?? null);
  const [videoPath, setVideoPath] = useState<string | null>(initial.videoPath ?? null);
  const [presentationUrl, setPresentationUrl] = useState(initial.presentationUrl ?? "");
  const [tags, setTags] = useState<LocalizedText[]>((initial.tags as LocalizedText[]) ?? []);
  const [summaries, setSummaries] = useState<SummaryState[]>(
    (initial.summaries as SummaryState[]) ?? []
  );
  const [viz, setViz] = useState<VizState[]>((initial.vizExamples as VizState[]) ?? []);

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    const res = await saveLesson({
      id: initial.id,
      title,
      slug,
      category: category as LessonInput["category"],
      difficulty: difficulty as LessonInput["difficulty"],
      durationMinutes: Number(durationMinutes) || 0,
      orderIndex: Number(orderIndex) || 0,
      isPublished,
      thumbnailPath,
      videoPath,
      presentationUrl: presentationUrl || null,
      tags,
      summaries: summaries.map((s, i) => ({ ...s, order: i })),
      vizExamples: viz.map((v, i) => ({ ...v, order: i })),
    });
    setSaving(false);
    if (!res.ok) {
      setError(tErr(res.error) ?? res.error);
      return;
    }
    router.push("/admin/lessons");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!initial.id) return;
    setDeleting(true);
    const res = await deleteLesson(initial.id);
    setDeleting(false);
    if (!res.ok) {
      setError(tErr(res.error) ?? res.error);
      return;
    }
    router.push("/admin/lessons");
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {error && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Basics */}
      <div className={cardCls + " space-y-4"}>
        <h2 className={sectionTitleCls}>{t("lessonBasics")}</h2>
        <LocalizedField label={t("fieldTitle")} value={title} onChange={setTitle} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label={t("fieldSlug")} value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="intro-to-labview" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0d1b35]">{t("fieldCategory")}</label>
            <select className={selectCls} value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#0d1b35]">{t("fieldDifficulty")}</label>
            <select className={selectCls} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <Input label={t("fieldDuration")} type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} />
          <Input label={t("fieldOrder")} type="number" value={orderIndex} onChange={(e) => setOrderIndex(Number(e.target.value))} />
          <Input label={t("fieldPresentation")} value={presentationUrl} onChange={(e) => setPresentationUrl(e.target.value)} placeholder="/slides/lesson.pdf" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-[#c8dff0] accent-[#00b4d8]" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
          <span className="text-sm text-[#4a6080]">{t("fieldPublished")}</span>
        </label>
      </div>

      {/* Media */}
      <div className={cardCls + " space-y-4"}>
        <h2 className={sectionTitleCls}>{t("media")}</h2>
        <MediaUpload label={t("thumbnail")} bucket="thumbnails" accept="image/png,image/jpeg,image/webp" value={thumbnailPath} onChange={setThumbnailPath} />
        <MediaUpload label={t("video")} bucket="lesson-videos" accept="video/mp4,video/webm,video/quicktime" value={videoPath} onChange={setVideoPath} />
      </div>

      {/* Tags */}
      <div className={cardCls + " space-y-3"}>
        <div className="flex items-center justify-between">
          <h2 className={sectionTitleCls}>{t("tags")}</h2>
          <Button variant="outline" size="sm" onClick={() => setTags([...tags, emptyLocalized()])}>{t("addTag")}</Button>
        </div>
        {tags.map((tag, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1"><LocalizedField value={tag} onChange={(v) => setTags(tags.map((x, j) => (j === i ? v : x)))} placeholder={t("tagPlaceholder")} /></div>
            <button type="button" onClick={() => setTags(tags.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600 pb-2">{t("remove")}</button>
          </div>
        ))}
      </div>

      {/* Summaries */}
      <div className={cardCls + " space-y-4"}>
        <div className="flex items-center justify-between">
          <h2 className={sectionTitleCls}>{t("summaries")}</h2>
          <Button variant="outline" size="sm" onClick={() => setSummaries([...summaries, { sectionTitle: emptyLocalized(), paragraphs: [emptyLocalized()], order: summaries.length }])}>{t("addSummary")}</Button>
        </div>
        {summaries.map((s, i) => (
          <div key={i} className="rounded-lg border border-[#e4eef9] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8fa5bf]">#{i + 1}</span>
              <button type="button" onClick={() => setSummaries(summaries.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600">{t("remove")}</button>
            </div>
            <LocalizedField label={t("sectionTitle")} value={s.sectionTitle} onChange={(v) => setSummaries(summaries.map((x, j) => (j === i ? { ...x, sectionTitle: v } : x)))} required />
            {s.paragraphs.map((p, pi) => (
              <div key={pi} className="flex items-end gap-2">
                <div className="flex-1"><LocalizedField label={pi === 0 ? t("paragraphs") : undefined} value={p} onChange={(v) => setSummaries(summaries.map((x, j) => (j === i ? { ...x, paragraphs: x.paragraphs.map((y, k) => (k === pi ? v : y)) } : x)))} multiline /></div>
                <button type="button" onClick={() => setSummaries(summaries.map((x, j) => (j === i ? { ...x, paragraphs: x.paragraphs.filter((_, k) => k !== pi) } : x)))} className="text-xs text-red-500 hover:text-red-600 pb-2">{t("remove")}</button>
              </div>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setSummaries(summaries.map((x, j) => (j === i ? { ...x, paragraphs: [...x.paragraphs, emptyLocalized()] } : x)))}>{t("addParagraph")}</Button>
          </div>
        ))}
      </div>

      {/* Visualization examples */}
      <div className={cardCls + " space-y-4"}>
        <div className="flex items-center justify-between">
          <h2 className={sectionTitleCls}>{t("vizExamples")}</h2>
          <Button variant="outline" size="sm" onClick={() => setViz([...viz, { title: emptyLocalized(), description: emptyLocalized(), complexity: "simple", diagramId: diagramIds[0] ?? "", order: viz.length }])}>{t("addViz")}</Button>
        </div>
        {viz.map((v, i) => (
          <div key={i} className="rounded-lg border border-[#e4eef9] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#8fa5bf]">#{i + 1}</span>
              <button type="button" onClick={() => setViz(viz.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-600">{t("remove")}</button>
            </div>
            <LocalizedField label={t("fieldTitle")} value={v.title} onChange={(val) => setViz(viz.map((x, j) => (j === i ? { ...x, title: val } : x)))} required />
            <LocalizedField label={t("fieldDescription")} value={v.description} onChange={(val) => setViz(viz.map((x, j) => (j === i ? { ...x, description: val } : x)))} multiline />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0d1b35]">{t("diagram")}</label>
                <select className={selectCls} value={v.diagramId} onChange={(e) => setViz(viz.map((x, j) => (j === i ? { ...x, diagramId: e.target.value } : x)))}>
                  {diagramIds.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0d1b35]">{t("complexity")}</label>
                <select className={selectCls} value={v.complexity} onChange={(e) => setViz(viz.map((x, j) => (j === i ? { ...x, complexity: e.target.value as "simple" | "advanced" } : x)))}>
                  <option value="simple">simple</option>
                  <option value="advanced">advanced</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {initial.id ? (
          <Button variant="ghost" size="sm" onClick={handleDelete} loading={deleting} className="text-red-500">{t("deleteLesson")}</Button>
        ) : <span />}
        <Button variant="primary" onClick={handleSave} loading={saving}>{t("save")}</Button>
      </div>
    </div>
  );
}
