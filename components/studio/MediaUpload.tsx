"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { uploadMedia } from "@/lib/admin/actions";
import type { UploadBucket } from "@/lib/validation/content";

export function MediaUpload({
  label,
  bucket,
  accept,
  value,
  onChange,
}: {
  label: string;
  bucket: UploadBucket;
  accept: string;
  value: string | null | undefined;
  onChange: (path: string | null) => void;
}) {
  const t = useTranslations("Studio");
  const tErr = useTranslations("AuthErrors");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("bucket", bucket);
    const res = await uploadMedia(fd);
    setUploading(false);
    if (!res.ok) {
      setError(tErr(res.error));
      return;
    }
    onChange(res.path);
  };

  const fileName = value ? value.split("/").pop() : null;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#0d1b35]">{label}</label>
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#c8dff0] bg-white text-sm text-[#0882a0] font-medium cursor-pointer hover:border-[#00b4d8] hover:bg-[#f8faff] transition-colors focus-within:ring-2 focus-within:ring-[#22d3ee]">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          {uploading ? t("uploading") : t("chooseFile")}
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
        {fileName && (
          <span className="text-xs text-[#4a6080] truncate max-w-[200px]">{fileName}</span>
        )}
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-red-500 hover:text-red-600"
          >
            {t("remove")}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
