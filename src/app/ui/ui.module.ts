import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserLoginComponent } from 'src/app/ui/user-login/user-login.component';
import { UserProfileComponent } from 'src/app/ui/user-profile/user-profile.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';

@NgModule({
  imports: [
    CommonModule, FormsModule
  ],
  declarations: [
    ArtistCardComponent,
    UserLoginComponent,
    UserProfileComponent
  ]
})
export class UiModule { }
