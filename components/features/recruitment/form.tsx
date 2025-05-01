"use client"

import { useState, useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Loader2 } from "lucide-react"
import { BasicInfoStep } from "@/components/form-steps/basic-info-step"
import { SkillsStep } from "@/components/form-steps/skills-step"
import { PreferencesStep } from "@/components/form-steps/preferences-step"
import { DocumentsStep } from "@/components/form-steps/documents-step"
import { ConfirmationStep } from "@/components/form-steps/confirmation-step"
import { formSchema } from "@/lib/form-schema"
import { ThemeToggle } from "@/components/theme-toggle"
import { FORM_STEPS } from "./constants"
import { FormData } from "@/lib/types/form.types"
import { saveRecruitmentData } from "@/lib/services/recruitment"

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
      try {
        const parsedData = JSON.parse(savedData)
        methods.reset(parsedData)
      } catch (error) {
        console.error("フォームデータの復元エラー:", error)
        sessionStorage.removeItem("recruitmentFormData")
      }
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
      if (currentStep < FORM_STEPS.length - 1) {
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
      // サービスレイヤーを使用してデータを送信
      const result = await saveRecruitmentData(data)

      toast({
        title: "送信完了",
        description: result.message || "応募情報が正常に送信されました",
      })

      // フォームをリセット
      methods.reset()
      sessionStorage.removeItem("recruitmentFormData")
      setCurrentStep(0)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "送信中にエラーが発生しました。再度お試しください。"
      
      toast({
        title: "エラー",
        description: errorMessage,
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
  const progressPercentage = ((currentStep + 1) / FORM_STEPS.length) * 100

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            ステップ {currentStep + 1} / {FORM_STEPS.length}: {FORM_STEPS[currentStep].name}
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

                {currentStep === FORM_STEPS.length - 1 ? (
                  <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
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
                  <Button type="button" onClick={handleNext} className="bg-primary hover:bg-primary/90">
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
function getFieldsToValidateForStep(step: number, values: FormData) {
  switch (step) {
    case 0: // 基本情報
      const fields = ["basicInfo"]
      if (values.basicInfo?.applicationType === "新卒採用") {
        fields.push("universityInfo")
      } else if (values.basicInfo?.applicationType === "中途採用") {
        fields.push("careerInfo")
      } else if (values.basicInfo?.applicationType === "インターン") {
        fields.push("internshipInfo")
      }
      return fields

    case 1: // スキル情報
      const skillFields = ["skillsInfo"]
      if (values.skillsInfo?.hasITExperience === "あり") {
        skillFields.push("programmingSkills")
      } else if (values.skillsInfo?.hasITExperience === "なし") {
        skillFields.push("businessSkills")
      }
      return skillFields

    case 2: // 希望条件
      const prefFields = ["preferences"]
      if (values.preferences?.jobType === "エンジニア") {
        prefFields.push("engineerPreferences")
      } else if (values.preferences?.jobType === "マーケティング") {
        prefFields.push("marketingPreferences")
      } else if (values.preferences?.jobType === "営業") {
        prefFields.push("salesPreferences")
      }
      return prefFields

    case 3: // 添付書類
      return ["documents"]

    case 4: // 確認・提出
      return ["agreement"]

    default:
      return []
  }
} 