import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/app/services/utils.service';

@Component({
  selector: 'app-bestplayers',
  templateUrl: './bestplayers.component.html',
  styleUrls: ['./bestplayers.component.css']
})
export class BestplayersComponent implements OnInit {

  players:Observable<any>;
  showList:boolean=false;

  constructor(private db:ApiService) { }

  ngOnInit(): void {
    this.players = this.db.getPlayers().snapshotChanges()
    .pipe(
      map(firebaseElementArr=>{
        return firebaseElementArr
          .map(firebaseElement=>firebaseElement.payload.toJSON())
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