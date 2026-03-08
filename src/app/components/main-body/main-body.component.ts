import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChatService } from '../../chat.service';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [ CommonModule, ChatWidgetComponent],
  templateUrl: './main-body.component.html',
  styleUrls: ['./main-body.component.css']
})
export class MainBodyComponent implements OnInit, OnDestroy {
  sessionId = '';
  apiUrl = 'http://localhost:8080/api/chat';

  @Output() imageClick = new EventEmitter<void>();

  onProfileImageClick(): void {
    this.imageClick.emit();
  }


  @ViewChild('chatWidget') widget?: ChatWidgetComponent;

  displayedRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;

  readonly roles = [
    'Backend Engineer',
    'Spring Boot Specialist',
    'Cloud-Native Builder',
    'Low-Latency Systems Developer'
  ];

  constructor(
    private chat: ChatService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    } else {
      this.displayedRole = this.roles[0];
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
    }
  }

  private startTypingEffect(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const currentText = this.roles[this.roleIndex];

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayedRole = currentText.substring(0, this.charIndex);

      if (this.charIndex === currentText.length) {
        this.isDeleting = true;
        this.typingTimer = setTimeout(() => this.startTypingEffect(), 1400);
        return;
      }

      this.typingTimer = setTimeout(() => this.startTypingEffect(), 65);
      return;
    }

    this.charIndex--;
    this.displayedRole = currentText.substring(0, this.charIndex);

    if (this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      this.typingTimer = setTimeout(() => this.startTypingEffect(), 250);
      return;
    }

    this.typingTimer = setTimeout(() => this.startTypingEffect(), 35);
  }

  openChat(): void {
    this.widget?.openDrawer();
  }

  

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
