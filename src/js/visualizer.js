export class Visualizer{

constructor(audio,canvas){

this.audio=audio
this.canvas=canvas

this.canvas.width=canvas.offsetWidth
this.canvas.height=canvas.offsetHeight

this.ctx=canvas.getContext("2d")

this.audioCtx=new AudioContext()

this.source=this.audioCtx.createMediaElementSource(audio)
this.analyser=this.audioCtx.createAnalyser()

this.source.connect(this.analyser)
this.analyser.connect(this.audioCtx.destination)

this.analyser.fftSize=128

this.bufferLength=this.analyser.frequencyBinCount
this.dataArray=new Uint8Array(this.bufferLength)

this.animate()

}

animate(){

requestAnimationFrame(()=>this.animate())

this.analyser.getByteFrequencyData(this.dataArray)

this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)

const barWidth=this.canvas.width/this.bufferLength

let x=0

for(let i=0;i<this.bufferLength;i++){

const h=this.dataArray[i]

this.ctx.fillStyle="#007bff"

this.ctx.fillRect(
x,
this.canvas.height-h/2,
barWidth-2,
h/2
)

x+=barWidth

}

}

}