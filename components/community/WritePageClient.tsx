"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

const TAGS = ["일반", "고민/질문", "맛집", "취미", "친구만들기"];

export default function WritePageClient() {
  const router = useRouter();

  const [board, setBoard] = React.useState("게시판");
  const [tag, setTag] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [files, setFiles] = React.useState<FileList | null>(null);

  const maxLen = 400;

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && tag.trim().length > 0;

  const onSubmit = () => {
    // TODO: API 연결
    // 임시: 등록 후 뒤로
    router.back();
  };

  return (
    <div className="min-h-dvh bg-white">
      {/* 폼 */}
      <div className="px-4 py-4 pb-24">
        {/* 게시판 */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-neutral-500">게시판</div>
          <select
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900"
          >
            <option value="게시판">등록톡</option>
            <option value="자유게시판">자유게시판</option>
          </select>
        </div>

        {/* 태그 */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-neutral-500">태그</div>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900"
          >
            <option value="">선택</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 */}
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold text-neutral-500">제목</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        {/* 내용 */}
        <div className="mb-3">
          <div className="mb-2 text-xs font-semibold text-neutral-500">내용</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxLen))}
            placeholder={`내용을 입력하세요\n\n어쩌구저쩌구 좀 거시기한 내용은 게시가 제한될 수 있어요.`}
            className="min-h-[180px] w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400"
          />
          <div className="mt-1 text-right text-xs text-neutral-400">
            {content.length} / {maxLen}
          </div>
        </div>

        {/* 이미지 첨부 */}
        <div className="mb-6">
          <div className="mb-2 text-xs font-semibold text-neutral-500">이미지 첨부</div>

          <label className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white text-xl text-neutral-700 active:bg-neutral-100">
            +
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
            />
          </label>

          <div className="mt-2 text-xs text-neutral-400">
            최대 10Mb 크기의 이미지만 첨부가능합니다. (최대 5장)
          </div>

          {files?.length ? (
            <div className="mt-2 text-xs text-neutral-600">
              선택됨: {Array.from(files).map((f) => f.name).join(", ")}
            </div>
          ) : null}
        </div>

        {/* 등록 버튼 */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className={[
            "h-12 w-full rounded-xl text-sm font-semibold",
            canSubmit
              ? "bg-[#1E2348] text-white active:opacity-90"
              : "bg-neutral-200 text-neutral-500",
          ].join(" ")}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
