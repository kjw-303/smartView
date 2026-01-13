import NoticeDetailPageClient from "@/components/notices/NoticeDetailPageClient";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}) {
  const { noticeId } = await params;
  return <NoticeDetailPageClient noticeId={noticeId} />;
}
