import { Agency } from './agency.model';
import { CreancierType } from './creancierType.model';

export class Creancier {
  constructor(
    public id: string,
    public name: string,
    public type: CreancierType,
    public agency: Agency,
    public products?: string[],
  ) {}

}
