import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './core/services/FlowBite/flowbite-service.service';
import { NavBarComponent } from "./layout/additions/nav-bar/nav-bar.component";
import { FooterComponent } from "./layout/additions/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ChatComponent } from "./layout/additions/chat/chat.component";
import { pageTransition, fadeIn } from './shared/animations/animations';
import { AuthService } from './core/services/Auth-Service/auth.service';
import { MyTranslateService } from './core/services/TransslateServices/my-translate.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, NgxSpinnerComponent, ChatComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [pageTransition, fadeIn]
})
export class AppComponent {
  title = 'Ecommerce';

  constructor(private auth: AuthService, private _myTranslateService:MyTranslateService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.auth.checkAuth().subscribe();
    }

    this._myTranslateService.setLang();


  }
}
