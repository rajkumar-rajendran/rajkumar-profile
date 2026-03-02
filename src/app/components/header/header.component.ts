import { Component, ViewChild } from '@angular/core';
import { ChatWidgetComponent } from '../chat-widget/chat-widget.component';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
@ViewChild(ChatWidgetComponent) widget!: ChatWidgetComponent;
    openChat() {
      if(this.widget !== undefined){ 
        console.log('Opening chat widget from header');
          this.widget.openDrawer();
      }
      else{
        console.warn('Chat widget not found in header component');
      }

}
}
