import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataService } from '../shared/data.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SharedService } from '../shared-service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';

import { UserListComponent, UserElement } from './user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let dataService: DataService;

  const mockDataService = {
    getUsers: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule
      ],
      declarations: [UserListComponent],
      providers: [
          { provide: DataService, useValue: mockDataService },
          LiveAnnouncer,
          SharedService,

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch users and populate the data source', () => {

      spyOn(dataService, 'getUsers').and.returnValue(
        of({results:[
          {
            id: 1,
            name: 'John Doe',
            gender: 'male',
            dob: '07.04.2022',
            email: 'a@gmail.com'
          },
          {
            id: 2,
            name: 'John Doe',
            gender: 'male',
            dob: '07.04.2022',
            email: 'a@gmail.com'
          },
        ]})
      );
  
      component.ngOnInit();
      expect(dataService.getUsers).toHaveBeenCalled();
      expect(component.users.length).toBe(2);
      expect(component.dataSource.data.length).toBe(2);
    });

    it('should filter users based on keyword', () => {
      const users: UserElement[] = [
        {
          id: 1,
          name: 'John Doe',
          gender: 'male',
          dob: '07.04.2022',
          email: 'a@gmail.com'
        },
        {
          id: 2,
          name: 'Johnie Bae',
          gender: 'female',
          dob: '07.04.2022',
          email: 'a@gmail.com'
        },
      ];
  
      component.users = users;
      component.dataSource.data = users;
  
      component.dataSource.filter = 'Doe';
  
      expect(component.dataSource.filteredData.length).toBe(1);
      expect(component.dataSource.filteredData[0]).toEqual(users[0]);
    });
});


