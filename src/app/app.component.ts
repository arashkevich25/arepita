import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';
import { EditElementDialogComponent } from './edit-element-dialog/edit-element-dialog.component';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = [...ELEMENT_DATA];
  filterControl = new FormControl('');

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.filterControl.valueChanges.pipe(
      debounceTime(2000), 
      filter(item => item !== null)
    ).subscribe((value: string) => {
      this.applyFilter(value);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource = ELEMENT_DATA.filter(element =>
      element.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      element.symbol.toLowerCase().includes(filterValue.toLowerCase()) ||
      element.position.toString().includes(filterValue) ||
      element.weight.toString().includes(filterValue)
    );
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '250px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.map(el =>
          el.position === result.position ? result : el
        );
      }
    });
  }
}
