import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import RouteUrl from '../../../BaseUrl';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://api-mang-test.azure-api.net/gpt4o-mini/openai/deployments/gpt-4o-mini/chat/completions?api-version=2025-03-01-preview';
  private subscriptionKey = 'c2bcd19706014eda83e6e1b51155097a';

  constructor(private http: HttpClient) {}

  sendToAzureModel(history: any[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': this.subscriptionKey,
    });

    const body = {
      model: 'gpt-4o-mini',
      messages: history,
      max_tokens: 300,
      temperature: 0.7,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}