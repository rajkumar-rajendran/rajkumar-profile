import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent {
  @Input() endpoint = '';
  @Output() ask = new EventEmitter<string>();
  @ViewChild('scrollArea') scrollArea?: ElementRef<HTMLDivElement>;

  open = false;
  loading = false;
  draft = '';
  showSources = false;
  lastSources: string[] = [];
  messages: { role: 'user' | 'assistant'; content: string; ts: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggle(): void {
    this.open = !this.open;
    this.safeScrollToBottom();
  }

  openDrawer(): void {
    this.open = true;
    this.safeScrollToBottom();
  }

  close(): void {
    this.open = false;
  }

  reset(): void {
    this.messages = [];
    this.lastSources = [];
    this.showSources = false;
    this.loading = false;
    this.draft = '';
  }

  onSend(): void {
    const value = this.draft.trim();
    if (!value || this.loading) return;

    this.draft = '';
    this.ask.emit(value);
  }

  sendQuick(prompt: string): void {
    if (this.loading) return;
    this.ask.emit(prompt);
  }

  pushUser(content: string): void {
    this.messages.push({ role: 'user', content, ts: Date.now() });
    this.safeScrollToBottom();
  }

  pushAssistant(content: string): void {
    this.messages.push({ role: 'assistant', content, ts: Date.now() });
    this.safeScrollToBottom();
  }

  setLoading(value: boolean): void {
    this.loading = value;
    this.safeScrollToBottom();
  }

  setSources(sources: string[]): void {
    this.lastSources = sources ?? [];
  }

  formatTime(ts: number): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    return new Date(ts).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private safeScrollToBottom(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const el = this.scrollArea?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 0);
  }
}