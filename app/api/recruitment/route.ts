import { NextResponse } from "next/server"
import { formSchema } from "@/lib/form-schema"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // バリデーションチェック
    const validated = formSchema.safeParse(data)
    
    if (!validated.success) {
      return NextResponse.json(
        { error: "バリデーションエラー", details: validated.error.format() },
        { status: 400 }
      )
    }
    
    // 実際の実装ではここでデータを保存する処理を行う
    console.log("応募フォームデータ:", validated.data)
    
    // 成功レスポンス
    return NextResponse.json({ success: true, message: "応募情報が保存されました" }, { status: 201 })
  } catch (error) {
    console.error("応募情報保存エラー:", error)
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    )
  }
} 