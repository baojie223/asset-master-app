"use client";

import { Transaction } from "@/types";
import { Progress } from "@/components/ui/progress";

export interface TransactionsStatsProps {
  transactions: Transaction[];
}

export function TransactionsStats({ transactions }: TransactionsStatsProps) {
  // 计算总支出
  const totalExpense = transactions
    .filter((t) => t.category_id === 999)
    .reduce((sum, t) => sum + t.amount, 0);

  // 按分类统计支出
  const categoryStats = transactions
    .reduce((stats) => {
      // const category = t.category_id;
      // stats[category] = (stats[category] || 0) + t.amount;
      return stats;
    }, {} as Record<string, number>);

  // 转换为数组并排序
  const sortedStats = Object.entries(categoryStats)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalExpense) * 100,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">总支出</span>
          <span className="text-2xl font-bold">¥ {totalExpense.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedStats.map((stat) => (
          <div key={stat.category} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{stat.category}</span>
              <span className="text-sm text-muted-foreground">
                ¥ {stat.amount.toLocaleString()}
              </span>
            </div>
            <Progress value={stat.percentage} className="h-2" />
            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {stat.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 