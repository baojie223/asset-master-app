"use client";

import { useState } from "react";
import { Transaction } from "@/types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditTransactionDialog } from "./edit-transaction-dialog";

export interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onSuccess?: () => void;
}

export function TransactionsTable({ transactions, isLoading, onSuccess }: TransactionsTableProps) {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

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
              备注
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
              操作
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
                  variant={transaction.category_id === 999 ? "default" : "destructive"}
                >
                  {transaction.category_id === 999 ? "转账" : "支出"}
                </Badge>
              </td>
              <td className="p-4 align-middle font-medium">
                ¥ {transaction.amount.toLocaleString()}
              </td>
              <td className="p-4 align-middle">{transaction.category_id}</td>
              <td className="p-4 align-middle">
                <div className="flex flex-wrap gap-1">
                  {transaction.tags?.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </td>
              <td className="p-4 align-middle text-muted-foreground">
                {transaction.notes}
              </td>
              <td className="p-4 align-middle">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingTransaction(transaction)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={!!editingTransaction}
          onOpenChange={(open) => !open && setEditingTransaction(null)}
          onSuccess={onSuccess}
        />
      )}
    </div>
  );
} 