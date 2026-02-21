export interface ProcessRemindersResult {
  total_processed: number;
  upgraded_to_second_reminder: number;
  upgraded_to_disabled: number;
  errors: string[];
}
