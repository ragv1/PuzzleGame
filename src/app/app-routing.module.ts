import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomescreenComponent } from './screens/homescreen/homescreen.component';
import { MapscreenComponent } from "./screens/mapscreen/mapscreen.component";
import { GamescreenComponent } from './screens/gamescreen/gamescreen.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomescreenComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'game',
    component: GamescreenComponent
  },
  {
    path: 'map',
    component: MapscreenComponent
  },
  { path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
