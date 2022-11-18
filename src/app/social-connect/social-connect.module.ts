import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialConnectRoutingModule } from './social-connect-routing.module';
import { SocialConnectComponent } from './social-connect.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CommonModule2 } from '../common/common.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { StoriesComponent } from './stories/stories.component';
import { OnlineUsersComponent } from './online-users/online-users.component';


@NgModule({
  declarations: [
    SocialConnectComponent,
    CreatePostComponent,
    ViewPostComponent,
    StoriesComponent,
    OnlineUsersComponent
  ],
  imports: [
    CommonModule,
    SocialConnectRoutingModule,
    CommonModule2
  ]
})
export class SocialConnectModule { }
