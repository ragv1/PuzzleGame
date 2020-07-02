import { Component, Input } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-demoboard',
  templateUrl: './demoboard.component.html',
  styleUrls: ['./demoboard.component.css']
})
export class DemoboardComponent  {
  @Input('steps')
  steps:string[];
  @Input('rows')
  rows:number=3;
  columns:string=`repeat(${this.rows},1fr)`;

  constructor( private utilitys:UtilsService){
    this.steps = new Array(this.rows*this.rows);
    this.steps.fill('');
  }

}
