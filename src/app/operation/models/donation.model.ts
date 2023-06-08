export class Donation {
  constructor(
    public id: number,
    public amount: number,
    public donor: string,
    public creancierId?: string
  ) {}
}
