import { Component } from '@angular/core';
import { IFacture } from 'src/app/profile/IFacture';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent {

  public paidInvoice:IFacture[]=[
    {
      id : 1,
      date_payement : "12/09/2021",
      montant_paye : 150,
      creditor: "RADEEMA"
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
      creditor: "maroc telecom"
    },
    {
      id : 4,
      date_payement : "12/10/2022",
      montant_paye : 180,
      creditor: "RADEEMA"
    },
    {
      id : 5,
      date_payement : "12/05/2021",
      montant_paye : 150,
      creditor: "RADEEMA"
    },
    {
      id : 6,
      date_payement : "12/03/2021",
      montant_paye : 150,
      creditor: "maroc telecom"
    }
  ];

}
