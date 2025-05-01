import { RecruitmentForm } from "@/components/features/recruitment"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "応募者情報登録フォーム",
  description: "採用応募者の情報を登録するためのフォームです",
}

export default function RecruitmentFormPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          採用管理システム - 応募者情報登録
        </h1>
        <RecruitmentForm />
      </div>
    </main>
  )
} 