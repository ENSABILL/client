import { Agency } from './agency.model';
import { CreancierType } from './creancierType.model';
import { Rechargetype } from './rechargetype.model';

export class Creancier {
  constructor(
    public id: string,
    public name: string,
    public type: CreancierType,
    public agency: Agency,
    public products?: string[],
    public rechargeTypes?: Rechargetype[]
  ) {}

  // public addService(product: string) {
  //   if (this.products) {
  //     this.products?.push(product);
  //   } else {
  //     this.products = [product];
  //   }
  // }
  // public addRechargeType(rechargeType: Rechargetype) {
  //   if (this.rechargeTypes) {
  //     this.rechargeTypes.push(rechargeType);
  //   } else {
  //     this.rechargeTypes = [rechargeType];
  //   }
  // }
}
