import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // 1. Import your config

// 2. Pass appConfig as the second argument
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));