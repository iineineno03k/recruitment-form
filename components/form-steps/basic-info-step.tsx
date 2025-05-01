"use client"

import { useFormContext } from "react-hook-form"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

export function BasicInfoStep() {
  const { control, watch } = useFormContext()
  const applicationType = watch("basicInfo.applicationType")

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">基本情報</h2>

        <FormField
          control={control}
          name="basicInfo.fullNameKanji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                氏名（漢字）<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="山田 太郎" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="basicInfo.fullNameKana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                氏名（かな）<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="やまだ たろう" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="basicInfo.birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                生年月日<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "yyyy年MM月dd日", { locale: ja }) : <span>日付を選択</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    locale={ja}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="basicInfo.applicationType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                応募区分<span className="text-[#F64E60] ml-1">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="新卒採用" id="r1" />
                    <Label htmlFor="r1">新卒採用</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="中途採用" id="r2" />
                    <Label htmlFor="r2">中途採用</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="インターン" id="r3" />
                    <Label htmlFor="r3">インターン</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 新卒採用の場合の追加フォーム */}
      {applicationType === "新卒採用" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">大学情報</h3>

          <FormField
            control={control}
            name="universityInfo.universityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  大学名<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="○○大学" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="universityInfo.faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  学部<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="○○学部" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="universityInfo.graduationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  卒業年月<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "yyyy年MM月", { locale: ja }) : <span>年月を選択</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("2000-01-01")}
                      initialFocus
                      locale={ja}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="universityInfo.researchDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>研究内容</FormLabel>
                <FormControl>
                  <Textarea placeholder="研究内容について記入してください" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      {/* 中途採用の場合の追加フォーム */}
      {applicationType === "中途採用" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">退職理由</h3>

          <FormField
            control={control}
            name="careerInfo.resignationReasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  退職理由（複数選択可）<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {[
                    { id: "career-up", label: "キャリアアップ" },
                    { id: "salary", label: "給与" },
                    { id: "environment", label: "職場環境" },
                    { id: "work-life-balance", label: "ワークライフバランス" },
                    { id: "other", label: "その他" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.id}
                        checked={field.value?.includes(item.label)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), item.label]
                            : (field.value || []).filter((value) => value !== item.label)
                          field.onChange(updatedValue)
                        }}
                      />
                      <label
                        htmlFor={item.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {watch("careerInfo.resignationReasons")?.includes("その他") && (
            <FormField
              control={control}
              name="careerInfo.otherReasonDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    その他の理由<span className="text-[#F64E60] ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="その他の退職理由を記入してください" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      )}

      {/* インターンの場合の追加フォーム */}
      {applicationType === "インターン" && (
        <div className="space-y-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">希望期間</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="internshipInfo.startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    開始日<span className="text-[#F64E60] ml-1">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? (
                            format(field.value, "yyyy年MM月dd日", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        locale={ja}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="internshipInfo.endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    終了日<span className="text-[#F64E60] ml-1">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? (
                            format(field.value, "yyyy年MM月dd日", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const startDate = watch("internshipInfo.startDate")
                          return date < (startDate || new Date())
                        }}
                        initialFocus
                        locale={ja}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="internshipInfo.daysPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  週間の希望日数<span className="text-[#F64E60] ml-1">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="希望日数を選択" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}日
                      </SelectItem>
                    ))}
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
