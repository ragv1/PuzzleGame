import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  factorial = n => (n === 0) ? 1 : n * this.factorial(n - 1);


  rainbowGradient = (gradientStep: number, startAtColor?: number) => {
    let repeatColorAfter = 52;
    gradientStep = startAtColor ? gradientStep + startAtColor : gradientStep;
    gradientStep = gradientStep % repeatColorAfter;
    let color = "";

    const rgbToHex = function (rgb) {
      let hex = Number(rgb).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      return hex;
    };

    const fullColorHex = function (r, g, b) {
      let red = rgbToHex(r);
      let green = rgbToHex(g);
      let blue = rgbToHex(b);
      return '#' + red + green + blue;
    };

    if (gradientStep < 10) {
      let stepWidth = 20; // how far away the numbers should be to produce different enough colors;
      let offset = 60
      color = fullColorHex(255, (gradientStep * stepWidth) + offset, 0); // From red to gold to orange to yellow, gradientStep goes up

    } else if (gradientStep >= 10 && gradientStep <= 14) {
      let stepWidth = 20;
      color = fullColorHex(255 - ((gradientStep - 10) * stepWidth), 255, 0); // From yellow-almoust-green to luminic green, gradientStep goes down

    } else if (gradientStep >= 15 && gradientStep <= 16) {
      let stepWidth = 41;
      color = fullColorHex(255 - ((gradientStep - 10) * stepWidth), 255, 0); // From yellow-almoust-green to luminic green, gradientStep goes down

    } else if (gradientStep >= 17 && gradientStep <= 21) {
      let stepWidth = 40;
      let offset = 60;
      color = fullColorHex(0, 255, offset + (gradientStep - 17) * stepWidth); // From luminic green to aqua blue , gradientStep goes up

    } else if (gradientStep >= 22 && gradientStep <= 32) {
      let stepWidth = 20;
      color = fullColorHex(0, 255 - ((gradientStep - 22) * stepWidth), 255); // From aqua blue to windows Blue , gradientStep goes down

    } else if (gradientStep >= 33 && gradientStep <= 42) {
      let stepWidth = 20
      let offset = 60;
      color = fullColorHex(offset + (gradientStep - 33) * stepWidth, 0, 255); // From windows blue to purple to purple-pink , gradientStep goes up

    } else {
      let stepWidth = 20
      let calculation = 255 - (gradientStep - 43) * stepWidth
      if (calculation < 0) { calculation = 0; }
      color = fullColorHex(255, 0, calculation); // From purple-pink to pink to redish , gradientStep goes down
    }
    return color;
  }

}

export const sumAll = (a?,b?) => a + b
export const START_WITH_CERO = 0;
export const RANKING_CLASSES = ['','star1','star2','star3','star4'];
export const LUCKY = 'LUCKY';
export const MEMORY = 'MEMORY';
export const LONG_MEMORY = 'LONG_MEMORY';
export const GAME_BASE_POINTS = 10;

export const LUCKY_STEPS = 3;
export const MEMORY_STEPS = 10;
export const LONG_MEMORY_STEPS = 39;

export const LUCKY_POINTS = 30;
export const MEMORY_POINTS = 40;
export const BIG_MEMORY_POINTS = 100;

export const DATA_NAME = "gameData";

export interface Winner {
  level: string;
  winnerAs: string;
  acomplishment: string;
  points: number;
  record: number;
}

export interface Looser {
  points: number;
  record: number;
}

