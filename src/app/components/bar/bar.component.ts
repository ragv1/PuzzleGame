import { Component, Input } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent {
  @Input('userName') 
    userName:string;
  @Input('displayExit') 
    displayExit:boolean=false;
  @Input('map') 
    map:boolean=false;
  userRole:string='Jugador:'
  constructor(private game:GamelogicService, private router: Router) {   }

  
  navigateBack(){
    this.game.audio.playclickMusic();
    this.game.audio.playHomeMusic();
    if(this.map){
      this.router.navigate(['/home']);
    }else{
      this.router.navigate(['/map']);
    }
  }
}
