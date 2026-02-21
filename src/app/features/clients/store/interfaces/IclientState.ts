import { Client } from "../../../../core";

export interface ClientState {
  clients:  Client[];
  total:    number;
  page:     number;
  pageSize: number;
  loading:  boolean;
  saving:   boolean;
  error:    string | null;
  saved:    boolean;
}
