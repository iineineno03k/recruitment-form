"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// マーケティングツールのリスト
const MARKETING_TOOLS = [
  "Google Analytics",
  "Google Ads",
  "Facebook広告",
  "Instagram広告",
  "Twitter広告",
  "SEO対策ツール",
  "CMS",
  "メールマーケティングツール",
  "CRM",
  "コンテンツ制作ツール",
]

// 営業スタイルのリスト
const SALES_STYLES = ["新規開拓営業", "ルート営業", "インサイドセールス", "フィールドセールス", "ソリューション営業"]

export function PreferencesStep() {
  const { control, watch } = useFormContext()
  const jobType = watch("preferences.jobType")
  const workEnvironment = watch("engineerPreferences.workEnvironment") || []
  const hasBudgetExperience = watch("marketingPreferences.hasBudgetExperience")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">希望条件</h2>

        <FormField
          control={control}
          name="preferences.jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                希望職種<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="職種を選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="エンジニア">エンジニア</SelectItem>
                  <SelectItem value="マーケティング">マーケティング</SelectItem>
                  <SelectItem value="営業">営業</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* エンジニア選択時の追加フォーム */}
      {jobType === "エンジニア" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">開発環境</h3>

          <FormField
            control={control}
            name="engineerPreferences.workEnvironment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開発環境希望（複数選択可）</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                  {[
                    { id: "onsite", label: "オンサイト" },
                    { id: "remote", label: "リモート" },
                    { id: "hybrid", label: "ハイブリッド" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={field.value?.includes(item.label)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), item.label]
                            : (field.value || []).filter((value) => value !== item.label)
                          field.onChange(updatedValue)
                        }}
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {workEnvironment.includes("リモート") && (
            <FormField
              control={control}
              name="engineerPreferences.remoteSetup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>リモート環境について</FormLabel>
                  <FormControl>
                    <Input placeholder="リモート作業環境について記入してください" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      {/* マーケティング選択時の追加フォーム */}
      {jobType === "マーケティング" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">マーケティングツール</h3>

          <FormField
            control={control}
            name="marketingPreferences.tools"
            render={({ field }) => (
              <FormItem>
                <FormLabel>使用経験ツール（複数選択可）</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {MARKETING_TOOLS.map((tool) => (
                    <Badge
                      key={tool}
                      variant={field.value?.includes(tool) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        field.value?.includes(tool) ? "bg-[#4A6CF7]" : "bg-transparent text-gray-700 dark:text-gray-300"
                      }`}
                      onClick={() => {
                        const updatedValue = field.value?.includes(tool)
                          ? field.value.filter((t) => t !== tool)
                          : [...(field.value || []), tool]
                        field.onChange(updatedValue)
                      }}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="marketingPreferences.hasBudgetExperience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>広告予算管理経験</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="あり" id="budget-yes" />
                      <Label htmlFor="budget-yes">あり</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="なし" id="budget-no" />
                      <Label htmlFor="budget-no">なし</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {hasBudgetExperience === "あり" && (
            <FormField
              control={control}
              name="marketingPreferences.budgetExperienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>経験レベル</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="経験レベルを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="初級">初級（〜100万円）</SelectItem>
                      <SelectItem value="中級">中級（〜500万円）</SelectItem>
                      <SelectItem value="上級">上級（〜1000万円）</SelectItem>
                      <SelectItem value="エキスパート">エキスパート（1000万円〜）</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      {/* 営業選択時の追加フォーム */}
      {jobType === "営業" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">営業経験</h3>

          <FormField
            control={control}
            name="salesPreferences.experienceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>B2B/B2C経験（複数選択可）</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    { id: "b2b", label: "B2B（企業向け）" },
                    { id: "b2c", label: "B2C（個人向け）" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={field.value?.includes(item.label)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), item.label]
                            : (field.value || []).filter((value) => value !== item.label)
                          field.onChange(updatedValue)
                        }}
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="salesPreferences.salesStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>営業スタイル</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="営業スタイルを選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SALES_STYLES.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}
