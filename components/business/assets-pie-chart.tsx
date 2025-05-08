"use client";

import { Asset } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// 测试数据
const testAssets: Asset[] = [
  {
    id: 1,
    name: "工商银行储蓄卡",
    type: "bank_account",
    initial_value: 10000,
    currency: "CNY",
    purchase_date: "2024-01-01",
    notes: "日常储蓄账户",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: 2,
    name: "比特币",
    type: "crypto",
    initial_value: 0.5,
    currency: "BTC",
    purchase_date: "2024-02-01",
    notes: "长期投资",
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-02-01T00:00:00Z"
  },
  {
    id: 3,
    name: "腾讯股票",
    type: "stock",
    initial_value: 100,
    currency: "HKD",
    purchase_date: "2024-03-01",
    notes: "港股投资",
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const typeLabels: Record<string, string> = {
  cash: '现金',
  bank_account: '银行账户',
  stock: '股票',
  crypto: '加密货币',
  other: '其他'
};

export default function AssetsPieChart() {
  // 按类型分组并计算总价值
  const data = testAssets.reduce((acc, asset) => {
    const type = asset.type;
    const value = asset.initial_value;
    
    const existingType = acc.find(item => item.name === typeLabels[type]);
    if (existingType) {
      existingType.value += value;
    } else {
      acc.push({
        name: typeLabels[type],
        value: value
      });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>资产分布</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()}`, '价值']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

