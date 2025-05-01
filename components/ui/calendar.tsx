"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  className?: string
  selected?: Date
  defaultMonth?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean
  [key: string]: any
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  ...props
}: CalendarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && onSelect) {
      onSelect(new Date(e.target.value));
    }
  };

  // フォーマット YYYY-MM-DD
  const formatDate = (date?: Date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={cn("p-3 flex flex-col", className)}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">日付を選択</span>
      </div>
      <input
        type="date"
        className={cn(
          "w-full border rounded-md p-2",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        value={formatDate(selected)}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
