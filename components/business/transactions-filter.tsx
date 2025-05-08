"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
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

interface TransactionsFilterProps {
  onFilterChange: (filters: {
    year: string;
    month: string;
    type: string;
    tags: string[];
  }) => void;
}

export function TransactionsFilter({ onFilterChange }: TransactionsFilterProps) {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const types = ["收入", "支出"];
  const tags = ["餐饮", "交通", "购物", "娱乐", "住房", "医疗", "教育", "其他"];

  const handleFilterChange = () => {
    onFilterChange({
      year: selectedYear,
      month: selectedMonth,
      type: selectedType,
      tags: selectedTags,
    });
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      return newTags;
    });
  };

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedType("");
    setSelectedTags([]);
    onFilterChange({
      year: "",
      month: "",
      type: "",
      tags: [],
    });
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedYear}
            onValueChange={(value) => {
              setSelectedYear(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="选择年份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部年份</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}年
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              setSelectedMonth(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="选择月份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部月份</SelectItem>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}月
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedType}
            onValueChange={(value) => {
              setSelectedType(value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="交易类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="ml-auto"
          >
            清除筛选
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                handleTagClick(tag);
                handleFilterChange();
              }}
            >
              {tag}
              {selectedTags.includes(tag) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
} 