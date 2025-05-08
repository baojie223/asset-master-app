"use client";

import { useState, useEffect } from "react";
import TransactionsTable from "@/components/business/transactions-table";
import { TransactionsFilter } from "@/components/business/transactions-filter";
import { TransactionsStats } from "@/components/business/transactions-stats";
import { AddTransactionDialog } from "@/components/business/add-transaction-dialog";
import { Transaction } from "@/types/transaction";
import { supabase } from "@/lib/supbase";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<{ category: string; amount: number; percentage: number }[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error);
        return;
      }

      const transactionsData = (data || []) as Transaction[];
      setTransactions(transactionsData);
      setFilteredTransactions(transactionsData);
      calculateStats(transactionsData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (transactions: Transaction[]) => {
    const expenses = transactions.filter((t) => t.type === "支出");
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    setTotalAmount(total);

    const categoryStats = expenses.reduce((acc: { [key: string]: number }, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const statsArray = Object.entries(categoryStats)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    setStats(statsArray);
  };

  const handleFilterChange = (filters: {
    year: string;
    month: string;
    type: string;
    tags: string[];
  }) => {
    let filtered = [...transactions];

    if (filters.year) {
      filtered = filtered.filter(
        (t) => new Date(t.created_at || "").getFullYear().toString() === filters.year
      );
    }

    if (filters.month) {
      filtered = filtered.filter(
        (t) => (new Date(t.created_at || "").getMonth() + 1).toString().padStart(2, "0") === filters.month
      );
    }

    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((t) =>
        filters.tags.some((tag) => t.tags?.includes(tag))
      );
    }

    setFilteredTransactions(filtered);
    calculateStats(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-4 md:space-y-8">
        {/* 标题部分 */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">交易记录</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            查看和管理您的所有交易记录。
          </p>
        </div>

        {/* 筛选器 */}
        <TransactionsFilter onFilterChange={handleFilterChange} />

        {/* 统计信息 */}
        <div className="grid gap-4 md:grid-cols-2">
          <TransactionsStats stats={stats} totalAmount={totalAmount} />
        </div>

        {/* 交易列表 */}
        <div className="rounded-lg border bg-card overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">加载中...</div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">暂无交易记录</div>
          ) : (
            <TransactionsTable transactions={filteredTransactions} />
          )}
        </div>

        {/* 添加交易按钮 */}
        <AddTransactionDialog onSuccess={fetchTransactions} />
      </div>
    </div>
  );
} 