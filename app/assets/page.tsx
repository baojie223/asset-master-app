"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import AssetsTable from "@/components/business/assets-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetsPieChart from "@/components/business/assets-pie-chart";
import { AddAssetDialog } from "@/components/business/add-asset-dialog";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://rzjeoeljpbdgxmlohlos.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6amVvZWxqcGJkZ3htbG9obG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTU0MjQsImV4cCI6MjA2MjE3MTQyNH0.tBBR7I880f7W0d1_ITe4tCjx4pkQYNmW29_mt4uBI-A"
);

export default function Assets() {
  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("assets").select("*");
      console.log(data, error);
    }

    async function getSth() {
      const { data, error } = await supabase.functions.invoke('smooth-api', {
        body: { name: 'Functions' },
      })
      console.log(data, error)
    }

    getSth();
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* 标题部分 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">资产管理</h1>
          <p className="text-muted-foreground">
            查看和管理您的所有资产，包括现金、银行账户、股票和加密货币等。
          </p>
        </div>

        {/* 资产表格 */}
        <Card>
          <CardHeader>
            <CardTitle>资产列表</CardTitle>
          </CardHeader>
          <CardContent>
            <AssetsTable />
          </CardContent>
        </Card>

        {/* 资产分布饼图 */}
        <Card>
          <CardHeader>
            <CardTitle>资产分布</CardTitle>
          </CardHeader>
          <CardContent>
            <AssetsPieChart />
          </CardContent>
        </Card>
      </div>

      {/* 添加资产按钮 */}
      <AddAssetDialog />
    </div>
  );
}
