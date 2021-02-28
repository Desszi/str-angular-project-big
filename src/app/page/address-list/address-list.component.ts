import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'app/model/address';
import { Column } from 'app/model/column';
import { ConfigService } from 'app/service/config.service';
import { finalize } from 'rxjs/operators';
import { AddressesService } from '../../service/addresses.service';
import { CdkDragDrop, CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';



@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  dataSource: MatTableDataSource<Address> = new MatTableDataSource([]);
  loading: boolean = true;
  columns:Column[] = this.addressesService.columns;
  displayedColumns: string[] = [];
  previousIndex: number;
  filterType: MatTableFilter;
  filterEntity: Address;


  constructor(
    private addressesService: AddressesService,
    private config:ConfigService,
    private router: Router,
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit(): void {
    this.update();
    this.setDisplayedColumns();
    this.filterEntity = new Address();
    this.filterType = MatTableFilter.ANYWHERE;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  setDisplayedColumns() {
    this.columns.forEach(( colunm, index) => {
      colunm.index = index;
      this.displayedColumns[index] = colunm.name;
    });
  }

  onDelete(item: Address) {
    this.addressesService.remove(item).subscribe(i => {
      this.update();
    });
  }

  onEdit(item:Address):void{
    this.router.navigate(['/edit-address/' + item.id]);
  }

  update(): void { 
    this.loading = true;
    setTimeout(()=>{
      this.addressesService.getAll().pipe(
        finalize(() => this.loading = false)
      ).subscribe(
        items =>{ 
          
          
          this.dataSource = new MatTableDataSource(items);
          this.dataSource.sort = this.sort;
          this.setDisplayedColumns();
          }  )
    },this.config.updateDelayTimeMs);
  }
}
