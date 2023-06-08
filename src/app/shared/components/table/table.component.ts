import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MatTableModule, NgFor, NgClass],
})
export class TableComponent {
  @Input() displayedColumns: {
    name: string;
    value: string[];
    class?: string;
  }[] = [];
  @Input() dataSource: any[] = [];

  getDataValue(key: string[], element: any) {
    const val = key.reduce((prev, curr) => prev[curr], element);
    return val;
  }
 

  get displayedColumnKeys() {
    return ['select', ...this.displayedColumns.map((col) => col.name)];
  }
}
