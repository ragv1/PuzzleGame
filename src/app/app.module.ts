import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomescreenComponent } from './screens/homescreen/homescreen.component';
import { WinnerComponent } from './components/winner/winner.component';
import { BarComponent } from './components/bar/bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MapscreenComponent } from './screens/mapscreen/mapscreen.component';
import { UtilsService } from "./services/utils.service";
import { GamelogicService } from "./services/gamelogic.service";
import { GamescreenComponent } from './screens/gamescreen/gamescreen.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { ScoreComponent } from './components/score/score.component';
import { FormsModule } from '@angular/forms';
import { LifebarComponent } from './components/lifebar/lifebar.component';
import { RewardComponent } from './components/reward/reward.component';
import { LooserComponent } from './components/looser/looser.component';
import { LevelComponent } from './components/level/level.component';
import { SoundComponent } from './components/sound/sound.component';
import { DemoscreenComponent } from './screens/demoscreen/demoscreen.component';
import { DemoboardComponent } from './components/demoboard/demoboard.component';
import { DemoslideshowComponent } from './components/demoslideshow/demoslideshow.component';
import { DemohandComponent } from './components/demohand/demohand.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BestplayersComponent } from './components/bestplayers/bestplayers.component';
import { ExitComponent } from './components/exit/exit.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    WinnerComponent,
    BarComponent,
    MapscreenComponent,
    GamescreenComponent,
    GameboardComponent,
    ScoreComponent,
    LifebarComponent,
    RewardComponent,
    LooserComponent,
    LevelComponent,
    SoundComponent,
    DemoscreenComponent,
    DemoboardComponent,
    DemoslideshowComponent,
    DemohandComponent,
    BadgeComponent,
    BestplayersComponent,
    ExitComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  providers: [UtilsService,GamelogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
