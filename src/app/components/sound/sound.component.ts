import { Component, OnInit } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.css']
})
export class SoundComponent implements OnInit {
  isMusicOn:boolean=true;
  isSoundOn:boolean=true;
  constructor(private game:GamelogicService) { }

  ngOnInit(): void {
    this.game.audio.muteMusics();
    this.isMusicOn = false;
    this.isMusicOn = this.game.audio.isMusicPlaying;
    this.isSoundOn = this.game.audio.isSoundPlaying;
  }
  musicToggle(event){
    if(event.checked){
      this.game.audio.unMuteMusics();
    }else{
      this.game.audio.muteMusics();
    }
    console.log("music event",event)
  }
  soundToggle(event){
    if(event.checked){
      this.game.audio.unMuteSounds();
    }else{
      this.game.audio.muteSounds();
    }
    console.log("sound event",event)
  }
}
