import { Invoice } from "../../../../core";

export interface InvoiceState {
  invoices: Invoice[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  saving: boolean;
  error: string | null;
  saved: boolean;
}
