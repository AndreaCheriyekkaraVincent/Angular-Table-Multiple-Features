import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponent {

  updateData() {
    // Perform the update operation using post http client , e.g., call the data service to update the user
  }
}
