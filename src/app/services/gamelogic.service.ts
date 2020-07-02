import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {  UtilsService,LUCKY,MEMORY,LONG_MEMORY, GAME_BASE_POINTS,Winner,LUCKY_STEPS, LUCKY_POINTS, 
          MEMORY_POINTS, BIG_MEMORY_POINTS,MEMORY_STEPS,LONG_MEMORY_STEPS, Looser,LEVEL_CONFIGURATION, 
          Player, DATA_NAME,RANKING, ACOMPLISHMENT, Sound, Level,worlds,RANKING_CLASSES,sumAll,START_WITH_CERO } 
from "./utils.service";
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class GamelogicService {
  public user = {name:"", email:''}
  public score: number=0;
  private level:number;
  public health:number=100;
  public ranking_titles: string[] = RANKING;
  private acomplishments:any[]=ACOMPLISHMENT;
  public _levelChannel:BehaviorSubject<number> = new BehaviorSubject(0);
  overallRanking: number=0;
  public rankingsForEveryWorld: number[]=[];
  private _scoreChannel:BehaviorSubject<number> = new BehaviorSubject(0);
  private _boardChannel:BehaviorSubject<any> = new BehaviorSubject({});
  private _winnerChannel:Subject<Winner> = new Subject();
  private _rewardChannel:Subject<string> = new Subject();
  private _healthChannel:Subject<number> = new Subject();
  private _looserChannel:Subject<Looser> = new Subject();
  private _rankingChannel:Subject<any> = new Subject();
  private posibilities:number[] = [];
  private levelsConfigurations:any[] = LEVEL_CONFIGURATION;
  currentStep: any;
  rows: any;
  cols: any;
  end: number;
  start: number;
  road: any[];
  color: string[];
  colorBoard: any[];
  win: boolean=false;
  game: any;
  maxStepGiven: number=0;
  failAt: boolean[]=[];
  testingDebug: boolean[];
  counter: number=0;
  healthLost: any;
  winnerData:Winner;
  lost: boolean=false;
  recordPointsForEachLevels:number=0;
  gameData: Player;
  ranking:number=0;
  audio:Sound = new Sound(
    "../../assets/audio/badMove.ogg",
    "../../assets/audio/goodMove.ogg",
    "../../assets/audio/homeMusic.mp3",
    "../../assets/audio/gameMusic.mp3",
    "../../assets/audio/winMusic.wav",
    "../../assets/audio/loseMusic.mp3",
    "../../assets/audio/menuMusic.mp3",
    "../../assets/audio/clickMusic.ogg"
    );
    
    constructor(private fn:UtilsService,  private db:DatabaseService) {}
    
  getWinner(){
    return this._winnerChannel.asObservable();
  }
  getScore(){
    return this._scoreChannel.asObservable();
  }
  getLevel(){
    return this._levelChannel.asObservable();
  }
  getBoardMessages(){
    return this._boardChannel.asObservable();
  }
  getRewards(){
    return this._rewardChannel.asObservable();
  }
  getHealthStatus(){
    return this._healthChannel.asObservable();
  }
  getLooser(){
    return this._looserChannel.asObservable();
  }

  getRankings(){
    return this._rankingChannel.asObservable();
  }

  setRankings(displayableRankings:number[]){
    this._rankingChannel.next(displayableRankings)
  }

  setLevel(level:number){
    this.level=level;
    let {rows,cols,start,end} = this.levelsConfigurations[this.level-1];
    this.start=start;
    this.end=end;
    this.rows=rows;
    this.cols=cols;
    this._levelChannel.next(this.level);
    this.setBoardConfig({ message:'configuration', data:{rows,cols} });
  }

  setBoardConfig(obj:any){
    this._boardChannel.next(obj);
  }

  setScore(number:number){
    this._scoreChannel.next(number);
  }

  setReward(msg:string){
    this._rewardChannel.next(msg);
  }

  setHealth(health:number){
    this._healthChannel.next(health);
  }

  setLooser(looser:Looser){
    this._looserChannel.next(looser);
  }


  mazeGenerator = (rows: number, cols: number, indexStart: number, indexEnd: number) => {
    let path = new Array(rows * cols).fill(0);
    let counter = 0;
    let stack = [];
    let road = [];
    let current = indexStart;
    path[current] = 1;
    while (current != indexEnd) {
      let neighbours = this.getNeighbours(current, rows, cols);
      let notVisited = neighbours.filter(x => path[x] != 1);
      if (notVisited.length > 0) {
        let next = notVisited[Math.floor(Math.random() * notVisited.length)];
        road.push(current);
        stack.push(current);
        current = next;
        path[current] = 1;
      } else if (stack.length > 0) {
        current = stack.pop()
        let i = road.findIndex(x => x == current);
        road.splice(i, 1);
      }
      counter++;
    }
    // console.log(`total count: ${counter}`);
    // console.log(`Path : ${path}`);
    // console.log(`Road : ${road}`);
    return road;
  }

  getNeighbours = (index, rows, cols) => {
    let neighbours = [index - cols, index + 1, index + cols, index - 1] //[TOP, RIGHT BOTTOM LEFT]

    let filteredNeighbours = neighbours.filter(neighbourIndex => {
      return (neighbourIndex > -1) && (neighbourIndex < (rows * cols))
    });
    if (index != 0 && index % cols == 0) {
      filteredNeighbours.pop();               // delete left neighbour 
    }
    else if ((index + 1) % cols == 0) {
      filteredNeighbours = filteredNeighbours.filter(x => x !== index + 1);   // delete the right neighbour
    }
    // return filteredNeighbours[Math.floor(Math.random()*filteredNeighbours.length)]
    return filteredNeighbours;
  }

  calculateLevel(score): string { // I dont think i will use this "Level schema"
    let result = '';
    switch (score) {
      case score == 0 && score < 300:
        result = this.ranking_titles[0]
        break;
      case score == 300 && score < 500:
        result = this.ranking_titles[1]
        break;
      case score == 500 && score < 600:
        result = this.ranking_titles[2]
        break;
      case score == 600 && score < 700:
        result = this.ranking_titles[3]
        break;
      case score == 700 && score < 1000:
        result = this.ranking_titles[4]
        break;
      case score >= 1000:
        result = this.ranking_titles[5]
        break;
      default:
        result = this.ranking_titles[0];
        break;
    }
    return result;
  }

  increaseTheScore(value?:number){
      let pointFromRoad = (this.road.length * GAME_BASE_POINTS * this.level);
      let pointFromHealth = (Math.round(this.health/this.healthLost) * GAME_BASE_POINTS * this.level );
      let levelPassedPoint = pointFromRoad + pointFromHealth;
    if(value){
      this.score+=value;
    }else{
      console.log(`
        Total Score: ${levelPassedPoint} (Rewards not counted)
          - Score from road : ${pointFromRoad}
          - Score from health: ${pointFromHealth}
      `)
      this.score+=levelPassedPoint;
    }
    this._scoreChannel.next(this.score)
  }

  ways = (cols, rows) => {
    const factorial = n => (n === 0) ? 1 : n * factorial(n - 1);
    return factorial(cols + rows - 2) / (factorial(cols - 1) * factorial(rows - 1))
  }

  init(username:string, email?:string){
    this.user.name = username;
    this.user.email = email? email : "";
    const defaultPlayer:Player = {
      username: this.user.name,
      email: this.user.email,
      accPoints: 0,
      levels: LEVEL_CONFIGURATION,
      date: new Date(Date.now()),
      rank: this.overallRanking,
      $key:''
    }
    let id = DATA_NAME+this.user.name.toLowerCase();
    this.gameData = this.db.create(id,defaultPlayer);
    this.instantiateRankings();
  }

  startTheMatch(){
    this.win=false;
    this.lost=false;
    this.currentStep = 0;
    this.maxStepGiven = 0;
    this.counter=0;
    this.score=0;
    this.health=100;
    this.recordPointsForEachLevels=0;
    if(!this.rows || !this.cols) return ;
    this.setScore(0);
    this.setHealth(this.health);
    this.road =  this.mazeGenerator(this.rows, this.cols, this.start, this.end);
    this.failAt = new Array(this.road.length).fill(false);
    this.posibilities = this.getPosibilities(this.road,this.cols,this.rows);
    this.healthLost = this.calcHealthLost(this.posibilities);
    this.ranking=0;console.log(this.road,'ROAD  ');
  }

  calcHealthLost(posibilities:number[]):number{
    let losses:number = posibilities.reduce((acc,current)=>acc+current,0);
    let quantOfHealth = Math.trunc(100/losses);
    quantOfHealth = 100%losses>0?quantOfHealth+1:quantOfHealth; //Over giving health
    return quantOfHealth;
  }

  getPosibilities(road,cols,rows){
    let posibilities = new Array(road.length).fill(0);
    const isTopRow = (index)=>{
      return index<cols;
    }
    const isBottomRow = (index)=>{
      return index>(rows*cols) -cols - 1;
    }
    const isFirstColumn = (index)=>{
      return index%cols==0;
    }
    const isLastColumn = (index)=>{
      return index%cols>cols-2;
    }
    for (let index = 0; index < road.length; index++) {
      let currentCell = road[index];
      if(isTopRow(currentCell) || isBottomRow(currentCell) || isFirstColumn(currentCell) || isLastColumn(currentCell)){
        posibilities[index] =1;
      }else{
        posibilities[index] =2;
      }
    }
    posibilities.unshift(1);
    return posibilities;
  }

  resetBoard(){
    this._boardChannel.next({message:"reset"});
  }

  nextWorld(){
    this._winnerChannel.next(null);
    this.resetBoard()
    this.setLevel(this.level+1);
    this.startTheMatch();
  }

  exitToMap(){
    //reset state
  }

  winTheMatch(){
    if (this.win) return;
    this.audio.playWinMusic();
    this.win=true;
    this.increaseTheScore();
    this.ranking = this.calcRanking();
    this.winnerData={
      level: ''+this.level,
      points: this.score,
      record: this.maxPosiblePoints(0.70),
      winnerAs: this.ranking_titles[this.ranking],
      acomplishment: this.getAcomplishment(),
    }
    this._winnerChannel.next(this.winnerData);
    this.save();
    this.updateRankings();
   
  }

  private updateRankings(){
    this.rankingsForEveryWorld = this.gameData.levels.map(level=>level.ranking);
    this.setRankings(this.rankingsForEveryWorld);
  }

  private maxPosiblePoints(porcentage:number){
    let maximumPosiblePoints = this.perfectGamePoints() + this.calcHealthPoints() ;
    return Math.trunc(porcentage * maximumPosiblePoints);
  }

  private save(){
    let oldScore = this.gameData.levels[this.level-1].score;
    if(oldScore<this.score){
      this.gameData.levels[this.level-1].score = this.score;
      this.gameData.levels[this.level-1].ranking = this.ranking;
    }
    let id =  DATA_NAME + this.user.name.toLowerCase();
    this.gameData.accPoints=this.totalScoreCalc(this.gameData.levels);
    this.db.update(id,this.gameData);
  }

  private totalScoreCalc(levels:Level[]){
    return levels.reduce((acc,current)=>{return acc+current.score},0)
  }

  getRankingFor(levelIndex:number):number{
    return this.gameData.levels[levelIndex]?.ranking;
  }

  instantiateRankings(){
    this.rankingsForEveryWorld = this.gameData.levels.map(level=>level.ranking);
    let sumOfRankings:number = this.rankingsForEveryWorld.reduce(sumAll,START_WITH_CERO);
    let numberOfRanking = this.rankingsForEveryWorld.length;
    let rankingAverage = numberOfRanking==0? 0 :  sumOfRankings / numberOfRanking;
    this.overallRanking = Math.round(rankingAverage);
    this.setRankings(this.rankingsForEveryWorld);
  }

  getUserName(){
    return this.user.name;
  }

  getScoreFor(levelIndex:number){
    return this.gameData?.levels[levelIndex]?.score;
  }

  isLevelUnlocked(level:number):boolean{
    if(level==1){
      return true;
    }else{
      return this.gameData?.levels[level-2]?.score>0
    }
  }

  makeMove(cellId):string{
    if (this.lost) return
    if((this.currentStep == this.road.length) && (cellId==this.end)){
      this.winTheMatch();
      return '';
    }
    if(this.road[this.currentStep]==cellId){
      let color = this.fn.rainbowGradient(this.currentStep);
      this.goodMove(this.currentStep);
      this.currentStep++;
      return color;
    }else{
      this.badMove(this.currentStep);
      return ''
    }
  }

  goodMove(currentStep){
    this.audio.playGoodMove();
    if( this.lucky(this.currentStep,this.maxStepGiven,this.failAt) ){
      this.maxStepGiven = currentStep;
      this.giveReward(LUCKY);
    }else if( (currentStep > 0 ) && ( currentStep % MEMORY_STEPS == 0 ) && ( currentStep > this.maxStepGiven )  ){
      this.maxStepGiven = currentStep>this.maxStepGiven?currentStep:this.maxStepGiven;
      this.giveReward(MEMORY);
    }else if((currentStep > 0 ) && ( currentStep % LONG_MEMORY_STEPS == 0 ) ){
      this.maxStepGiven = currentStep>this.maxStepGiven?currentStep:this.maxStepGiven;
      this.giveReward(LONG_MEMORY);
    }
  }
  
  badMove(currentStep){
    this.audio.playBadMove();
    this.counter=0;
    this.failAt[currentStep]=true;
    this.removeHealth();
    if(currentStep>this.maxStepGiven){
      this.maxStepGiven = (currentStep-1>0)? currentStep-1 : 0;
    }
    this.posibilities[currentStep] = (this.posibilities[currentStep] >0)? this.posibilities[currentStep]-1 : 0 ;
    this.currentStep=0;
    this.resetBoard();
  }

  removeHealth(){
    this.health-=this.healthLost;
    this.health= this.health<=0?0:this.health;
    this.setHealth(this.health);
    if(this.health<=0){  this.looser() }
  }

  looser(){
    this.audio.playLoseMusic();
    this.setLooser({points:this.score, record:this.perfectGamePoints()});
    this.score=0;
    this.setScore(0);
    this.lost=true;
    console.log("VAS A PERDER, QUIERES SEGUIR INTENTANDO");
  }

  giveReward(msg){
    let value;
    if(msg==LUCKY){
      value = LUCKY_POINTS;
    }else if(msg==MEMORY){
      value= MEMORY_POINTS;
    }else if(msg==LONG_MEMORY){
      value = BIG_MEMORY_POINTS;
    }
    this._rewardChannel.next(msg);
    this.increaseTheScore(value);
  }

  lucky = (cur,max, failedAt)=>{
    if(cur>max){
      if(failedAt[cur]){
        max=cur;
        return false
      }else{
        this.counter++;
        if(this.counter>=LUCKY_STEPS){
          this.counter =0;
          max=cur;
          return true
        }else{
          return false
        }
      }
    }
  }

  calcHealthPoints(){
    return Math.trunc(100/this.healthLost) * GAME_BASE_POINTS * this.level;
  }

  calcRanking(){
    let roadPoints = this.perfectGamePoints();
    let healthPoints = this.calcHealthPoints();
    let goal = roadPoints + healthPoints;
    console.log(
      `Score: ${this.score} 
      Base Points: ${roadPoints} Health points: ${healthPoints}
      level 1: ${goal*0.50} - ${goal*0.70}
      level 2: ${goal*0.70} - ${goal*0.80}
      level 3: ${goal*0.80} - ${goal*0.90 }
      level 4: > ${goal*0.90 } `
      );

    if(this.score >= goal*0.50 && this.score<= goal*0.70 ){
      return 1
    }else if(this.score >= goal*0.70 && this.score<= goal*0.80){
      return 2
    }else if(this.score >= goal*0.80 && this.score<= goal*0.90 ){
      return 3
    }else if(this.score > goal * 0.9  ){
      return 4
    }else{
      return 0
    }
  }
 
  calcLuckyPoints(road:any[]){
    return Math.round( road.length / LUCKY_STEPS ) * LUCKY_POINTS 
  }

  perfectGamePoints(){
    let memoryPoints = MEMORY_POINTS * Math.trunc(this.road.length/(MEMORY_STEPS + 1));
    let bigMemoryPoints = BIG_MEMORY_POINTS * Math.trunc(this.road.length/LONG_MEMORY_STEPS);
    let basePoints = this.road.length * GAME_BASE_POINTS * this.level; 
    let recordPoints = basePoints + memoryPoints + bigMemoryPoints;
    return recordPoints;
  }

  getAcomplishment(){//TODO: REPAIR ACOMPLISHMENTS
    let winnerTitle = this.ranking_titles[this.ranking];
    let result;
    this.acomplishments.forEach(acomp=>{
      if(acomp.level==winnerTitle){result =  acomp.description}
    });
    return result;
  }


}


