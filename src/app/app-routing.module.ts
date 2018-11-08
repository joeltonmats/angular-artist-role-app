import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { ArtistCardComponent } from 'src/app/ui/artist-card/artist-card.component';
import { UserLoginComponent } from 'src/app/ui/user-login/user-login.component';

const routes: Routes = [
    { path: '', component: ArtistCardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: UserLoginComponent },
    { path: 'artists', component: ArtistCardComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
