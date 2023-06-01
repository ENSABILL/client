import { Component } from '@angular/core';
import { CreancierService } from '../../services/creancier.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ALertOptions } from 'src/app/shared/models/alert.model';

@Component({
  selector: 'app-creancierlist',
  templateUrl: './creancierlist.component.html',
  styleUrls: ['./creancierlist.component.css'],
})
export class CreancierlistComponent {
  selected: string = '';
  constructor(
    public creancierService: CreancierService,
    private alerrtService: AlertService
  ) {}
}
