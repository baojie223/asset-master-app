export interface Transaction {
  id: string;
  date: string;
  type: "收入" | "支出";
  category: string;
  amount: number;
  description?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
} 