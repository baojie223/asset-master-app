"use client";

import { useEffect } from "react";
import AssetsTable from "@/components/business/assets-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetsPieChart from "@/components/business/assets-pie-chart";
import { AddAssetDialog } from "@/components/business/add-asset-dialog";
import { supabase } from "@/lib/supbase";

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
