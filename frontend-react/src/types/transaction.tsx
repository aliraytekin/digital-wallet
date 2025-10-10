export interface Transaction {
  id: number;
  sender_account_id: number;
  receiver_accound_id: number;
  amount: number;
  status: "pending" | "completed" | "failed" | "flagged";
  suspicious: boolean;
  description?: string;
  created_at: string;
}

export interface TransactionCreateInput {
  sender_account_id: number;
  receiver_account_number: string;
  amount: number;
  description?: string;
}
