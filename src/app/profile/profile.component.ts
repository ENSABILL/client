import { Component } from '@angular/core';
import { IFacture } from './IFacture';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  public lName: string = 'Ahl Mbarek';
  public fName: string = 'Ghada';
  public email: string = 'ghadaahlmbarek@gmail.com';
  public solde: number = 2752;
  public image: string = 'assets/profile.PNG'

  public  historiques: IFacture[]= [
    {
      id : 1,
      date_payement : "12/09/2021",
      montant_paye : 150,
      creditor: "maroc telecom"
    },
    {
      id : 2,
      date_payement : "12/12/2022",
      montant_paye : 200,
      creditor: "maroc telecom"
    },
    {
      id : 3,
      date_payement : "12/10/2023",
      montant_paye : 300,
      creditor: "RADEEMA"
    },
    {
      id : 4,
      date_payement : "12/10/2022",
      montant_paye : 180,
      creditor: "maroc telecom"
    },
    {
      id : 5,
      date_payement : "12/05/2021",
      montant_paye : 150,
      creditor: "maroc telecom"
    },
    {
      id : 6,
      date_payement : "12/03/2021",
      montant_paye : 150,
      creditor: "RADEEMA"
    }
  ];

  public showList : boolean = false; 

  public showListFacture(): void{
    this.showList = !this.showList;
  }

}
