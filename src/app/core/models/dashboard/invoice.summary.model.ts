import { ClientGroup } from "./invoice.group";
import { StatusGroup } from "./status.group";

export interface InvoiceSummary {
  total: number;
  total_amount: number;
  by_status: StatusGroup[];
  by_client: ClientGroup[];
}
