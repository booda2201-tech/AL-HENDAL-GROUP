import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/layout/main/main.component';
import { AuthenticationComponent } from './components/layout/authentication/authentication.component';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SustainabilityComponent } from './components/sustainability/sustainability.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrandDetailComponent } from './components/brand-details/brand-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      // المسار الجديد لصفحة تفاصيل الشركة
      {
        path: 'brand/:id',
        component: BrandDetailComponent,
        title: 'Brand Details - Al Hendal Group',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About Us - Al Hendal Group',
      },
      {
        path: 'Projects',
        component: ProjectsComponent,
        title: 'Our Brands - Projects',
      },
      {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact Us',
      },
      {
        path: 'sustainability',
        component: SustainabilityComponent,
        title: 'Sustainability - Al Hendal Group',
      },
    ],
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      // { path: 'login', component: LoginComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // لضمان العودة لأول الصفحة عند التنقل
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
