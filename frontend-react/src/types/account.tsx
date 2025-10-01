export interface Account {
  id: number;
  user_id: number;
  account_type: string;
  balance: number;
  currency: string;
  account_number: number;
}

export interface AccountCreateInput {
  account_type: string,
  currency: string,
  balance: number,
}
