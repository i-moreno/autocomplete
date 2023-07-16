export interface Person {
  _id: string;
  name: string;
  lastName: string;
  accountId: string;
  balance: string;
}

export interface ListItem {
  _id: string;
  name: string;
}

export type SearchResponse = {
  item: Person;
  index: number;
}