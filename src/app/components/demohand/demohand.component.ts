import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demohand',
  templateUrl: './demohand.component.html',
  styleUrls: ['./demohand.component.css']
})
export class DemohandComponent{
  @Input('rows')
  rows:number=0;
  @Input('cols')
  cols:number=0;
}
