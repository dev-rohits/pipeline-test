import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialListingComponent } from '../teacher/material-listing/material-listing.component';
import { CommonComponent } from './common.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: '/profile',
        component: ProfileComponent,
      },
      {
        path: '/teacher/material-listing',
        component: MaterialListingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
