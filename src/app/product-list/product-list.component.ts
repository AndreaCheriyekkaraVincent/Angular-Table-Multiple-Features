import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from '../modal-component/modal-component.component';
import { SharedService } from '../shared-service.service';
import { DataService } from '../shared/data.service';

export interface ProductElement {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'title', 'category', 'description', 'image','price'];
  dataSource: MatTableDataSource<ProductElement> = new MatTableDataSource<ProductElement>();

  constructor(private dataService: DataService, private _liveAnnouncer: LiveAnnouncer,private sharedService: SharedService,private dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: ProductElement[] = [];

  ngOnInit() {
    this.getProduct();
    this.sharedService.getStringValue().subscribe(filterValue => {
      this.dataSource.filter = filterValue;
    });
  }

  getProduct() {
    this.dataService.getProduct().subscribe(
       (response: any) => {
        response.forEach((result: any) => {
          const product = {
            id: result.id,
            category: result.category,
            description: result.description,
            image: result.image,
            price: result.price,
            title: result.title
          };
         this.products.push(product);
        });
        this.dataSource.data = this.products;
        this.dataSource.filterPredicate = (data: ProductElement, filter: string) => {
          const keyword = filter.trim().toLowerCase();
          return (
            data.category.toLowerCase().includes(keyword) ||
            data.description.toLowerCase().includes(keyword) ||
            data.image.toLowerCase().includes(keyword) ||
            data.title.toLowerCase().includes(keyword)
          );
        };
        this.dataSource.paginator = this.paginator;
       },
       (error: any) => {
         console.error('Error fetching users:', error);
       }
     );
   }
 
   announceSortChange(sort: Sort) {
    const data = this.products.slice(); 
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data; 
      this._liveAnnouncer.announce('Sorting cleared');
      return;
    }
      const sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'id':
            return this.compare(a.id, b.id, isAsc);
          case 'category':
            return this.compare(a.category, b.category, isAsc);
          case 'description':
            return this.compare(a.description, b.description, isAsc);
          case 'image':
            return this.compare(a.image, b.image, isAsc);
          case 'price':
            return this.compare(a.price, b.price, isAsc);
          case 'title':
            return this.compare(a.price, b.title, isAsc);
          default:
            return 0;
        }
      });
  
      this.dataSource.data = sortedData;
      const sortDirection = sort.direction === 'asc' ? 'ascending' : 'descending';
      this._liveAnnouncer.announce(`Sorted ${sortDirection}`);
    }

  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openEditModal(row: ProductElement) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { user: row },
      width: '400px',
      // Additional configuration options for the dialog
    });
  }
}
