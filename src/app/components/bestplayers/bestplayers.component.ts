import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RANKING } from 'src/app/services/utils.service';

@Component({
  selector: 'app-bestplayers',
  templateUrl: './bestplayers.component.html',
  styleUrls: ['./bestplayers.component.css']
})
export class BestplayersComponent implements OnInit {

  players:Observable<any>;
  showList:boolean=false;
  ranks:string[]=RANKING;

  constructor(private db:ApiService) { }

  ngOnInit(): void {
    this.players = this.db.getPlayers().snapshotChanges()
    .pipe(
      map(firebaseElementArr=>{
        return firebaseElementArr
        .map(firebaseElement=> firebaseElement.payload.toJSON())
        .sort(compareFn)
      })
    );
  }

  close(){
    this.showList=false;
  }

  open(){
    this.showList=true;
  }

}

const compareFn = (a, b) => {
  if (a.accPoints < b.accPoints)
    return 1;
  if (a.accPoints > b.accPoints)
    return -1;
  return 0;
};