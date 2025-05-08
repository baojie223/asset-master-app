import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRightIcon, ArrowDownRightIcon, WalletIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* 标题部分 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">欢迎使用</h1>
          <p className="text-muted-foreground">
            管理您的资产和交易记录，轻松掌握财务状况。
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总资产</CardTitle>
              <WalletIcon className="h-4 w-4 text-muted-foreground" />
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
              <ArrowUpRightIcon className="h-4 w-4 text-green-500" />
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
              <ArrowDownRightIcon className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥ 8,000</div>
              <p className="text-xs text-muted-foreground">
                较上月减少 3%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 快捷操作 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>最近交易</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                暂无最近交易记录
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>资产分布</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                暂无资产数据
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
