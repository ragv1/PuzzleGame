import { Component } from '@angular/core';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent {
  canOpen:boolean=true;
  constructor(public Pwa: PwaService) {}
  
  installPwa(): void {
    this.Pwa.promptEvent.prompt();
    this.canOpen=false;
    this.close();
  }

  close(){
    this.Pwa.promptEvent=null;
  }
}
