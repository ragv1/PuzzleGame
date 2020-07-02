import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demoslideshow',
  templateUrl: './demoslideshow.component.html',
  styleUrls: ['./demoslideshow.component.css']
})
export class DemoslideshowComponent implements OnInit {
  index:number[];
  speechBubble:boolean[];
  @Output('hide') hideDemo = new EventEmitter<boolean>();

  constructor() {
    this.speechBubble =[true,false,false];
   }

  ngOnInit(): void {
  }


  nextBubble(number:number){
    for (let i = 0; i < this.speechBubble.length; i++) {
      this.speechBubble[i] = (i==number)? true : false;
    }
  }

  exit(){
    this.hideDemo.emit(true);
  }


}
