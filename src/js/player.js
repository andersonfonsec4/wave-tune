export class Player{

constructor(audio){
this.audio=audio
}

play(){
this.audio.play()
}

pause(){
this.audio.pause()
}

toggle(){

if(this.audio.paused){
this.play()
}else{
this.pause()
}

}

setProgress(value){
this.audio.currentTime=value
}

}