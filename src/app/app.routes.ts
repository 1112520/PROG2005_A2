import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageComponent } from './manage/manage.component';
import { SearchComponent } from './search/search.component';
import { PrivacyComponent } from './privacy/privacy.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
];