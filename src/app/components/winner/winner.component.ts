import { Component, OnInit, Input } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Router } from '@angular/router';
import { Winner } from "../../services/utils.service";

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

 @Input('data')data:Winner;
  constructor(private game:GamelogicService, private router:Router) {
    this.data={
      level:'1',
      winnerAs:'Nivel Superado',
      acomplishment:'Acabas de romper todos los records de este nivel',
      points:0,
      record:0
    }
   }

  ngOnInit(): void {
  }

  nextWorld(){
    this.game.audio.playGameBackgroundMusic();
    this.game.nextWorld();
  }

  exitToMap(){
    this.game.audio.playHomeMusic();
    this.game.exitToMap();
    this.router.navigate(['/map']);
  }

}
