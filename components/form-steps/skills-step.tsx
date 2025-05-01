"use client"

import { useFormContext, useFieldArray } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// プログラミング言語のリスト
const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Rust",
  "C",
  "C++",
]

// ビジネススキルのリスト
const BUSINESS_SKILLS = [
  "Excel",
  "PowerPoint",
  "Word",
  "企画書作成",
  "プレゼンテーション",
  "マーケティング",
  "データ分析",
  "プロジェクト管理",
]

// 言語スキルのリスト
const LANGUAGE_SKILLS = ["英語", "中国語", "韓国語", "フランス語", "ドイツ語", "スペイン語"]

// 言語レベルのリスト
const LANGUAGE_LEVELS = ["ネイティブ", "ビジネスレベル", "日常会話レベル", "基礎レベル"]

export function SkillsStep() {
  const { control, watch } = useFormContext()
  const hasITExperience = watch("skillsInfo.hasITExperience")

  // プログラミング言語のフィールド配列
  const {
    fields: languageFields,
    append: appendLanguage,
    prepend: prependLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "programmingSkills.languages",
  })

  // 資格のフィールド配列
  const {
    fields: certificationFields,
    append: appendCertification,
    prepend: prependCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "businessSkills.certifications",
  })

  // 言語スキルのフィールド配列
  const {
    fields: languageSkillFields,
    append: appendLanguageSkill,
    prepend: prependLanguageSkill,
    remove: removeLanguageSkill,
  } = useFieldArray({
    control,
    name: "businessSkills.languages",
  })

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">スキル情報</h2>

        <FormField
          control={control}
          name="skillsInfo.hasITExperience"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                IT経験<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="あり" id="it-yes" />
                    <Label htmlFor="it-yes">あり</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="なし" id="it-no" />
                    <Label htmlFor="it-no">なし</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* IT経験ありの場合のプログラミング言語セクション */}
      {hasITExperience === "あり" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">プログラミング言語</h3>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {PROGRAMMING_LANGUAGES.map((language) => (
                <Button
                  key={language}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const exists = languageFields.some((field) => field.name === language)
                    if (!exists) {
                      prependLanguage({
                        name: language,
                        yearsOfExperience: "",
                        frameworks: [],
                      })
                    }
                  }}
                  className="h-8"
                >
                  {language}
                </Button>
              ))}
            </div>

            <div className="space-y-4 mt-4">
              {languageFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{field.name}</h4>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeLanguage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={control}
                      name={`programmingSkills.languages.${index}.yearsOfExperience`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>経験年数</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="50" placeholder="年数" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`programmingSkills.languages.${index}.frameworks`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>フレームワーク経験</FormLabel>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {field.value?.map((framework, fIndex) => (
                              <Badge key={fIndex} variant="secondary" className="flex items-center gap-1">
                                {framework}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0"
                                  onClick={() => {
                                    const newFrameworks = [...field.value]
                                    newFrameworks.splice(fIndex, 1)
                                    field.onChange(newFrameworks)
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input placeholder="フレームワーク名" id={`framework-input-${index}`} className="flex-1" />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const input = document.getElementById(`framework-input-${index}`) as HTMLInputElement
                                if (input.value) {
                                  const newFrameworks = [...(field.value || []), input.value]
                                  field.onChange(newFrameworks)
                                  input.value = ""
                                }
                              }}
                            >
                              追加
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IT経験なしの場合のビジネススキルセクション */}
      {hasITExperience === "なし" && (
        <div className="space-y-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">ビジネススキル</h3>

            <FormField
              control={control}
              name="businessSkills.skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ビジネススキル（複数選択可）</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {BUSINESS_SKILLS.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={field.value?.includes(skill)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), skill]
                              : (field.value || []).filter((value) => value !== skill)
                            field.onChange(updatedValue)
                          }}
                        />
                        <label
                          htmlFor={`skill-${skill}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">語学力</h3>

            <div className="space-y-4">
              {languageSkillFields.map((field, index) => (
                <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <FormField
                    control={control}
                    name={`businessSkills.languages.${index}.language`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>言語</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="言語を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGE_SKILLS.map((lang) => (
                              <SelectItem key={lang} value={lang}>
                                {lang}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`businessSkills.languages.${index}.level`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>レベル</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="レベルを選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {LANGUAGE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLanguageSkill(index)}
                    className="mt-4 md:mt-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => prependLanguageSkill({ language: "", level: "" })}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                言語を追加
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">資格</h3>

            <div className="space-y-4">
              {certificationFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={control}
                    name={`businessSkills.certifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="資格名" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="button" variant="ghost" size="icon" onClick={() => removeCertification(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" onClick={() => prependCertification({ name: "" })}>
                <Plus className="h-4 w-4 mr-2" />
                資格を追加
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
