import { FormData } from "@/lib/types/form.types"

/**
 * 応募情報を保存する
 */
export async function saveRecruitmentData(formData: FormData) {
  try {
    const response = await fetch("/api/recruitment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "応募情報の送信に失敗しました")
    }

    return await response.json()
  } catch (error) {
    console.error("応募情報保存エラー:", error)
    throw error
  }
} 