import { Component, OnInit, OnDestroy} from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lifebar',
  templateUrl: './lifebar.component.html',
  styleUrls: ['./lifebar.component.css']
})
export class LifebarComponent implements OnInit,OnDestroy{
  health:string;
  subscription:Subscription;
  constructor(private game:GamelogicService) { }

  ngOnInit(){
    this.subscription = this.game.getHealthStatus().subscribe(
      health=>this.health = this.formatHealth(health),
      error=>console.log(error)
    )
  }

  ngOnDestroy(){
    if(this.subscription){this.subscription.unsubscribe()}
  }

  formatHealth(value:number):string{
    return `${value}`+'%';
  }
}
