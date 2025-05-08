"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface TransactionsFilterProps {
  selectedYear: number;
  selectedMonth: number | null;
  selectedType: string | null;
  selectedTags: string[];
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | null) => void;
  onTypeChange: (type: string | null) => void;
  onTagsChange: (tags: string[]) => void;
}

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
const months = [
  { value: 1, label: "1月" },
  { value: 2, label: "2月" },
  { value: 3, label: "3月" },
  { value: 4, label: "4月" },
  { value: 5, label: "5月" },
  { value: 6, label: "6月" },
  { value: 7, label: "7月" },
  { value: 8, label: "8月" },
  { value: 9, label: "9月" },
  { value: 10, label: "10月" },
  { value: 11, label: "11月" },
  { value: 12, label: "12月" },
];

const types = [
  { value: "收入", label: "收入" },
  { value: "支出", label: "支出" },
];

const tags = [
  "餐饮",
  "交通",
  "购物",
  "娱乐",
  "医疗",
  "教育",
  "住房",
  "其他",
];

export function TransactionsFilter({
  selectedYear,
  selectedMonth,
  selectedType,
  selectedTags,
  onYearChange,
  onMonthChange,
  onTypeChange,
  onTagsChange,
}: TransactionsFilterProps) {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    onMonthChange(null);
    onTypeChange(null);
    onTagsChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => onYearChange(parseInt(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="选择年份" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMonth?.toString() || ""}
          onValueChange={(value) => onMonthChange(parseInt(value))}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="选择月份" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部月份</SelectItem>
            {months.map((month) => (
              <SelectItem key={month.value} value={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedType || ""}
          onValueChange={(value) => onTypeChange(value || null)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="交易类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(selectedMonth !== null || selectedType !== null || selectedTags.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 lg:px-3"
          >
            清除筛选
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
} 