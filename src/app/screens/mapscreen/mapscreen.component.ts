import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamelogicService } from '../../services/gamelogic.service';
import { worlds,RANKING_CLASSES } from '../../services/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mapscreen',
  templateUrl: './mapscreen.component.html',
  styleUrls: ['./mapscreen.component.css']
})
export class MapscreenComponent implements OnInit{
  displayableRankings: string[] = new Array(worlds.length).fill('');
  score: Observable<number>;
  overallRanking: number=0;
  worlds = worlds;
  
  constructor(private router:Router, private game:GamelogicService) {
    this.score = this.game.getScore();
   }

  ngOnInit(){
    if(!this.game.getUserName()){
      this.router.navigate(['/home']); 
      return;
    }
    this.displayableRankings=this.game.rankingsForEveryWorld.map(rank=>RANKING_CLASSES[rank]);
    console.log('Map ON INIT')
  }

  goToLevel(level:number){
    if(this.game.isLevelUnlocked(level)){
      this.game.audio.playclickMusic();
      this.game.setLevel(level);
      this.router.navigate(['/game']);
    }
  }

  isLocked(n:number){
    let returnValue = !this.game.isLevelUnlocked(n);
    return returnValue;
  }


  getScore(levelIndex:number):string{
    let result = this.game.getScoreFor(levelIndex);
    return result==0? null : result + 'pts' ;
  }

}