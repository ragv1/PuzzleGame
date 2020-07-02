import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";
import { Player } from "./utils.service";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  playerList:AngularFireList<any>;
  constructor(private firebase:AngularFireDatabase) { 
    this.getPlayers();
  }

  getPlayers()
  {
    this.playerList = this.firebase.list("players");
    return this.playerList;
  }

  createPlayer(player:Player)
  {
    return this.playerList.push({
      username:player.username,
      accPoints:player.accPoints,
      rank:player.rank
    });
  }

  updatePlayer(player:Player)
  {
    this.playerList.update(player.$key,{
      username:player.username,
      accPoints:player.accPoints,
      rank:player.rank
    });
  }

}
