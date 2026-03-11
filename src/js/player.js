class Player {

constructor(){

this.audio = new Audio()
this.index = 0

this.audio.addEventListener("ended",()=>{

this.next()

})

}

load(index){

if(!playlist[index]) return

this.index = index

this.audio.src = playlist[index].file

this.audio.load()

}

play(){

this.audio.play().catch(()=>{})

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

next(){

if(playlist.length === 0) return

this.index++

if(this.index >= playlist.length){

this.index = 0

}

this.load(this.index)
this.play()

updateTitle()

}

prev(){

if(playlist.length === 0) return

this.index--

if(this.index < 0){

this.index = playlist.length - 1

}

this.load(this.index)
this.play()

updateTitle()

}

}

const player = new Player()