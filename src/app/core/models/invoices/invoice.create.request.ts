export interface CreateInvoiceRequest {
  client_id: string;
  invoice_number: string;
  amount: number;
  due_date: string;
  description: string;
}
