import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // CommonModule includes NgClass
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  animations: [
    trigger('slideToggle', [
      state('light', style({ transform: 'translateX(0)' })),
      state('dark', style({ transform: 'translateX(24px)' })), 
      transition('light <=> dark', [
        animate('0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isDark = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedTheme = localStorage.getItem('theme');
    this.isDark = savedTheme ? savedTheme === 'dark' : true;
    this.applyTheme();
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDark = !this.isDark;
    this.applyTheme();
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private applyTheme(): void {
    document.documentElement.classList.toggle('dark', this.isDark);
  }
}