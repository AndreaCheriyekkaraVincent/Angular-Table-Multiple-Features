# Angular-Table-w-Multiple-Features
Angular Table with Multiple Features
# UserLogApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

##Feature implementation Brief explaination

1. The table is created using angular material MatTableModule.
2. The table receives the columns in a array which can be easily added or deleted as per requirement ex:displayedColumns: string[] = ['id','name', 'gender', 'dob', 'email'];and the data as Input is consumed in a variable of type MatTableDataSource.
3. The table is fetching the data from https://randomuser.me/api/ and https://fakestoreapi.com/ API in the service file and is displayed in the table at the component level using dependency injection.
4. The table supports sorting by clicking on column headers this is implemented using MatSortModule.
5. The table supports filtering by a search keyword entered by the user.
6. The table supports pagination to display a limited number of rows at a time using MatPaginatorModule.
7. The table allows users to edit and update data directly from the table by clicking on the edit button, a modal opens which can be customised according to the feilds and later post operation can be performed for the update operation using post http client , e.g., call the data service to update the user.
8. The table can work with different datasets and column configurations.
