import { Component,  Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GamelogicService } from 'src/app/services/gamelogic.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
  @Input('score')
  score:Observable<number>;
  constructor(private game:GamelogicService){
    this.game.setScore(this.game?.gameData?.accPoints||0);
  }
}
