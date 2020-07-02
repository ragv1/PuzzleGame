import { Observable,Subscription } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestAPIService {

  constructor() { }

  getPlayers(){
    return db;
  }
  postPlayer(player:{accPoints:number,rank:string,username:string}){
    let index = db.findIndex(value=>{
      return value.username.toLowerCase() == player.username.toLowerCase();
    });
    if(index!=undefined){
      db[index].accPoints = player.accPoints;
      db[index].rank = player.rank;
    }else{
      db.push(player);
    }
  }
}

const db = [
  {
    accPoints: 7840,
    rank: "Novato",
    username: "Ceto Sadat"
  },
  {
    accPoints: 17840,
    rank: "Master",
    username: "Juan"
  }, {
    accPoints: 16840,
    rank: "Experto",
    username: "Pedro"
  }, {
    accPoints: 840,
    rank: "Principiante",
    username: "Ramon"
  }, {
    accPoints: 740,
    rank: "Principiante",
    username: "Marron"
  }, {
    accPoints: 7840,
    rank: "Experto",
    username: "Jose"
  }, {
    accPoints: 8840,
    rank: "Experto",
    username: "Adrianna"
  }, {
    accPoints: 9840,
    rank: "Experto",
    username: "Margo"
  }, {
    accPoints: 11400,
    rank: "Sin Limites",
    username: "Ryan"
  },
];
