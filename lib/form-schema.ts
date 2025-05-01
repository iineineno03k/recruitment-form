import { z } from "zod"

// 基本情報のスキーマ
const basicInfoSchema = z.object({
  fullNameKanji: z.string().min(1, { message: "氏名（漢字）を入力してください" }),
  fullNameKana: z.string().min(1, { message: "氏名（かな）を入力してください" }),
  birthDate: z.date({ required_error: "生年月日を選択してください" }),
  applicationType: z.enum(["新卒採用", "中途採用", "インターン"], {
    required_error: "応募区分を選択してください",
  }),
})

// 大学情報のスキーマ（新卒採用時）
const universityInfoSchema = z.object({
  universityName: z.string().min(1, { message: "大学名を入力してください" }),
  faculty: z.string().min(1, { message: "学部を入力してください" }),
  graduationDate: z.date({ required_error: "卒業年月を選択してください" }),
  researchDetails: z.string().optional(),
})

// 職歴情報のスキーマ（中途採用時）
const careerInfoSchema = z
  .object({
    resignationReasons: z.array(z.string()).min(1, { message: "退職理由を1つ以上選択してください" }),
    otherReasonDetails: z.string().optional(),
  })
  .refine(
    (data) => {
      // 「その他」が選択されている場合、詳細が必要
      if (data.resignationReasons.includes("その他")) {
        return !!data.otherReasonDetails
      }
      return true
    },
    {
      message: "「その他」を選択した場合は詳細を入力してください",
      path: ["otherReasonDetails"],
    },
  )

// インターン情報のスキーマ（インターン時）
const internshipInfoSchema = z
  .object({
    startDate: z.date({ required_error: "開始日を選択してください" }),
    endDate: z.date({ required_error: "終了日を選択してください" }),
    daysPerWeek: z.string().min(1, { message: "希望日数を選択してください" }),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate
      }
      return true
    },
    {
      message: "終了日は開始日より後の日付を選択してください",
      path: ["endDate"],
    },
  )

// スキル情報のスキーマ
const skillsInfoSchema = z.object({
  hasITExperience: z.enum(["あり", "なし"], {
    required_error: "IT経験の有無を選択してください",
  }),
})

// プログラミング言語のスキーマ（IT経験あり時）
const programmingLanguageSchema = z.object({
  name: z.string(),
  yearsOfExperience: z.string().optional(),
  frameworks: z.array(z.string()).optional(),
})

const programmingSkillsSchema = z.object({
  languages: z.array(programmingLanguageSchema).optional(),
})

// ビジネススキルのスキーマ（IT経験なし時）
const languageSkillSchema = z.object({
  language: z.string().optional(),
  level: z.string().optional(),
})

const certificationSchema = z.object({
  name: z.string().optional(),
})

const businessSkillsSchema = z.object({
  skills: z.array(z.string()).optional(),
  languages: z.array(languageSkillSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
})

// 希望条件のスキーマ
const preferencesSchema = z.object({
  jobType: z.enum(["エンジニア", "マーケティング", "営業", "その他"], {
    required_error: "希望職種を選択してください",
  }),
})

// エンジニア希望時のスキーマ
const engineerPreferencesSchema = z.object({
  workEnvironment: z.array(z.string()).optional(),
  remoteSetup: z.string().optional(),
})

// マーケティング希望時のスキーマ
const marketingPreferencesSchema = z.object({
  tools: z.array(z.string()).optional(),
  hasBudgetExperience: z.enum(["あり", "なし"]).optional(),
  budgetExperienceLevel: z.string().optional(),
})

// 営業希望時のスキーマ
const salesPreferencesSchema = z.object({
  experienceType: z.array(z.string()).optional(),
  salesStyle: z.string().optional(),
})

// 添付書類のスキーマ
const documentsSchema = z.object({
  resume: z.any().optional(),
  careerHistory: z.any().optional(),
  portfolio: z.any().optional(),
  portfolioUrl: z.string().optional(),
})

// 同意事項のスキーマ
const agreementSchema = z.object({
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "プライバシーポリシーに同意してください",
  }),
  confirmation: z.boolean().refine((val) => val === true, {
    message: "入力内容の確認をしてください",
  }),
})

// フォーム全体のスキーマ
export const formSchema = z.object({
  basicInfo: basicInfoSchema,
  universityInfo: universityInfoSchema.optional(),
  careerInfo: careerInfoSchema.optional(),
  internshipInfo: internshipInfoSchema.optional(),
  skillsInfo: skillsInfoSchema,
  programmingSkills: programmingSkillsSchema.optional(),
  businessSkills: businessSkillsSchema.optional(),
  preferences: preferencesSchema,
  engineerPreferences: engineerPreferencesSchema.optional(),
  marketingPreferences: marketingPreferencesSchema.optional(),
  salesPreferences: salesPreferencesSchema.optional(),
  documents: documentsSchema,
  agreement: agreementSchema,
})