export const LEVEL_CONFIGURATION: Level[] =
  [
    { levelNumber: 1, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
    { levelNumber: 2, rows: 5, cols: 5, start: 0, end: 24, score: 0 ,   ranking:0},
    { levelNumber: 3, rows: 6, cols: 6, start: 0, end: 35, score: 0 ,   ranking:0},
    { levelNumber: 4, rows: 7, cols: 7, start: 0, end: 48, score: 0 ,   ranking:0},
    { levelNumber: 5, rows: 8, cols: 8, start: 0, end: 63, score: 0 ,   ranking:0},
    { levelNumber: 6, rows: 8, cols: 8, start: 7, end: 56, score: 0 ,   ranking:0},
    { levelNumber: 7, rows: 7, cols: 7, start: 30, end: 0, score: 0 ,   ranking:0},
    { levelNumber: 8, rows: 7, cols: 7, start: 0, end: 48, score: 0 ,   ranking:0},
    { levelNumber: 9, rows: 7, cols: 7, start: 0, end: 48, score: 0 ,   ranking:0},
    { levelNumber: 10, rows: 10, cols: 10, start: 0, end: 99, score: 0, ranking:0},
  ];
  // export const LEVEL_CONFIGURATION_KIDS: Level[] =
  // [
  //   { levelNumber: 1, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
  //   { levelNumber: 2, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
  //   { levelNumber: 3, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
  //   { levelNumber: 4, rows: 4, cols: 4, start: 15, end: 0, score: 0 ,   ranking:0},
  //   { levelNumber: 5, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
  //   { levelNumber: 6, rows: 4, cols: 4, start: 2, end: 13, score: 0 ,   ranking:0},
  //   { levelNumber: 7, rows: 4, cols: 4, start: 14, end: 3, score: 0 ,   ranking:0},
  //   { levelNumber: 8, rows: 4, cols: 4, start: 0, end: 15, score: 0 ,   ranking:0},
  //   { levelNumber: 9, rows: 4, cols: 4, start: 15, end: 0, score: 0 ,   ranking:0},
  //   { levelNumber: 10, rows: 5, cols: 5, start: 3, end: 20, score: 0, ranking:0},
  // ];

export const RANKING = [
  'Novato',
  'Aprendiz',
  'Experto',
  'Master',
  'Sin Limite'
];

export const ACOMPLISHMENT = [
  {level:'Novato', description:'Has logrado pasar al siguiente nivel, sigue con la diversion'},
  {level:'Aprendiz', description:'Has logrado pasar al siguiente nivel, sigue con la diversion'},
  {level:'Experto', description:'Has roto el record de puntos en esta partida'},
  {level:'Master', description:'Acabas de romper todos los records de este nivel'},
  {level:'Sin Limite', description:'Tu juego esta a un nivel fuera de este mundo'}
];

export interface Level {
  levelNumber: number,
  rows: number,
  cols: number,
  start: number,
  end: number,
  score: number,
  ranking:number
}

export class Player{
  username: string;
  email: string;
  accPoints: number;
  levels: Level[];
  rank:number;
  date:Date;
  $key:string;
}

export class Sound {
  private badMove:HTMLAudioElement;
  private goodMove:HTMLAudioElement;
  private homeMusic:HTMLAudioElement;
  private gameMusic:HTMLAudioElement;
  private winMusic:HTMLAudioElement;
  private loseMusic:HTMLAudioElement;
  private menuMusic:HTMLAudioElement;
  private clickMusic: HTMLAudioElement;

  get isMusicPlaying():boolean{
    return this.musics()
      .map(audio=>{return !audio.muted || !audio.paused})
      .reduce((acc, current)=>{return acc||current},false)
  }

  get isSoundPlaying():boolean{
    return this.sounds()
    .map(audio=>!audio.muted || !audio.paused)
    .reduce((acc, current)=>{return acc||current},false)
  }
  
  constructor(
    badMove:string,
    goodMove:string,
    homeMusic:string,
    gameMusic:string,
    winMusic:string,
    loseMusic:string,
    menuMusic:string,
    clickMusic:string
  ){
      this.badMove    = new Audio(badMove); this.badMove.preload='0';
      this.goodMove   = new Audio(goodMove); this.goodMove.preload='0';
      this.homeMusic  = new Audio(homeMusic); this.homeMusic.preload='0';
      this.gameMusic  = new Audio(gameMusic); this.gameMusic.preload='0';
      this.winMusic   = new Audio(winMusic); this.winMusic.preload='0';
      this.loseMusic  = new Audio(loseMusic); this.loseMusic.preload='0';
      this.menuMusic  = new Audio(menuMusic); this.menuMusic.preload='0';
      this.clickMusic = new Audio(clickMusic); this.clickMusic.preload='0';
  }
  private sounds():HTMLAudioElement[]{
    return [this.badMove,this.goodMove]
  }
  private musics():HTMLAudioElement[]{
    return [this.homeMusic,this.gameMusic,this.winMusic,this.loseMusic,this.menuMusic]
  }
  private pauseAll(){
    [
      this.badMove, 
      this.goodMove, 
      this.homeMusic, 
      this.gameMusic, 
      this.winMusic, 
      this.loseMusic, 
      this.menuMusic
    ].forEach( audio => { audio.pause() })
  }

  playBadMove(){
    this.badMove.currentTime=0;
    this.badMove.volume=0.7;
    this.badMove.play();
  }
  playGoodMove(){
    this.goodMove.currentTime=0;
    this.goodMove.volume=0.1;
    this.goodMove.play();
  }
  playWinMusic(){
    this.pauseAll()
    this.winMusic.currentTime=0;
    this.winMusic.volume=0.2;
    this.winMusic.play();
  }
  playLoseMusic(){
    this.pauseAll()
    this.loseMusic.currentTime=0;
    this.loseMusic.play();
  }
  playGameBackgroundMusic(){
    this.musics().forEach(music=>music.pause());
    this.gameMusic.currentTime=0;
    this.gameMusic.volume=0.1;
    this.gameMusic.loop=true;
    this.gameMusic.play();
  }
  playHomeMusic(){
    this.musics().forEach(music=>music.pause());
    this.homeMusic.currentTime=0;
    this.homeMusic.volume=0.1;
    this.homeMusic.loop=true;
    this.homeMusic.play();
  }
  playMenuMusic(){
    this.musics().forEach(music=>music.pause());
    this.menuMusic.currentTime=0;
    this.menuMusic.volume=0.1;
    this.menuMusic.loop=true;
    this.menuMusic.play();
  }
  playclickMusic(){
    this.clickMusic.currentTime=0;
    this.clickMusic.play();
  }

  unMuteMusics(){
    this.musics().forEach(music=>music.muted=false);
  }
  unMuteSounds(){
    this.sounds().forEach(sound=>sound.muted=false);
  }
  muteMusics(){
    this.musics().forEach(music=>music.muted=true);
  }
  muteSounds(){
    this.sounds().forEach(sound=>sound.muted=true);
  }



}

export const worlds = [
  {starts:1,  number:1, color:"#ffc107"},
  {starts:1,  number:2, color:"#ffeb3b"},
  {starts:1,  number:3, color:"#cddc39"},
  {starts:1,  number:4, color:"#4caf50"},
  {starts:1,  number:5, color:"#3f51b5"},
  {starts:1,  number:6, color:"#673ab7"},
  {starts:1,  number:7, color:"#9c27b0"},
  {starts:1,  number:8, color:"#e91e63"},
  {starts:1,  number:9, color:"#f44336"},
  {starts:1,  number:10, color:"#607d8b"}
];