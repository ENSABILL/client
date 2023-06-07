import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-multi-select-table',
  templateUrl: './multi-select-table.component.html',
  styleUrls: ['./multi-select-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, NgFor],
})
export class MultiSelectTableComponent implements OnChanges {
  @Input() displayedColumns: { name: string; value: string[] }[] = [];
  @Input() data?: any;
  dataSource?: MatTableDataSource<any>;
  selection?: SelectionModel<any> = new SelectionModel<any>(true, []);
  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection?.clear();
      return;
    }

    if (this.dataSource?.data) {
      this.selection?.select(...this.dataSource.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${
      parseInt(row?.id) + 1
    }`;
  }

  getDataValue(key: string[], element: any) {
    const val = key.reduce((prev, curr) => prev[curr], element);
    return val;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data'].currentValue;
    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  get displayColumnKeys() {
    return ['select', ...this.displayedColumns.map((col) => col.name)];
  }
}
