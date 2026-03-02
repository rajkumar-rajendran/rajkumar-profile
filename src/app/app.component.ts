import { Component, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatWidgetComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

  sessionId = '';
  apiUrl = 'http://localhost:8080/api/chat';

  @ViewChild(ChatWidgetComponent) widget!: ChatWidgetComponent;

  constructor(private chat: ChatService) {}
  openChat() {
  this.widget.openDrawer();
}

  handleAsk(prompt: string) {
    // Update UI immediately
    this.widget.pushUser(prompt);
    this.widget.setLoading(true);

    this.chat.chat(this.apiUrl, {
      message: prompt,
      sessionId: this.sessionId,
      history: [] // later you can pass history if you want
    }).subscribe({
      next: (res) => {
        this.sessionId = res.sessionId;
        this.widget.pushAssistant(res.answer);
        this.widget.setSources(res.sources || []);
        this.widget.setLoading(false);
      },
      error: (err) => {
        this.widget.pushAssistant('Sorry — I hit an error talking to the server.');
        this.widget.setLoading(false);
        console.error(err);
      }
    });
  }
}