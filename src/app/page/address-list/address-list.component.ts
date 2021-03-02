import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Address } from 'app/model/address';
import { Column } from 'app/model/column';
import { ConfigService } from 'app/service/config.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddressesService } from '../../service/addresses.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: Address[] = null;
  loading: boolean = true;
  columns: Column[] = this.addressesService.columns;
  phraseString: string = '';
  lastSelectedColumn: string = '';
  sortDir: string = ''
  displayedColumns: string[] = [];

  constructor(
    private addressesService: AddressesService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.update();

    this.columns.forEach((colunm, index) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.name;
    });

    console.log('displayedColumns',this.displayedColumns);
  }

  onDelete(item: Address) {
    this.addressesService.remove(item).subscribe(i => {
      this.update();
    });
  }

  onColumnSelect(colName: string): void {
    if (this.lastSelectedColumn != colName)
      this.columns.forEach(i => i.sortDir = '');
    this.lastSelectedColumn = colName;

    const state = this.addressesService.columns.find(i => i.name == colName);
    if (state.sortDir == '')
      state.sortDir = 'up';
    if (state.sortDir == 'none')
      state.sortDir = 'up'
    else if (state.sortDir == 'up')
      state.sortDir = 'down';
    else if (state.sortDir == 'down')
      state.sortDir = 'up'
    this.sortDir = state.sortDir;
  }

  onSearchPhrase(event: Event, colName: string): void {
    this.phraseString = (event.target as HTMLInputElement).value;
    this.lastSelectedColumn = colName;
  }

  update(): void {
    this.reset();
    this.loading = true;
    this.addressesService.getAll().pipe(
      finalize(() => { this.loading = false; })
    ).subscribe(() => { });

    const x = setTimeout(() => {
      clearTimeout(x);
      this.addressesService.getAll().subscribe(items => {
        this.addresses = items;
      })
    }, this.config.updateDelayTimeMs);
  }

  reset():void{
    this.columns.forEach(i => i.sortDir = '');
    this.phraseString = '';
    this.lastSelectedColumn = '';
    this.sortDir = ''
  }


  drop(event: /*CdkDragDrop<string[]>*/ Event) {
    console.log(event);
    //moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }
}
