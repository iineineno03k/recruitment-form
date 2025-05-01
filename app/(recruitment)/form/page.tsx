import { RecruitmentForm } from "@/components/features/recruitment"
import { PageContainer } from "@/components/layouts"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "応募者情報登録フォーム",
  description: "採用応募者の情報を登録するためのフォームです",
}

export default function RecruitmentFormPage() {
  return (
    <PageContainer
      title="採用管理システム - 応募者情報登録"
    >
      <RecruitmentForm />
    </PageContainer>
  )
} 