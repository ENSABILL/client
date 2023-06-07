import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreancierService } from '../../services/creancier.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Subject, first, takeUntil } from 'rxjs';
import { Creancier } from '../../models/creancier.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-creancierlist',
  templateUrl: './creancierlist.component.html',
  styleUrls: ['./creancierlist.component.css'],
})
export class CreancierlistComponent implements OnInit, OnDestroy {
  selectedType: string = '';
  allCreanciers: Creancier[] = [];
  filteredCreanciers: Creancier[] = [];
  loading: boolean = false;
  unsubscribe$: Subject<void> = new Subject<void>();
  searchForm = new FormGroup({
    search: new FormControl('', []),
  });

  constructor(
    public creancierService: CreancierService,
    private alerrtService: AlertService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.creancierService
      .getAllCreanciers()
      .pipe(first())
      .subscribe({
        next: (creanciers) => {
          this.loading = false;
          this.allCreanciers = creanciers;
          this.filteredCreanciers = creanciers;
        },
        error: (err) => {
          this.loading = false;
          this.alerrtService.error(err);
        },
      });
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(takeUntil(this.unsubscribe$))
      .subscribe((searchValue) => {
        this.handleTypeAndSearchChange();
      });
  }

  handleTypeAndSearchChange() {
    const searchKeyword = this.searchForm.controls.search.value || '';
    this.filteredCreanciers = this.allCreanciers.filter(
      (creancier) =>
        (this.selectedType
          ? creancier.type === this.selectedType.toLocaleUpperCase()
          : true) &&
        (searchKeyword
          ? creancier.name
              .toLocaleLowerCase()
              .includes(searchKeyword.toLocaleLowerCase())
          : true)
    );
  }

  onSubmit() {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
