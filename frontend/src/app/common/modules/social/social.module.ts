import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbLikeComponent } from './facebook/fb-like/fb-like.component';
import { FacebookModule } from 'ngx-facebook';
import { FacebookService } from './facebook/facebook.service';

@NgModule({
  declarations: [FbLikeComponent],
  providers: [FacebookService],
  imports: [CommonModule, FacebookModule.forRoot()],
  exports: [FbLikeComponent]
})
export class SocialModule {}
