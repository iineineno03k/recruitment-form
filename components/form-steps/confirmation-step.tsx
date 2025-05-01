"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

export function ConfirmationStep() {
  const { control, watch } = useFormContext()
  const formData = watch()

  // PDFを生成する関数
  const generatePDF = () => {
    try {
      const doc = new jsPDF()

      // タイトル
      doc.setFontSize(16)
      doc.text("応募情報確認", 105, 15, { align: "center" })

      // 基本情報
      doc.setFontSize(14)
      doc.text("基本情報", 14, 25)

      const basicInfoData = [
        ["氏名（漢字）", formData.basicInfo.fullNameKanji || ""],
        ["氏名（かな）", formData.basicInfo.fullNameKana || ""],
        [
          "生年月日",
          formData.basicInfo.birthDate
            ? format(new Date(formData.basicInfo.birthDate), "yyyy年MM月dd日", { locale: ja })
            : "",
        ],
        ["応募区分", formData.basicInfo.applicationType || ""],
      ]

      // @ts-ignore
      doc.autoTable({
        startY: 30,
        head: [["項目", "内容"]],
        body: basicInfoData,
        theme: "grid",
        headStyles: { fillColor: [74, 108, 247] },
      })

      // 応募区分に応じた追加情報
      let currentY = doc.lastAutoTable.finalY + 10

      if (formData.basicInfo.applicationType === "新卒採用" && formData.universityInfo) {
        doc.setFontSize(14)
        doc.text("大学情報", 14, currentY)

        const universityData = [
          ["大学名", formData.universityInfo.universityName || ""],
          ["学部", formData.universityInfo.faculty || ""],
          [
            "卒業年月",
            formData.universityInfo.graduationDate
              ? format(new Date(formData.universityInfo.graduationDate), "yyyy年MM月", { locale: ja })
              : "",
          ],
          ["研究内容", formData.universityInfo.researchDetails || ""],
        ]

        // @ts-ignore
        doc.autoTable({
          startY: currentY + 5,
          head: [["項目", "内容"]],
          body: universityData,
          theme: "grid",
          headStyles: { fillColor: [74, 108, 247] },
        })

        currentY = doc.lastAutoTable.finalY + 10
      }

      // スキル情報
      doc.setFontSize(14)
      doc.text("スキル情報", 14, currentY)

      const skillsData = [["IT経験", formData.skillsInfo.hasITExperience || ""]]

      // @ts-ignore
      doc.autoTable({
        startY: currentY + 5,
        head: [["項目", "内容"]],
        body: skillsData,
        theme: "grid",
        headStyles: { fillColor: [74, 108, 247] },
      })

      currentY = doc.lastAutoTable.finalY + 10

      // 希望条件
      doc.setFontSize(14)
      doc.text("希望条件", 14, currentY)

      const preferencesData = [["希望職種", formData.preferences.jobType || ""]]

      // @ts-ignore
      doc.autoTable({
        startY: currentY + 5,
        head: [["項目", "内容"]],
        body: preferencesData,
        theme: "grid",
        headStyles: { fillColor: [74, 108, 247] },
      })

      // PDFを保存
      doc.save("応募情報.pdf")
    } catch (error) {
      console.error("PDF生成エラー:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">確認・提出</h2>
          <Button type="button" variant="outline" size="sm" onClick={generatePDF} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            PDF出力
          </Button>
        </div>

        <div className="space-y-6 mt-4">
          {/* 基本情報の確認 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">基本情報</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">氏名（漢字）</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formData.basicInfo.fullNameKanji || "-"}
                </dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">氏名（かな）</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formData.basicInfo.fullNameKana || "-"}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">生年月日</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formData.basicInfo.birthDate
                    ? format(new Date(formData.basicInfo.birthDate), "yyyy年MM月dd日", { locale: ja })
                    : "-"}
                </dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">応募区分</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formData.basicInfo.applicationType || "-"}
                </dd>
              </div>
            </dl>
          </div>

          {/* 応募区分に応じた追加情報 */}
          {formData.basicInfo.applicationType === "新卒採用" && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">大学情報</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">大学名</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.universityInfo?.universityName || "-"}
                  </dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">学部</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.universityInfo?.faculty || "-"}
                  </dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">卒業年月</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.universityInfo?.graduationDate
                      ? format(new Date(formData.universityInfo.graduationDate), "yyyy年MM月", { locale: ja })
                      : "-"}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">研究内容</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.universityInfo?.researchDetails || "-"}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {formData.basicInfo.applicationType === "中途採用" && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">退職理由</h3>
              <dl className="grid grid-cols-1 gap-y-2">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">退職理由</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.careerInfo?.resignationReasons?.length
                      ? formData.careerInfo.resignationReasons.join(", ")
                      : "-"}
                  </dd>
                </div>
                {formData.careerInfo?.resignationReasons?.includes("その他") && (
                  <div className="col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">その他の理由</dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formData.careerInfo?.otherReasonDetails || "-"}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {formData.basicInfo.applicationType === "インターン" && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">希望期間</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">開始日</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.internshipInfo?.startDate
                      ? format(new Date(formData.internshipInfo.startDate), "yyyy年MM月dd日", { locale: ja })
                      : "-"}
                  </dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">終了日</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.internshipInfo?.endDate
                      ? format(new Date(formData.internshipInfo.endDate), "yyyy年MM月dd日", { locale: ja })
                      : "-"}
                  </dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">週間の希望日数</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                    {formData.internshipInfo?.daysPerWeek ? `${formData.internshipInfo.daysPerWeek}日` : "-"}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {/* スキル情報の確認 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">スキル情報</h3>
            <dl className="grid grid-cols-1 gap-y-2">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">IT経験</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                  {formData.skillsInfo?.hasITExperience || "-"}
                </dd>
              </div>
            </dl>
          </div>

          {/* 希望条件の確認 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">希望条件</h3>
            <dl className="grid grid-cols-1 gap-y-2">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">希望職種</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{formData.preferences?.jobType || "-"}</dd>
              </div>
            </dl>
          </div>

          {/* 添付書類の確認 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">添付書類</h3>
            <dl className="grid grid-cols-1 gap-y-2">
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">履歴書</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                  {formData.documents?.resume ? (
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 text-[#4A6CF7] mr-1" />
                      {formData.documents.resume.name}
                    </span>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>

              {formData.basicInfo.applicationType === "中途採用" && (
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">職務経歴書</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                    {formData.documents?.careerHistory ? (
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 text-[#4A6CF7] mr-1" />
                        {formData.documents.careerHistory.name}
                      </span>
                    ) : (
                      "-"
                    )}
                  </dd>
                </div>
              )}

              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ポートフォリオ</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white flex items-center">
                  {formData.documents?.portfolio ? (
                    <span className="flex items-center">
                      <FileText className="h-4 w-4 text-[#4A6CF7] mr-1" />
                      {formData.documents.portfolio.name}
                    </span>
                  ) : formData.documents?.portfolioUrl ? (
                    <a
                      href={formData.documents.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A6CF7] hover:underline"
                    >
                      {formData.documents.portfolioUrl}
                    </a>
                  ) : (
                    "-"
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 同意事項 */}
        <div className="space-y-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <FormField
            control={control}
            name="agreement.privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    プライバシーポリシーに同意します<span className="text-[#F64E60] ml-1">*</span>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="agreement.confirmation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    入力内容に間違いがないことを確認しました<span className="text-[#F64E60] ml-1">*</span>
                  </FormLabel>
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
