import { Injectable } from '@angular/core';
import { Creancier } from '../models/creancier.model';
import { Category } from '../models/category.model';
import { Agence } from '../models/agence.model';
import { Rechargetype } from '../models/rechargetype.model';

@Injectable({
  providedIn: 'root',
})
export class CreancierService {
  creanciers: Creancier[];
  constructor() {
    const iamAgence = new Agence(
      '1',
      'IAM',
      'https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-blanc-ar-grande.jpg'
    );
    const alcsAgence = new Agence(
      '2',
      'ALCS',
      'https://diriddik.ma/sites/default/files/images_association/ALCS%20Maroc.png'
    );

    const radeemaAgence = new Agence(
      '3',
      'RADEEMA',
      'https://www.radeema.ma/documents/20181/29122/logo'
    );
    const creancier1 = new Creancier(
      '1',
      'IAM RECHARGES',
      Category.RECHARGE,
      iamAgence,
      ['TELEPHONIE ET INTERNET SIM'],
      [
        new Rechargetype('1', 20),
        new Rechargetype('2', 100),
        new Rechargetype('3', 200),
        new Rechargetype('4', 500),
      ]
    );
    const creancier2 = new Creancier(
      '2',
      'IAM FACTURES',
      Category.FACTURE,
      iamAgence,
      ['PRODUIT INTERNET SIM', 'PRODUIT FIXE SIM', 'PRODUIT MOBILE SIM']
    );

    const creancier3 = new Creancier(
      '3',
      'ALCS DONATION',
      Category.DONATION,
      alcsAgence,
      ['Donation']
    );

    const creancier4 = new Creancier(
      '4',
      'RADEEMA FACTURES',
      Category.FACTURE,
      radeemaAgence,
      ["FACTURE D'EAU", "FACTURE D'ELECTRICITE"]
    );
    this.creanciers = [creancier1, creancier2, creancier3, creancier4];
  }
}
