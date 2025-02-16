export enum Status {
  Done = "done",
  Pending = "pending",
  Created = "created",
}

export const statuses = {
  [Status.Done]: "Выполнен",
  [Status.Pending]: "В работе",
  [Status.Created]: "Создан",
};
