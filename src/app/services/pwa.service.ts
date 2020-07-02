import { Injectable } from '@angular/core';

@Injectable()
export class PwaService {
  promptEvent:any;
  constructor() {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

}