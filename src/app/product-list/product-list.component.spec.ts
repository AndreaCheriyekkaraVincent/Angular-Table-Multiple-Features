import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DataService } from '../shared/data.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SharedService } from '../shared-service.service';

import { ProductListComponent, ProductElement } from './product-list.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let dataService: DataService;

  const mockDataService = {
    getProduct: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule
      ],
      providers: [
        { provide: DataService, useValue: mockDataService },
        LiveAnnouncer,
        SharedService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve products on initialization', () => {
    spyOn(dataService, 'getProduct').and.returnValue(
      of([
        {
          id: 1,
          category: 'Category 1',
          description: 'Product 1',
          image: 'image1.jpg',
          price: 10,
          title: 'Title 1',
        },
        {
          id: 2,
          category: 'Category 2',
          description: 'Product 2',
          image: 'image2.jpg',
          price: 20,
          title: 'Title 2',
        },
      ])
    );

    component.ngOnInit();

    expect(dataService.getProduct).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.dataSource.data.length).toBe(2);
  });

  it('should filter products based on keyword', () => {
    const products: ProductElement[] = [
      {
        id: 1,
        category: 'Category 1',
        description: 'Product 1',
        image: 'image1.jpg',
        price: 10,
        title: 'Title 1',
      },
      {
        id: 2,
        category: 'Category 2',
        description: 'Product 2',
        image: 'image2.jpg',
        price: 20,
        title: 'Title 2',
      },
    ];

    component.products = products;
    component.dataSource.data = products;

    component.dataSource.filter = 'Product 1';

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0]).toEqual(products[0]);
  });

});
