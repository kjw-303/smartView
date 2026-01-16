"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/auth/Toast";

const CATEGORIES = ["기타", "수강/상담", "취업/입시", "휴학/환불"];

type PickedImage = {
  id: string;
  url: string;
  file: File;
};

export default function MentorInquiryPageClient() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState("포토샵 버전이 낮아서 예제가 안열려요!!");
  const [content, setContent] = useState(
    "포토샵 버전이 낮아서 예제가 안열려요ㅠㅠ\n낮은 버전 알려주시면 안될까요.\n저는 CS6버전입니다"
  );

  const [images, setImages] = useState<PickedImage[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const titleMax = 60;
  const contentMax = 400;
  const canSubmit = useMemo(() => {
    return title.trim().length >= 2 && content.trim().length >= 5 && !submitting;
  }, [title, content, submitting]);

  const openPicker = () => {
    if (images.length >= 3) {
      setToast("이미지는 최대 3장까지 첨부할 수 있어요.");
      return;
    }
    fileRef.current?.click();
  };

  const onPickFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const picked = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (picked.length === 0) {
      setToast("이미지 파일만 첨부할 수 있어요.");
      return;
    }

    const next: PickedImage[] = [];
    for (const file of picked) {
      if (images.length + next.length >= 3) break;

      // 10MB 제한(스샷 느낌 반영)
      if (file.size > 10 * 1024 * 1024) {
        setToast("10MB 이하의 이미지만 첨부할 수 있어요.");
        continue;
      }

      next.push({
        id: `${file.name}-${file.size}-${Date.now()}`,
        url: URL.createObjectURL(file),
        file,
      });
    }

    setImages((prev) => [...prev, ...next]);

    // 같은 파일 다시 선택 가능하도록 초기화
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((x) => x.id !== id));
  };

  const onSubmit = async () => {
    if (!canSubmit) {
      setToast("제목과 내용을 확인해주세요.");
      return;
    }

    setSubmitting(true);
    try {
      // 포트폴리오용: 제출 시뮬레이션
      await new Promise((r) => setTimeout(r, 500));
      setToast("문의가 접수되었습니다. (데모)");

      setTimeout(() => router.back(), 600);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-5 pt-4">
      <h1 className="text-sm font-semibold text-neutral-900">멘토문의</h1>

      {/* 멘토 프로필 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-neutral-200" />
        <div>
          <div className="text-sm font-semibold text-neutral-900">임소영 멘토</div>
          <div className="text-xs text-neutral-500">SBS컴퓨터아트학원 강남지점</div>
        </div>
      </div>

      {/* 안내 문구 */}
      <div className="mt-4 text-xs leading-5 text-neutral-600">
        문의하실 내용을 작성해 주세요.<br />
        답변 완료되면 작성하신 제목을 기준으로<br />
        알림을 드립니다.
      </div>

      {/* 폼 */}
      <div className="mt-6 space-y-4">
        {/* 분류 */}
        <div>
          <label className="text-xs text-neutral-600">분류</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 */}
        <div>
          <label className="text-xs text-neutral-600">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, titleMax))}
            placeholder="제목을 입력해주세요"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-400"
          />
          <div className="mt-1 text-right text-[11px] text-neutral-400">
            {title.trim().length}/{titleMax}
          </div>
        </div>

        {/* 내용 */}
        <div>
          <label className="text-xs text-neutral-600">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, contentMax))}
            placeholder="내용을 입력해주세요"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-white p-3 text-sm outline-none focus:border-neutral-400"
            rows={6}
          />
          <div className="mt-1 text-right text-[11px] text-neutral-400">
            {content.trim().length}/{contentMax}
          </div>
        </div>

        {/* 이미지 첨부 */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-neutral-600">이미지 첨부</label>
            <div className="text-[11px] text-neutral-400">{images.length}/3</div>
          </div>

          <div className="mt-2 flex gap-2">
            {/* 추가 버튼 */}
            <button
              type="button"
              onClick={openPicker}
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-neutral-200 bg-white"
              aria-label="이미지 추가"
            >
              <span className="text-xl text-neutral-400">+</span>
            </button>

            {/* 미리보기 */}
            {images.map((img) => (
              <div key={img.id} className="relative h-16 w-16 overflow-hidden rounded-xl bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="첨부 이미지" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[11px] leading-5 text-neutral-400">
            최대 10MB 크기의 이미지 파일만 첨부 가능합니다. (최대 3장)
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => onPickFiles(e.target.files)}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        className={[
          "mt-8 w-full rounded-xl py-3 text-sm font-semibold",
          canSubmit ? "bg-[#1E2348] text-white" : "bg-neutral-200 text-neutral-500",
        ].join(" ")}
      >
        {submitting ? "처리중..." : "문의하기"}
      </button>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
