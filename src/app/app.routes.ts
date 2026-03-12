import { Routes } from '@angular/router';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { AboutApplicationComponent } from './components/about-application/about-application.component';

export const routes: Routes = [
{
    path: 'about-application',
    component: AboutApplicationComponent
},
{
    path: 'home',
    component: MainBodyComponent
},
{
    path: '**',
    redirectTo: 'home'
}
];
