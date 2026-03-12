import { Routes } from '@angular/router';
import { MainBodyComponent } from './components/main-body/main-body.component';
import { AboutApplicationComponent } from './components/about-application/about-application.component';

export const routes: Routes = [
{
    path: '',
    component: MainBodyComponent
},
{
    path: 'about-application',
    component: AboutApplicationComponent
},
{
    path: '**',
    redirectTo: 'MainBodyComponent'
}
];
