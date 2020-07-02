import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamelogicService } from '../../services/gamelogic.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
  homeInputValue:string="Inserta tu Nombre";
  clicked: boolean;
  keytest:any;

  constructor(private router:Router,private game:GamelogicService) {
    this.clicked=false;
   }
  
   ngOnInit(): void {
    // this.game.audio.playHomeMusic();
  }

  clearName = () => {
    this.clicked = true;
    this.homeInputValue="";
  }

  setUserName(){
    // this.game.audio.playclickMusic();
    this.game.init(this.homeInputValue);
    this.goToMapScreen();
  
  } 
  
  isUserValid():boolean{
    return (this.homeInputValue && this.clicked) 
  }

  goToMapScreen(){
    if( this.isUserValid() ){
      this.router.navigate(['/map']);
    }
  }

  keyTest($event){
    console.log($event)
  }


}
