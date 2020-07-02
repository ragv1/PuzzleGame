import { Component, OnInit, Input } from '@angular/core';
import { Winner, Looser } from '../../services/utils.service';
import { GamelogicService } from '../../services/gamelogic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-looser',
  templateUrl: './looser.component.html',
  styleUrls: ['./looser.component.css']
})
export class LooserComponent implements OnInit {
  @Input('data')data:Looser;
  constructor(private game:GamelogicService, private router:Router) {
    this.data={
      points:0,
      record:0
    }
   }

  ngOnInit(): void {
  }

  backToMap(){
    this.game.audio.playclickMusic();
    this.game.audio.playHomeMusic();
    this.router.navigate(['/map']);
  }

}
