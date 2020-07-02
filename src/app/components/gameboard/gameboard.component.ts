import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamelogicService } from '../../services/gamelogic.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit,OnDestroy {
  cssColumns:string;
  gameSubscription: Subscription;
  start;
  end;
  colorBoard=[];
  board: any[];
  
  
  constructor(private game:GamelogicService) { }
  
  ngOnInit(): void {
    if(this.gameSubscription){this.gameSubscription.unsubscribe()}
    this.gameSubscription = this.game.getBoardMessages()
    .subscribe(this.messageManager.bind(this),console.log.bind(this));
  }

  messageManager(channel:any){
    if(channel.message==="reset"){
      this.resetBoard()
    }
    else if (channel.message==="configuration"){ 
      this.configBoard(channel.data);
    }
  }

  resetBoard(){
    this.colorBoard=[]
  }

  configBoard(data){
    let arraysLength:number = data.rows*data.cols;
    if(isNaN(arraysLength)) return;
    this.setBoardLayout(data.cols);
    this.start=this.game.start;
    this.end=this.game.end;
    this.board = new Array(arraysLength).fill(0)
    this.colorBoard = new Array(arraysLength).fill('');
  }

  ngOnDestroy(){
    this.gameSubscription.unsubscribe();
  }
  
  cellClicked(cellId){
    this.colorBoard[cellId] = this.game.makeMove(cellId); 
  }

  setBoardLayout(columns){
    this.cssColumns = `repeat(${columns},1fr)`;
  }


}
