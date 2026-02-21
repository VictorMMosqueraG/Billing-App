import { InvoiceSummary, ProcessRemindersResult } from "../../../../core/models/dashboard";

export interface DashboardState {
  summary: InvoiceSummary | null;
  remindersResult: ProcessRemindersResult | null;
  loadingSummary: boolean;
  processingReminders: boolean;
  error: string | null;
}
