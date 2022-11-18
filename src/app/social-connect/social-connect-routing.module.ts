import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialConnectComponent } from './social-connect.component';

const routes: Routes = [{ path: '', component: SocialConnectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialConnectRoutingModule {}
