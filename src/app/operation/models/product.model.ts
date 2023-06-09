export class Product {
  constructor(
    public id?: string,
    public name?: string,
    public imageUrl?: string,
    public agencyName?: string,
    public description?: string,
    public qte?: number,
    public price?: number
  ) {}
}
