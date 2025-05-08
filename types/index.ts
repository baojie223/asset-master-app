// 资产类型
export interface Asset {
    id: number;
    name: string;
    type: 'cash' | 'bank_account' | 'stock' | 'crypto' | 'other';
    initial_value: number;
    currency: string;       // ISO 4217, e.g. "CNY" | "USD"
    purchase_date?: string; // ISO 日期字符串, e.g. "2025-05-08"
    notes?: string;
    created_at: string;     // ISO 时间戳
    updated_at: string;
}

// 分类类型
export interface Category {
    id: number;
    name: string;
    type: 'income' | 'expense' | 'transfer';
    parent_id?: number;
    created_at: string;
}

// 交易/账目类型
export interface Transaction {
    id: number;
    asset_id: number;
    category_id?: number;
    amount: number;              // 正数收入，负数支出
    occurred_at: string;         // ISO 时间戳
    description?: string;
    related_asset_id?: number;   // 转账时目标资产
    tags?: string[];
    created_at: string;
    updated_at: string;
}

// 可选：用户类型
export interface User {
    id: string;       // UUID
    email: string;
    password_hash: string;
    name?: string;
    created_at: string;
}