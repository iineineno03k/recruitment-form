"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PreferencesStep() {
  const { control, watch } = useFormContext()
  const jobType = watch("preferences.jobType")
  const hasBudgetExperience = watch("marketingPreferences.hasBudgetExperience")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">希望条件</h2>

        <FormField
          control={control}
          name="preferences.jobType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                希望職種<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="エンジニア" id="job-engineer" />
                    <Label htmlFor="job-engineer">エンジニア</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="マーケティング" id="job-marketing" />
                    <Label htmlFor="job-marketing">マーケティング</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="営業" id="job-sales" />
                    <Label htmlFor="job-sales">営業</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="その他" id="job-other" />
                    <Label htmlFor="job-other">その他</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* エンジニア希望時の追加フォーム */}
      {jobType === "エンジニア" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">エンジニア希望詳細</h3>

          <FormField
            control={control}
            name="engineerPreferences.workEnvironment"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>希望する開発環境・文化</FormLabel>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    当てはまるものをすべて選択してください
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "アジャイル開発",
                    "ウォーターフォール開発",
                    "コードレビュー文化",
                    "テスト駆動開発",
                    "DevOps文化",
                    "フラットな組織構造",
                    "少人数チーム",
                    "大規模チーム",
                  ].map((env) => (
                    <div key={env} className="flex items-center space-x-2">
                      <Checkbox
                        id={`env-${env}`}
                        checked={field.value?.includes(env)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || []
                          return checked
                            ? field.onChange([...currentValues, env])
                            : field.onChange(currentValues.filter((value) => value !== env))
                        }}
                      />
                      <label
                        htmlFor={`env-${env}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {env}
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
            name="engineerPreferences.remoteSetup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>リモートワーク環境</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="希望するリモートワーク環境を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="フルリモート希望">フルリモート希望</SelectItem>
                    <SelectItem value="ハイブリッド希望">ハイブリッド希望</SelectItem>
                    <SelectItem value="オフィス勤務希望">オフィス勤務希望</SelectItem>
                    <SelectItem value="どちらでも可">どちらでも可</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* マーケティング希望時の追加フォーム */}
      {jobType === "マーケティング" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">マーケティング希望詳細</h3>

          <FormField
            control={control}
            name="marketingPreferences.tools"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>使用経験のあるツール</FormLabel>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    当てはまるものをすべて選択してください
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Google Analytics",
                    "Google Tag Manager",
                    "Google Search Console",
                    "Google Ads",
                    "Facebook Ads",
                    "Twitter Ads",
                    "LinkedIn Ads",
                    "HubSpot",
                    "Salesforce",
                    "Marketo",
                    "Mailchimp",
                    "SEMrush",
                    "Ahrefs",
                    "Adobe Analytics",
                  ].map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tool-${tool}`}
                        checked={field.value?.includes(tool)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || []
                          return checked
                            ? field.onChange([...currentValues, tool])
                            : field.onChange(currentValues.filter((value) => value !== tool))
                        }}
                      />
                      <label
                        htmlFor={`tool-${tool}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tool}
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
            name="marketingPreferences.hasBudgetExperience"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>予算管理の経験</FormLabel>
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
                  <FormLabel>予算規模</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="管理経験のある予算規模を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100万円未満">100万円未満</SelectItem>
                      <SelectItem value="100万円〜500万円">100万円〜500万円</SelectItem>
                      <SelectItem value="500万円〜1000万円">500万円〜1000万円</SelectItem>
                      <SelectItem value="1000万円〜5000万円">1000万円〜5000万円</SelectItem>
                      <SelectItem value="5000万円以上">5000万円以上</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      {/* 営業希望時の追加フォーム */}
      {jobType === "営業" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">営業希望詳細</h3>

          <FormField
            control={control}
            name="salesPreferences.experienceType"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>営業経験の種類</FormLabel>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    当てはまるものをすべて選択してください
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "法人営業",
                    "個人営業",
                    "ルート営業",
                    "新規開拓営業",
                    "インサイドセールス",
                    "フィールドセールス",
                    "海外営業",
                    "IT製品営業",
                    "BtoB営業",
                    "BtoC営業",
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={field.value?.includes(type)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || []
                          return checked
                            ? field.onChange([...currentValues, type])
                            : field.onChange(currentValues.filter((value) => value !== type))
                        }}
                      />
                      <label
                        htmlFor={`type-${type}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
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
                      <SelectValue placeholder="あなたの営業スタイルを選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="コンサルティング型">コンサルティング型</SelectItem>
                    <SelectItem value="提案型">提案型</SelectItem>
                    <SelectItem value="クロージング型">クロージング型</SelectItem>
                    <SelectItem value="フォロー重視型">フォロー重視型</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
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