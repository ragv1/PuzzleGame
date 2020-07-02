import { Component, OnInit } from '@angular/core';
import { GamelogicService } from 'src/app/services/gamelogic.service';
import { RANKING } from "../../services/utils.service";

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  username:string="";
  rank:string="";
  constructor(private game:GamelogicService) { }

  ngOnInit(): void {
    this.username=this.game.getUserName();
    this.rank = RANKING[this.game.overallRanking];
  }

}
