import { Component, OnInit , Input} from '@angular/core';
import { IFacture } from '../profile/IFacture';

declare var window : any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  formModal:any;

  @Input()
  invoices:IFacture[]=[];
  @Input()
  total:number=0;

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  openModel(){
    this.formModal.show();
  }

  doSomething(){
    // ajouter la validation des transactions
    this.formModal.hide();
  }

  close(){
    this.formModal.hide();
  }


}
