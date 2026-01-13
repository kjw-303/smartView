import SeminarDetailPageClient from "@/components/seminars/SeminarDetailPageClient";

export default async function SeminarDetailPage({
  params,
}: {
  params: Promise<{ seminarId: string }>;
}) {
  const { seminarId } = await params; // ✅ 핵심: params를 await로 풀기
  return <SeminarDetailPageClient seminarId={seminarId} />;
}
