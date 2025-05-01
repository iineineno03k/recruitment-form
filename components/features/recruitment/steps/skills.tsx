"use client"

import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

export function SkillsStep() {
  const { control, watch, setValue, getValues } = useFormContext()
  const hasITExperience = watch("skillsInfo.hasITExperience")

  // プログラミング言語の追加
  const addProgrammingLanguage = () => {
    const languages = getValues("programmingSkills.languages") || []
    setValue("programmingSkills.languages", [...languages, { name: "", yearsOfExperience: "", frameworks: [] }])
  }

  // プログラミング言語の削除
  const removeProgrammingLanguage = (index: number) => {
    const languages = getValues("programmingSkills.languages")
    if (languages && languages.length > index) {
      setValue(
        "programmingSkills.languages",
        languages.filter((_, i) => i !== index)
      )
    }
  }

  // フレームワークの追加
  const addFramework = (languageIndex: number) => {
    const languages = getValues("programmingSkills.languages")
    if (languages && languages.length > languageIndex) {
      const language = languages[languageIndex]
      const updatedLanguage = {
        ...language,
        frameworks: [...(language.frameworks || []), ""],
      }
      const updatedLanguages = [...languages]
      updatedLanguages[languageIndex] = updatedLanguage
      setValue("programmingSkills.languages", updatedLanguages)
    }
  }

  // フレームワークの削除
  const removeFramework = (languageIndex: number, frameworkIndex: number) => {
    const languages = getValues("programmingSkills.languages")
    if (languages && languages.length > languageIndex) {
      const language = languages[languageIndex]
      if (language.frameworks && language.frameworks.length > frameworkIndex) {
        const updatedFrameworks = language.frameworks.filter((_, i) => i !== frameworkIndex)
        const updatedLanguage = {
          ...language,
          frameworks: updatedFrameworks,
        }
        const updatedLanguages = [...languages]
        updatedLanguages[languageIndex] = updatedLanguage
        setValue("programmingSkills.languages", updatedLanguages)
      }
    }
  }

  // ビジネススキルの追加
  const addBusinessSkill = (field: string) => {
    const skills = getValues(`businessSkills.${field}`) || []
    if (field === "languages") {
      setValue(`businessSkills.${field}`, [...skills, { language: "", level: "" }])
    } else if (field === "certifications") {
      setValue(`businessSkills.${field}`, [...skills, { name: "" }])
    }
  }

  // ビジネススキルの削除
  const removeBusinessSkill = (field: string, index: number) => {
    const skills = getValues(`businessSkills.${field}`)
    if (skills && skills.length > index) {
      setValue(
        `businessSkills.${field}`,
        skills.filter((_, i) => i !== index)
      )
    }
  }

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
                IT経験の有無<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="あり" id="it-exp-yes" />
                    <Label htmlFor="it-exp-yes">あり</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="なし" id="it-exp-no" />
                    <Label htmlFor="it-exp-no">なし</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* IT経験ありの場合の追加フォーム */}
      {hasITExperience === "あり" && (
        <div className="space-y-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">プログラミングスキル</h3>

          <div className="space-y-8">
            {/* プログラミング言語 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-900 dark:text-white">プログラミング言語</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProgrammingLanguage}
                  className="flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  追加
                </Button>
              </div>

              {/* 言語リスト */}
              {watch("programmingSkills.languages")?.map((_, languageIndex) => (
                <div key={languageIndex} className="p-4 border border-gray-200 dark:border-gray-700 rounded-md space-y-4">
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">言語 {languageIndex + 1}</h5>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProgrammingLanguage(languageIndex)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name={`programmingSkills.languages.${languageIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>言語名</FormLabel>
                          <FormControl>
                            <Input placeholder="JavaScript, Python など" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`programmingSkills.languages.${languageIndex}.yearsOfExperience`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>経験年数</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="経験年数を選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1年未満">1年未満</SelectItem>
                              <SelectItem value="1-2年">1-2年</SelectItem>
                              <SelectItem value="3-5年">3-5年</SelectItem>
                              <SelectItem value="5-10年">5-10年</SelectItem>
                              <SelectItem value="10年以上">10年以上</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* フレームワーク */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400">フレームワーク</h6>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addFramework(languageIndex)}
                        className="h-7 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        追加
                      </Button>
                    </div>

                    {watch(`programmingSkills.languages.${languageIndex}.frameworks`)?.map((_, frameworkIndex) => (
                      <div key={frameworkIndex} className="flex items-center space-x-2">
                        <FormField
                          control={control}
                          name={`programmingSkills.languages.${languageIndex}.frameworks.${frameworkIndex}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="React, Django など" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFramework(languageIndex, frameworkIndex)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))}

                    {(!watch(`programmingSkills.languages.${languageIndex}.frameworks`) ||
                      watch(`programmingSkills.languages.${languageIndex}.frameworks`).length === 0) && (
                      <p className="text-sm text-gray-500 italic">フレームワークが追加されていません</p>
                    )}
                  </div>
                </div>
              ))}

              {(!watch("programmingSkills.languages") || watch("programmingSkills.languages").length === 0) && (
                <p className="text-sm text-gray-500 italic">
                  「追加」ボタンをクリックして、使用したことのあるプログラミング言語を追加してください
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IT経験なしの場合の追加フォーム */}
      {hasITExperience === "なし" && (
        <div className="space-y-6 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">ビジネススキル</h3>

          <FormField
            control={control}
            name="businessSkills.skills"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>持っているスキル</FormLabel>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    当てはまるものをすべて選択してください
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "プレゼンテーション",
                    "コミュニケーション",
                    "リーダーシップ",
                    "プロジェクト管理",
                    "分析力",
                    "問題解決能力",
                    "交渉力",
                    "チームワーク",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={field.value?.includes(skill)}
                        onCheckedChange={(checked) => {
                          const currentValues = field.value || []
                          return checked
                            ? field.onChange([...currentValues, skill])
                            : field.onChange(currentValues.filter((value) => value !== skill))
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

          {/* 言語スキル */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">言語スキル</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addBusinessSkill("languages")}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                追加
              </Button>
            </div>

            {watch("businessSkills.languages")?.map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <FormField
                  control={control}
                  name={`businessSkills.languages.${index}.language`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">言語</FormLabel>
                      <FormControl>
                        <Input placeholder="英語、中国語など" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`businessSkills.languages.${index}.level`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">レベル</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="レベルを選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ネイティブ">ネイティブ</SelectItem>
                          <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                          <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                          <SelectItem value="読み書きのみ">読み書きのみ</SelectItem>
                          <SelectItem value="初級">初級</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBusinessSkill("languages", index)}
                    className="mb-2"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                    <span className="ml-1">削除</span>
                  </Button>
                </div>
              </div>
            ))}

            {(!watch("businessSkills.languages") || watch("businessSkills.languages").length === 0) && (
              <p className="text-sm text-gray-500 italic">「追加」ボタンをクリックして、言語スキルを追加してください</p>
            )}
          </div>

          {/* 資格 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">保有資格</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addBusinessSkill("certifications")}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                追加
              </Button>
            </div>

            {watch("businessSkills.certifications")?.map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`businessSkills.certifications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">資格名</FormLabel>
                      <FormControl>
                        <Input placeholder="TOEIC、簿記など" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBusinessSkill("certifications", index)}
                    className="mb-2"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                    <span className="ml-1">削除</span>
                  </Button>
                </div>
              </div>
            ))}

            {(!watch("businessSkills.certifications") || watch("businessSkills.certifications").length === 0) && (
              <p className="text-sm text-gray-500 italic">「追加」ボタンをクリックして、保有資格を追加してください</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 