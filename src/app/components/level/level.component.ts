import { Component } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent {
  $level:Observable<number>;

  constructor(private game:GamelogicService) {
    this.$level = this.game.getLevel();
  }

}
