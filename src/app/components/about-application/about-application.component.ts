import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';
import { environment } from '../../../environments/environment.prod';
import { ChatService } from '../../chat.service';

@Component({
  selector: 'app-about-application',
  standalone: true,
  imports: [CommonModule, ChatWidgetComponent],
  templateUrl: './about-application.component.html',
  styleUrl: './about-application.component.css'
})
export class AboutApplicationComponent {

  apiUrl = `${environment.apiBaseUrl}/api/chat`;
  sessionId = '';

  @ViewChild('chatWidget') widget?: ChatWidgetComponent;

  openChat(): void {
    this.widget?.openDrawer();
  }

  constructor(
    private chat: ChatService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  handleAsk(prompt: string): void {
  if (!this.widget) return;

  this.widget.openDrawer();
  this.widget.pushUser(prompt);
  this.widget.setLoading(true);

  this.chat.chat(this.apiUrl, {
    message: prompt,
    sessionId: this.sessionId,
    history: []
  }).subscribe({
    next: (res) => {
      this.sessionId = res.sessionId;
      this.widget?.pushAssistant(res.answer);
      this.widget?.setSources(res.sources || []);
      this.widget?.setLoading(false);
    },
    error: (err) => {
      this.widget?.pushAssistant('Sorry — I hit an error talking to the server.');
      this.widget?.setLoading(false);
      console.error(err);
    }
  });
  }
}
