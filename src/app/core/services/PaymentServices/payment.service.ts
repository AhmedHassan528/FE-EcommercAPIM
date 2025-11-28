import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise: Promise<any> | null = null;
  private stripePublishableKey = 'pk_test_51R23Ds4Fqtfdl7NOSKNRgJE4LEY4rGm84g8ISaZsLV1oUtLj308Wl3DfgiVhr77P4TddRC3Sh7rBtKHxkUpcdvYP00ZTofsFQk';
  private readonly _toastrService = inject(ToastrService);


  constructor(private http: HttpClient) {
  }

  getPublishableKey(): Observable<any> {
    return this.http.get(`${RouteUrl}/api/payment/publishable-key`)
  }

  createPaymentIntent(amount: number): Observable<any> {
    console.log('Creating PaymentIntent with amount:', amount);
    return this.http.post(`${RouteUrl}/api/payment/create-checkout-session`, { amount })
  }

  createPayment(cartId: number, addressId: number): Observable<any> {
    return this.http.post(`${RouteUrl}/api/Order/create`, {
      cartId,
      addressId,

    })
  }

  async initializeStripe(): Promise<any> {
    if (!this.stripePromise) {
      this.stripePromise = loadStripe(this.stripePublishableKey);
    }
    return this.stripePromise;
  }


}