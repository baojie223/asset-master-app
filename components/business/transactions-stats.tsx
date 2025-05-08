"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TransactionStats {
  category: string;
  amount: number;
  percentage: number;
}

interface TransactionsStatsProps {
  stats: TransactionStats[];
  totalAmount: number;
}

export function TransactionsStats({ stats, totalAmount }: TransactionsStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>支出分类统计</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          总支出：¥ {totalAmount.toLocaleString()}
        </div>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stat.category}</span>
                <span className="text-sm text-muted-foreground">
                  ¥ {stat.amount.toLocaleString()} ({stat.percentage}%)
                </span>
              </div>
              <Progress value={stat.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 