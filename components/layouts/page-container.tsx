import { ReactNode } from "react"

interface PageContainerProps {
  children: ReactNode
  title?: string
  description?: string
}

export function PageContainer({ 
  children, 
  title, 
  description 
}: PageContainerProps) {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {title && (
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            {title}
          </h1>
        )}
        {description && (
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
            {description}
          </p>
        )}
        {children}
      </div>
    </main>
  )
} 