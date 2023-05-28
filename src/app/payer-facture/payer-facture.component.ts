import { Component } from '@angular/core';
import { IFacture } from '../profile/IFacture';

@Component({
  selector: 'app-payer-facture',
  templateUrl: './payer-facture.component.html',
  styleUrls: ['./payer-facture.component.css']
})
export class PayerFactureComponent {

  public creditor:string = 'assets/maroc_telecom.png';

  public unpaidInvoice:IFacture[]=[
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
      creditor: "RADEEMA"
    }
  ];

  public selectedInvoices: IFacture[]=[];
  public Total: number = 0;

  toggleSelection(facture: IFacture): void {
    const index = this.selectedInvoices.indexOf(facture);
    if (index > -1) {
      this.selectedInvoices.splice(index, 1); // Retirer le produit s'il est déjà sélectionné
    } else {
      this.selectedInvoices.push(facture); // Ajouter le produit s'il n'est pas déjà sélectionné
      this.Total+=facture.montant_paye;
    }
  }
  
 


}
