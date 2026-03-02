import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  ts: number;
}

export interface ChatResponse {
  sessionId: string;
  answer: string;
  sources: string[];
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {
   @Input() endpoint = 'http://localhost:8080/api/chat';
  @Output() ask = new EventEmitter<string>();

  open = false;
  loading = false;
  draft = '';
  showSources = false;

  messages: ChatMessage[] = [];
  lastSources: string[] = [];

  toggle() { this.open ? this.close() : this.openDrawer(); }
  openDrawer() { this.open = true; }
  close() { this.open = false; }

  reset() {
    this.messages = [];
    this.lastSources = [];
    this.showSources = false;
    this.draft = '';
  }

  sendQuick(q: string) {
    this.draft = q;
    this.onSend();
  }

  onSend() {
    const text = this.draft.trim();
    if (!text || this.loading) return;
    this.draft = '';
    this.showSources = false;
    this.ask.emit(text);
  }

  // Helper for nice timestamps
  formatTime(ts: number) {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    return `${hh}:${mm}`;
  }

  // Methods used by parent to update UI
  pushUser(text: string) {
    this.messages.push({ role: 'user', content: text, ts: Date.now() });
  }
  pushAssistant(text: string) {
    this.messages.push({ role: 'assistant', content: text, ts: Date.now() });
  }
  setLoading(v: boolean) { this.loading = v; }
  setSources(src: string[]) { this.lastSources = src ?? []; }

}
