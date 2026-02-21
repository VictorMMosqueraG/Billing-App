import { ClientStatus } from "./client.status";

export interface Client {
  id:             string;
  name:           string;
  email:          string;
  document_number: string;
  phone?:         string;
  status:         ClientStatus;
  createdAt:      string;
}
