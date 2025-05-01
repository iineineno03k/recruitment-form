"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from "lucide-react"

export function DocumentsStep() {
  const { control, watch } = useFormContext()
  const applicationType = watch("basicInfo.applicationType")

  // ファイル名を取得する関数
  const getFileName = (file: File | undefined) => {
    if (!file) return ""
    return file.name
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">添付書類</h2>

        <FormField
          control={control}
          name="documents.resume"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>
                履歴書<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const input = document.getElementById("resume-upload")
                        if (input) input.click()
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      ファイルを選択 (PDF, DOCX)
                    </Button>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...field}
                    />
                  </div>

                  {value && (
                    <div className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                      <FileText className="h-4 w-4 text-[#4A6CF7]" />
                      <span className="text-sm flex-1 truncate">{getFileName(value)}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {applicationType === "中途採用" && (
          <FormField
            control={control}
            name="documents.careerHistory"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel>
                  職務経歴書<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const input = document.getElementById("career-upload")
                          if (input) input.click()
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        ファイルを選択 (PDF, DOCX)
                      </Button>
                      <Input
                        id="career-upload"
                        type="file"
                        accept=".pdf,.docx"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            onChange(file)
                          }
                        }}
                        {...field}
                      />
                    </div>

                    {value && (
                      <div className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                        <FileText className="h-4 w-4 text-[#4A6CF7]" />
                        <span className="text-sm flex-1 truncate">{getFileName(value)}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={control}
          name="documents.portfolio"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>ポートフォリオ</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const input = document.getElementById("portfolio-upload")
                        if (input) input.click()
                      }}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      ファイルを選択 (PDF)
                    </Button>
                    <Input
                      id="portfolio-upload"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          onChange(file)
                        }
                      }}
                      {...field}
                    />
                  </div>

                  {value && (
                    <div className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                      <FileText className="h-4 w-4 text-[#4A6CF7]" />
                      <span className="text-sm flex-1 truncate">{getFileName(value)}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => onChange(undefined)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="documents.portfolioUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ポートフォリオURL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
