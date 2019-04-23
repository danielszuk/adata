import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { CommonComponentsModule } from '../../components/common-components.module';

@NgModule({
  declarations: [AuthCallbackComponent],
  imports: [CommonModule, CommonComponentsModule]
})
export class AuthModule {}
