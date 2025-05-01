"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UploadCloud, X, FileText, Link as LinkIcon } from "lucide-react"

export function DocumentsStep() {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  // ファイルアップロード処理
  const handleFileUpload = (field: string, file: File | null) => {
    setValue(field, file)
  }

  // ファイル削除処理
  const handleFileRemove = (field: string) => {
    setValue(field, null)
  }

  // ファイルドロップの処理
  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>, field: string) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      handleFileUpload(field, file)
    }
  }

  // ドラッグオーバーの処理
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  // カスタムファイルアップロードコンポーネント
  const FileUpload = ({ field, label, accept, value }: { field: string; label: string; accept: string; value: any }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center">
          <FormLabel className="text-base">{label}</FormLabel>
        </div>

        {!value ? (
          <div
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            onDrop={(e) => handleFileDrop(e, field)}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById(`file-${field}`)?.click()}
          >
            <UploadCloud className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              ファイルをドラッグ＆ドロップするか、クリックしてアップロード
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX (最大5MB)</p>
            <input
              id={`file-${field}`}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                handleFileUpload(field, file)
              }}
            />
          </div>
        ) : (
          <div className="border rounded-lg p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{value.name}</span>
              <span className="text-xs text-gray-500">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleFileRemove(field)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">添付書類</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          以下の書類をアップロードしてください。PDF、Word文書(.doc, .docx)が推奨されます。
        </p>
      </div>

      <div className="space-y-8">
        <FormField
          control={control}
          name="documents.resume"
          render={({ field }) => (
            <FormItem>
              <FileUpload field="documents.resume" label="履歴書" accept=".pdf,.doc,.docx" value={field.value} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documents.careerHistory"
          render={({ field }) => (
            <FormItem>
              <FileUpload
                field="documents.careerHistory"
                label="職務経歴書"
                accept=".pdf,.doc,.docx"
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documents.portfolio"
          render={({ field }) => (
            <FormItem>
              <FileUpload
                field="documents.portfolio"
                label="ポートフォリオ（任意）"
                accept=".pdf,.doc,.docx"
                value={field.value}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <FormField
            control={control}
            name="documents.portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  ポートフォリオURL（任意）
                </FormLabel>
                <div className="flex items-center">
                  <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <FormControl>
                    <Input
                      placeholder="https://example.com/portfolio"
                      className="flex-1"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
} 