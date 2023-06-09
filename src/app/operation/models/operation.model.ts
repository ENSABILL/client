import { Creancier } from './creancier.model';

export class Operation {
  constructor(
    public id: string,
    public amount: number,
    public operationStatus: OperationStatus,
    public clientUsername: string,
    public clientId: string,
    public clientEmail: string,
    public service: Creancier,
    public operationTime: string | null
  ) {
    this.operationTime = new Date(this.operationTime || '').toLocaleString();
  }
}

export enum OperationStatus {
  PENDING,
  PAID,
  UNPAID,
}
