import { RecruitmentForm } from "@/components/recruitment-form"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="recruitment-theme">
      <main className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            採用管理システム - 応募者情報登録
          </h1>
          <RecruitmentForm />
        </div>
      </main>
    </ThemeProvider>
  )
}
