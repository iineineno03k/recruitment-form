"use client"

import { useFormContext } from "react-hook-form"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

export function ConfirmationStep() {
  const { control, watch } = useFormContext()
  const formData = watch()

  // 日付をフォーマットする関数
  const formatDate = (date: Date | undefined) => {
    if (!date) return "未入力"
    return format(date, "yyyy年MM月dd日", { locale: ja })
  }

  // 月日のみをフォーマットする関数
  const formatMonth = (date: Date | undefined) => {
    if (!date) return "未入力"
    return format(date, "yyyy年MM月", { locale: ja })
  }

  // 配列値を表示用に変換する関数
  const formatArray = (array: any[] | undefined) => {
    if (!array || array.length === 0) return "なし"
    return array.join(", ")
  }

  // オブジェクト配列を表示用に変換する関数
  const formatObjectArray = (array: any[] | undefined, key: string) => {
    if (!array || array.length === 0) return "なし"
    return array.map((item) => item[key]).filter(Boolean).join(", ") || "なし"
  }

  // 言語スキルを表示用に変換する関数
  const formatLanguageSkills = (languages: any[] | undefined) => {
    if (!languages || languages.length === 0) return "なし"
    return languages
      .map((lang) => {
        if (lang.language && lang.level) {
          return `${lang.language} (${lang.level})`
        } else if (lang.language) {
          return lang.language
        }
        return null
      })
      .filter(Boolean)
      .join(", ") || "なし"
  }

  // プログラミング言語のスキルを表示用に変換する関数
  const formatProgrammingSkills = (languages: any[] | undefined) => {
    if (!languages || languages.length === 0) return "なし"

    return languages
      .map((lang) => {
        if (!lang.name) return null

        const frameworks = lang.frameworks && lang.frameworks.length > 0 ? ` (フレームワーク: ${lang.frameworks.join(", ")})` : ""
        const years = lang.yearsOfExperience ? ` - ${lang.yearsOfExperience}` : ""

        return `${lang.name}${years}${frameworks}`
      })
      .filter(Boolean)
      .join("\n")
  }

  // ファイル名を表示用に変換する関数
  const formatFileName = (file: any) => {
    if (!file) return "未アップロード"
    return file.name
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">入力内容の確認</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          以下の入力内容を確認し、問題がなければ同意のチェックボックスを選択して送信してください。
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">基本情報</h3>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">氏名（漢字）</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formData.basicInfo?.fullNameKanji || "未入力"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">氏名（かな）</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formData.basicInfo?.fullNameKana || "未入力"}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">生年月日</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formatDate(formData.basicInfo?.birthDate)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">応募区分</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formData.basicInfo?.applicationType || "未入力"}</p>
            </div>
          </div>

          {/* 応募区分に応じた追加情報 */}
          {formData.basicInfo?.applicationType === "新卒採用" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">大学情報</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">大学名</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.universityInfo?.universityName || "未入力"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">学部</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.universityInfo?.faculty || "未入力"}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">卒業年月</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatMonth(formData.universityInfo?.graduationDate)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">研究内容</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.universityInfo?.researchDetails || "なし"}</p>
                </div>
              </div>
            </div>
          )}

          {formData.basicInfo?.applicationType === "中途採用" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">職歴情報</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">退職理由</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatArray(formData.careerInfo?.resignationReasons)}</p>
                </div>
                {formData.careerInfo?.resignationReasons?.includes("その他") && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">その他の退職理由</h5>
                    <p className="text-sm text-gray-900 dark:text-white">{formData.careerInfo?.otherReasonDetails || "未入力"}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.basicInfo?.applicationType === "インターン" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">インターン情報</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">希望開始日</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatDate(formData.internshipInfo?.startDate)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">希望終了日</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatDate(formData.internshipInfo?.endDate)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">希望日数</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.internshipInfo?.daysPerWeek || "未入力"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">スキル情報</h3>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">IT経験の有無</h4>
            <p className="text-sm text-gray-900 dark:text-white">{formData.skillsInfo?.hasITExperience || "未入力"}</p>
          </div>

          {formData.skillsInfo?.hasITExperience === "あり" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">プログラミングスキル</h4>
              <div>
                <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">言語・フレームワーク</h5>
                <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                  {formatProgrammingSkills(formData.programmingSkills?.languages)}
                </pre>
              </div>
            </div>
          )}

          {formData.skillsInfo?.hasITExperience === "なし" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">ビジネススキル</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">持っているスキル</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatArray(formData.businessSkills?.skills)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">言語スキル</h5>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formatLanguageSkills(formData.businessSkills?.languages)}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">保有資格</h5>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formatObjectArray(formData.businessSkills?.certifications, "name")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">希望条件</h3>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">希望職種</h4>
            <p className="text-sm text-gray-900 dark:text-white">{formData.preferences?.jobType || "未入力"}</p>
          </div>

          {formData.preferences?.jobType === "エンジニア" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">エンジニア希望詳細</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">希望する開発環境・文化</h5>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formatArray(formData.engineerPreferences?.workEnvironment)}
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">リモートワーク環境</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.engineerPreferences?.remoteSetup || "未入力"}</p>
                </div>
              </div>
            </div>
          )}

          {formData.preferences?.jobType === "マーケティング" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">マーケティング希望詳細</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">使用経験のあるツール</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatArray(formData.marketingPreferences?.tools)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">予算管理の経験</h5>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {formData.marketingPreferences?.hasBudgetExperience || "未入力"}
                  </p>
                </div>
                {formData.marketingPreferences?.hasBudgetExperience === "あり" && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">予算規模</h5>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formData.marketingPreferences?.budgetExperienceLevel || "未入力"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.preferences?.jobType === "営業" && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">営業希望詳細</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">営業経験の種類</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formatArray(formData.salesPreferences?.experienceType)}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400">営業スタイル</h5>
                  <p className="text-sm text-gray-900 dark:text-white">{formData.salesPreferences?.salesStyle || "未入力"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">添付書類</h3>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">履歴書</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formatFileName(formData.documents?.resume)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">職務経歴書</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formatFileName(formData.documents?.careerHistory)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ポートフォリオ</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formatFileName(formData.documents?.portfolio)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">ポートフォリオURL</h4>
              <p className="text-sm text-gray-900 dark:text-white">{formData.documents?.portfolioUrl || "なし"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <FormField
          control={control}
          name="agreement.privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  プライバシーポリシーに同意します<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  個人情報の取り扱いについて、プライバシーポリシーを読み、同意します。
                </p>
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
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  入力内容を確認しました<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  上記の入力内容を確認し、正確であることを認めます。
                </p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
} 