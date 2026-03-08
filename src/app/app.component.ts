import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChatService } from './chat.service';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainBodyComponent } from './components/main-body/main-body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, HeaderComponent, FooterComponent, MainBodyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
}