export class Order {
  constructor(
    public orderId?: string,
    public orderQte?: number,
    public productId?: string,
    public status?: OrderStatus
  ) {}
}

export enum OrderStatus {
  PENDING,
  PROCESSING,
  DELIVERED,
  CANCELED,
}
