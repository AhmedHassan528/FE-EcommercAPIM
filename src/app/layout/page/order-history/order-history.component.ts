import { Component } from '@angular/core';
import { IorderHostory } from '../../../core/Interfaces/iorder-history';
import { OrdersService } from '../../../core/services/OrdersServices/orders.service';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TermtextPipe } from '../../../core/Pipes/termtext.pipe';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-history',
  imports: [TranslateModule, CurrencyPipe, TermtextPipe, DatePipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent {
  // orders
  orders: IorderHostory[] = [];

  sessionId: string | null = null;

  getAtivatedSub!: any




  constructor(private _activatedRoute: ActivatedRoute, private _orders: OrdersService, private _toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAtivatedSub = this._activatedRoute.queryParamMap.subscribe({
      next: (params) => {
        this.sessionId = params.get('session_id');
        if (this.sessionId) {
          this.verifySession(this.sessionId);;
        }
      }
    });
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.getAtivatedSub?.unsubscribe();
  }


  // get orders
  getOrders(): void {
    this.getAtivatedSub = this._orders.getOrders().subscribe({
      next: (data) => {
        this.orders = data.sort((a: IorderHostory, b: IorderHostory) => {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        });
      }
    });
  }

  verifySession(id: string): void {
    this.getAtivatedSub = this._orders.verifySession(id).subscribe({
      next: (data) => {
        this.orders = data;
        this._toastrService.success("Thank You", "Success", {
          timeOut: 3000
        })
      }
    });
  }

}
