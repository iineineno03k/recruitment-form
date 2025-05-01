"use client"

import { useState, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { BasicInfoStep } from "./form-steps/basic-info-step"
import { SkillsStep } from "./form-steps/skills-step"
import { PreferencesStep } from "./form-steps/preferences-step"
import { DocumentsStep } from "./form-steps/documents-step"
import { ConfirmationStep } from "./form-steps/confirmation-step"
import { formSchema } from "@/lib/form-schema"
import { ThemeToggle } from "./theme-toggle"

type FormData = z.infer<typeof formSchema>

const STEPS = [
  { id: 0, name: "基本情報" },
  { id: 1, name: "スキル情報" },
  { id: 2, name: "希望条件" },
  { id: 3, name: "添付書類" },
  { id: 4, name: "確認・提出" },
]

export function RecruitmentForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // フォームの初期化
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      basicInfo: {
        fullNameKanji: "",
        fullNameKana: "",
        birthDate: undefined,
        applicationType: undefined,
      },
      universityInfo: {
        universityName: "",
        faculty: "",
        graduationDate: undefined,
        researchDetails: "",
      },
      careerInfo: {
        resignationReasons: [],
        otherReasonDetails: "",
      },
      internshipInfo: {
        startDate: undefined,
        endDate: undefined,
        daysPerWeek: undefined,
      },
      skillsInfo: {
        hasITExperience: undefined,
      },
      programmingSkills: {
        languages: [],
      },
      businessSkills: {
        skills: [],
        languages: [],
        certifications: [],
      },
      preferences: {
        jobType: undefined,
      },
      engineerPreferences: {
        workEnvironment: [],
        remoteSetup: "",
      },
      marketingPreferences: {
        tools: [],
        hasBudgetExperience: undefined,
        budgetExperienceLevel: undefined,
      },
      salesPreferences: {
        experienceType: [],
        salesStyle: undefined,
      },
      documents: {
        resume: undefined,
        careerHistory: undefined,
        portfolio: undefined,
        portfolioUrl: "",
      },
      agreement: {
        privacyPolicy: false,
        confirmation: false,
      },
    },
  })

  // セッションからフォームデータを復元
  useEffect(() => {
    const savedData = sessionStorage.getItem("recruitmentFormData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      methods.reset(parsedData)
    }
  }, [methods])

  // フォームデータの変更をセッションに保存
  useEffect(() => {
    const subscription = methods.watch((data) => {
      sessionStorage.setItem("recruitmentFormData", JSON.stringify(data))
    })
    return () => subscription.unsubscribe()
  }, [methods])

  // 次のステップへ進む
  const handleNext = async () => {
    const fieldsToValidate = getFieldsToValidateForStep(currentStep, methods.getValues())

    const isValid = await methods.trigger(fieldsToValidate as any)

    if (isValid) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo(0, 0)
      }
    } else {
      toast({
        title: "入力エラー",
        description: "必須項目を入力してください",
        variant: "destructive",
      })
    }
  }

  // 前のステップに戻る
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  // フォーム送信処理
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // ここでAPIリクエストを行う
      console.log("送信データ:", data)

      // 送信成功を模擬（実際の実装では削除）
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "送信完了",
        description: "応募情報が正常に送信されました",
      })

      // フォームをリセット
      methods.reset()
      sessionStorage.removeItem("recruitmentFormData")
      setCurrentStep(0)
    } catch (error) {
      toast({
        title: "エラー",
        description: "送信中にエラーが発生しました。再度お試しください。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 現在のステップに応じたコンポーネントを表示
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />
      case 1:
        return <SkillsStep />
      case 2:
        return <PreferencesStep />
      case 3:
        return <DocumentsStep />
      case 4:
        return <ConfirmationStep />
      default:
        return null
    }
  }

  // 進捗率の計算
  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ステップ {currentStep + 1} / {STEPS.length}: {STEPS[currentStep].name}
          </div>
          <ThemeToggle />
        </div>

        <Progress value={progressPercentage} className="h-2 mb-6" />

        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="pt-6">
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {renderStep()}

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                >
                  戻る
                </Button>

                {currentStep === STEPS.length - 1 ? (
                  <Button type="submit" disabled={isSubmitting} className="bg-[#4A6CF7] hover:bg-[#3a5bd9]">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      "送信する"
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext} className="bg-[#4A6CF7] hover:bg-[#3a5bd9]">
                    次へ
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  )
}

// 各ステップで検証すべきフィールドを取得
function getFieldsToValidateForStep(step: number, formData: any) {
  switch (step) {
    case 0:
      const fields = ["basicInfo"]

      // 応募区分に応じた追加フィールド
      if (formData.basicInfo.applicationType === "新卒採用") {
        fields.push("universityInfo")
      } else if (formData.basicInfo.applicationType === "中途採用") {
        fields.push("careerInfo")
      } else if (formData.basicInfo.applicationType === "インターン") {
        fields.push("internshipInfo")
      }

      return fields

    case 1:
      const skillFields = ["skillsInfo"]

      // IT経験の有無に応じた追加フィールド
      if (formData.skillsInfo.hasITExperience === "あり") {
        skillFields.push("programmingSkills")
      } else if (formData.skillsInfo.hasITExperience === "なし") {
        skillFields.push("businessSkills")
      }

      return skillFields

    case 2:
      const prefFields = ["preferences"]

      // 希望職種に応じた追加フィールド
      if (formData.preferences.jobType === "エンジニア") {
        prefFields.push("engineerPreferences")
      } else if (formData.preferences.jobType === "マーケティング") {
        prefFields.push("marketingPreferences")
      } else if (formData.preferences.jobType === "営業") {
        prefFields.push("salesPreferences")
      }

      return prefFields

    case 3:
      return ["documents"]

    case 4:
      return ["agreement"]

    default:
      return []
  }
}
