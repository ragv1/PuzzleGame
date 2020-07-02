import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-demoscreen',
  templateUrl: './demoscreen.component.html',
  styleUrls: ['./demoscreen.component.css']
})
export class DemoscreenComponent implements OnInit {
  handRows:number=3;
  handCols:number=3;
  boarNumRows:number=3;
  steps:string[];
  counter:number=0;
  index:number[]=[];
  @Output('hide') hideDemo = new EventEmitter<boolean>();
  
 constructor(private util:UtilsService){
  this.steps = new Array(this.boarNumRows*this.boarNumRows);
  this.steps.fill('');
  this.index=[0,1,2,5,8];
 }
 ngOnInit(){
   this.hideDemo.emit(false);
   this.animation();
 }
slideshowEventManager($event){
  this.hideDemo.emit(true);
}

animation(){
  let index = this.index[this.counter];
  if(this.counter<2){
    this.steps[index]=this.util.rainbowGradient(this.counter);

    setTimeout(() => {
      this.handCols+=2;
      this.counter++;
      this.animation();
    }, 1000);

  }else if(this.counter>=2 && this.counter<=4){
    
    this.steps[index]=this.util.rainbowGradient(this.counter);
    setTimeout(() => {
      this.counter++;
      this.handRows+=2
      this.animation();
    }, 1000);
  }else{
    this.counter=0;
    this.steps.fill('');
    this.handCols=3;
    this.handRows=3;
    this.animation();
  }
  
}



}
