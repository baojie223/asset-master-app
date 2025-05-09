"use client";

import { useState, useEffect } from "react";
import { TransactionsTable } from "@/components/business/transactions-table";
import { TransactionsFilter } from "@/components/business/transactions-filter";
import { TransactionsStats } from "@/components/business/transactions-stats";
import { AddTransactionDialog } from "@/components/business/add-transaction-dialog";
import { UploadTransactionsDialog } from "@/components/business/upload-transactions-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types";
import { supabase } from "@/lib/supbase";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [, setFilteredTransactions] = useState<Transaction[]>([]);
  const [, setStats] = useState<{ category: string; amount: number; percentage: number }[]>([]);
  const [, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(new Date().getMonth() + 1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    const expenses = transactions.filter((t) => t.category_id === 999);
    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    setTotalAmount(total);

    const categoryStats = expenses.reduce((acc: { [key: string]: number }) => {
      // acc[t.category_id] = (acc[t.category_id] || 0) + t.amount;
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

  // const handleFilterChange = (filters: {
  //   year: string;
  //   month: string;
  //   type: string;
  //   tags: string[];
  // }) => {
  //   let filtered = [...transactions];

  //   if (filters.year) {
  //     filtered = filtered.filter(
  //       (t) => new Date(t.created_at || "").getFullYear().toString() === filters.year
  //     );
  //   }

  //   if (filters.month) {
  //     filtered = filtered.filter(
  //       (t) => (new Date(t.created_at || "").getMonth() + 1).toString().padStart(2, "0") === filters.month
  //     );
  //   }

  //   if (filters.type) {
  //     filtered = filtered.filter((t) => t.type === filters.type);
  //   }

  //   if (filters.tags.length > 0) {
  //     filtered = filtered.filter((t) =>
  //       filters.tags.some((tag) => t.tags?.includes(tag))
  //     );
  //   }

  //   setFilteredTransactions(filtered);
  //   calculateStats(filtered);
  // };

  const filteredTransactions2 = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.created_at || "");
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;

    const yearMatch = year === selectedYear;
    const monthMatch = selectedMonth === null || month === selectedMonth;
    const typeMatch = true;
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => transaction.tags?.includes(tag));

    return yearMatch && monthMatch && typeMatch && tagsMatch;
  });

  const sortedTransactions = [...filteredTransactions2].sort((a, b) => {
    if (a.category_id === 999 && b.category_id === 999) {
      return b.amount - a.amount;
    }
    return 0;
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">交易记录</h1>
          <p className="text-muted-foreground">
            查看和管理您的所有交易记录
          </p>
        </div>
        <div className="flex gap-2">
          <UploadTransactionsDialog type="zfb" onSuccess={fetchTransactions} />
          <UploadTransactionsDialog type="wx" onSuccess={fetchTransactions} />
          <AddTransactionDialog onSuccess={fetchTransactions} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总资产</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥ 100,000</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 5%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月收入</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥ 15,000</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 10%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月支出</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥ 8,000</div>
            <p className="text-xs text-muted-foreground">
              较上月减少 5%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">本月结余</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥ 7,000</div>
            <p className="text-xs text-muted-foreground">
              较上月增长 15%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>交易记录</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsFilter
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedType={selectedType}
              selectedTags={selectedTags}
              onYearChange={setSelectedYear}
              onMonthChange={setSelectedMonth}
              onTypeChange={setSelectedType}
              onTagsChange={setSelectedTags}
            />
            <div className="mt-4">
              <TransactionsTable
                transactions={sortedTransactions}
                isLoading={isLoading}
                onSuccess={fetchTransactions}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>支出统计</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsStats transactions={sortedTransactions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 