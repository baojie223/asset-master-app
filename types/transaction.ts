export interface Transaction {
  id: string;
  date: string;
  type: "收入" | "支出";
  amount: number;
  category: string;
  description?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
} 