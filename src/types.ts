export interface PaginatedResponse<T> {
  kind: "Listing";
  data: {
    after: string;
    children: T[];
  };
}
