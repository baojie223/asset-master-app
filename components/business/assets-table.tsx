import { Asset } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function AssetsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名称</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>初始价值</TableHead>
            <TableHead>货币</TableHead>
            <TableHead>购买日期</TableHead>
            <TableHead>备注</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.initial_value}</TableCell>
              <TableCell>{asset.currency}</TableCell>
              <TableCell>{asset.purchase_date}</TableCell>
              <TableCell>{asset.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
