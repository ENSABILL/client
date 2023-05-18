import { Component } from '@angular/core';
import { CreancierService } from '../../services/creancier.service';

@Component({
  selector: 'app-creancierlist',
  templateUrl: './creancierlist.component.html',
  styleUrls: ['./creancierlist.component.css']
})
export class CreancierlistComponent {

  constructor(public creancierService: CreancierService){
    
  }
}
