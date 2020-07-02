import { Injectable } from '@angular/core';
import { Player, Level} from './utils.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private api:ApiService) { }

  create(id:string, data:Player){
    const oldData = this.getItem(id);
    if(!oldData){
      let $key = this.api.createPlayer(data).key;
      data.$key = $key;
      this.setItem(id,data);
      return data;
    }
    return oldData;
  }
  read(id:string):Player{
    return this.getItem(id);
  }
  update(id:string, data:Player){
      console.log(`updating data id: ${id} data:`,data);
      this.api.updatePlayer(data);
      this.setItem(id,data);
  }
  delete(id:string){
    this.delItem(id);
  }
 
  private getItem(itemName:string):Player{
    return JSON.parse(localStorage.getItem(itemName));
  }
  private setItem(itemName:string , data:Player){
    localStorage.setItem(itemName,JSON.stringify(data));
  }
  private delItem(id:string){
    localStorage.removeItem(id);
  }
}
