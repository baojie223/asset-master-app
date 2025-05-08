import { Asset } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

const typeLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  cash: { label: "现金", variant: "default" },
  bank_account: { label: "银行账户", variant: "secondary" },
  stock: { label: "股票", variant: "destructive" },
  crypto: { label: "加密货币", variant: "outline" },
  other: { label: "其他", variant: "secondary" }
};

const currencySymbols: Record<string, string> = {
  CNY: "¥",
  USD: "$",
  HKD: "HK$",
  BTC: "₿",
  ETH: "Ξ"
};

export default function AssetsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead className="text-right">初始价值</TableHead>
            <TableHead>货币</TableHead>
            <TableHead>购买日期</TableHead>
            <TableHead>备注</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell>
                <Badge 
                  variant={typeLabels[asset.type].variant}
                  className="capitalize"
                >
                  {typeLabels[asset.type].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                {currencySymbols[asset.currency]}
                {asset.initial_value.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {asset.currency}
                </Badge>
              </TableCell>
              <TableCell>{asset.purchase_date}</TableCell>
              <TableCell className="text-muted-foreground">{asset.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
