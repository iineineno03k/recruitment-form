import { z } from "zod"
import { formSchema } from "@/lib/form-schema"

export type FormData = z.infer<typeof formSchema>

export type FormStep = {
  id: number
  name: string
} 