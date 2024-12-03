export type Order = {
  name: string;
  success: boolean;
  order: OrderNumber;
};

type OrderNumber = {
  number: number;
};
