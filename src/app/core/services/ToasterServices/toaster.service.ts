import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private readonly toastr: ToastrService) { }

  showError(message: string, title = 'ERROR'): void {
    const normalizedMessage = message?.trim() || 'Something went wrong. Please try again.';

    this.toastr.error(normalizedMessage, title, {
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      timeOut: 1000
    });
  }
}
