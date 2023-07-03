import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SharedService } from '../shared-service.service';
import { MatPaginator } from '@angular/material/paginator';

import { ModalComponent } from '../modal-component/modal-component.component';
import { MatDialog } from '@angular/material/dialog';

export interface UserElement {
  id: number,
  name: string,
  gender: string,
  dob: string,
  email: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['id','name', 'gender', 'dob', 'email'];
  
  dataSource: MatTableDataSource<UserElement> = new MatTableDataSource<UserElement>();

  users: UserElement[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService, private _liveAnnouncer: LiveAnnouncer,private sharedService: SharedService,private dialog: MatDialog){}

  ngOnInit() {
    this.getUsers();
    this.sharedService.getStringValue().subscribe(filterValue => {
    this.dataSource.filter = filterValue;
    });
  }

  getUsers() {
   this.dataService.getUsers().subscribe(
      (response: any) => {
        response.results.forEach((result: any) => {
          const user = {
            id: result.id.value,
            name: result.name.title + ' ' + result.name.first + ' ' + result.name.last,
            gender: result.gender,
            dob: result.dob.date,
            email: result.email
          };
  
          this.users.push(user);
        });
        this.dataSource.data = this.users;
        this.dataSource.filterPredicate = (data: UserElement, filter: string) => {
          const keyword = filter.trim().toLowerCase();
          return (
            data.name.toLowerCase().includes(keyword) ||
            data.gender.toLowerCase().includes(keyword) ||
            data.email.toLowerCase().includes(keyword)
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
    const data = this.users.slice(); 
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
          case 'name':
            return this.compare(a.name, b.name, isAsc);
          case 'gender':
            return this.compare(a.gender, b.gender, isAsc);
          case 'dob':
            return this.compare(a.dob, b.dob, isAsc);
          case 'email':
            return this.compare(a.email, b.email, isAsc);
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

  openEditModal(row: UserElement) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: { user: row },
      width: '400px',
      // Additional configuration options for the dialog
    });
  }
}
