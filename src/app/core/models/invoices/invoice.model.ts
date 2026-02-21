export interface Invoice {
  id: string;
  client_id: string;
  invoice_number: string;
  amount: number;
  due_date: string;
  status: string;
  description: string;
  created_at: string;
  updated_at: string;
}
