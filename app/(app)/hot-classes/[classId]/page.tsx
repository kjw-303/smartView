import HotClassDetailPageClient from "@/components/hot-classes/HotClassDetailPageClient";

export default async function HotClassDetailPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params; // ✅ 핵심: params를 await로 풀기
  return <HotClassDetailPageClient classId={classId} />;
}
