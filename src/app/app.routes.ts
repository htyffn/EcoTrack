import { Routes } from '@angular/router';
import { WasteManagementComponent } from './components/waste-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'waste-management', pathMatch: 'full' },
  { path: 'waste-management', component: WasteManagementComponent }
];
