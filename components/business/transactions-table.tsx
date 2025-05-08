"use client";

import { Transaction } from "@/types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>日期</TableHead>
          <TableHead>类型</TableHead>
          <TableHead>类别</TableHead>
          <TableHead>金额</TableHead>
          <TableHead>描述</TableHead>
          <TableHead>标签</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {format(new Date(transaction.created_at || ""), "yyyy-MM-dd", { locale: zhCN })}
            </TableCell>
            <TableCell>
              <Badge
                variant={transaction.type === "收入" ? "default" : "destructive"}
              >
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell
              className={
                transaction.type === "收入" ? "text-green-600" : "text-red-600"
              }
            >
              {transaction.type === "收入" ? "+" : "-"}¥
              {transaction.amount.toLocaleString()}
            </TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {transaction.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 