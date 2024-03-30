import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  template: '',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

}


export function showErrorMessage(message: string) {
  Swal.fire({
    icon: 'error',
    width: '400px',
    title: message,
    customClass: {
      confirmButton: 'btn-ok',
      popup: 'popup-error',
    }
  });
}

export function showWarningMessage(message: string) {
  Swal.fire({
    icon: 'warning',
    title: message,
    customClass: {
      confirmButton: 'btn-ok',
      popup: 'popup-warning',
    }
  });
}
