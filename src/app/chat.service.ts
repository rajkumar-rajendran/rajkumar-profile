import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ChatRequest {
  message: string;
  sessionId?: string;
  history?: any[];
}

export interface ChatResponse {
  sessionId: string;
  answer: string;
  sources: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = `${environment.apiBaseUrl}/api/chat`;

  constructor(private http: HttpClient) {}

  chat(apiUrl: string, req: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, req);
  }
}