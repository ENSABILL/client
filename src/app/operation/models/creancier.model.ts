import { Agence } from './agence.model';
import { Category } from './category.model';
import { Rechargetype } from './rechargetype.model';

export class Creancier {
  constructor(
    public id: string,
    public name: string,
    public category: Category,
    public agence: Agence,
    public services?: string[],
    public rechargeTypes?: Rechargetype[]
  ) {}

  public addService(service: string) {
    if (this.services) {
      this.services?.push(service);
    } else {
      this.services = [service];
    }
  }
  public addRechargeType(rechargeType: Rechargetype) {
    if (this.rechargeTypes) {
      this.rechargeTypes.push(rechargeType);
    } else {
      this.rechargeTypes = [rechargeType];
    }
  }
}
