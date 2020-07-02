import { Component,OnInit, OnDestroy } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Subscription, Observable } from 'rxjs';
import { Winner, Looser, Player } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit, OnDestroy {
  winner:Winner;
  rewardMsg:string='';
  reward: boolean=false;
  subscriptions:Subscription[]=[];
  looser:Looser;
  showDemoComponent:boolean=true;
  score: Observable<number>;
  username:string;
  players:Player[]=[];

  constructor(private game:GamelogicService, private router:Router){
    this.score = this.game.getScore();
  }
  
  ngOnInit(){
    this.username=this.game.getUserName();
    if(!this.username){this.router.navigate(['/home']); return}
    // this.game.audio.playGameBackgroundMusic();
    this.game.startTheMatch();
    this.subscriptions.push(
      this.game.getRewards()
      .subscribe(
        msg=>{
          this.rewardMsg = msg;
          this.reward =true;
          setTimeout(() => {
            this.reward=false;
          }, 2000);
        },
        error=>{
          console.log(error);
        }
      ));
    this.subscriptions.push(
      this.game.getWinner().subscribe(
        d=>{
          this.winner=d;
        },
        e=>{console.log(e)})
     );
    this.subscriptions.push(
      this.game.getLooser().subscribe(
        d=>{
          this.looser=d;
        },
        e=>{console.log(e)})
     );
     this.subscriptions.push(
      this.game.getLevel().subscribe(
        d=>{
          if(d>1){this.showDemoComponent=false};
        },
        e=>{console.log(e)})
     );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscriber=>subscriber.unsubscribe());
  }

  hideDemo(hide:boolean){
    if(hide){this.showDemoComponent=false}
    console.log(`demoScreen Event ${hide}`);
  }
}
