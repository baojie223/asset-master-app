"use client";

import { Transaction } from "@/types/transaction";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionsTable({ transactions, isLoading }: TransactionsTableProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        加载中...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        暂无交易记录
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              日期
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              类型
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              金额
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              分类
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              标签
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              描述
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="p-4 align-middle">
                {format(new Date(transaction.created_at || ""), "yyyy-MM-dd", { locale: zhCN })}
              </td>
              <td className="p-4 align-middle">
                <Badge
                  variant={transaction.type === "收入" ? "default" : "destructive"}
                >
                  {transaction.type}
                </Badge>
              </td>
              <td className="p-4 align-middle font-medium">
                ¥ {transaction.amount.toLocaleString()}
              </td>
              <td className="p-4 align-middle">{transaction.category}</td>
              <td className="p-4 align-middle">
                <div className="flex flex-wrap gap-1">
                  {transaction.tags?.split(",").map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="p-4 align-middle text-muted-foreground">
                {transaction.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 