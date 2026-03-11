const canvas=document.getElementById("visualizer")
const ctx=canvas.getContext("2d")

canvas.width=800
canvas.height=200

const audioCtx=new AudioContext()

const analyser=audioCtx.createAnalyser()

const source=audioCtx.createMediaElementSource(player.audio)

source.connect(analyser)
analyser.connect(audioCtx.destination)

analyser.fftSize=256

const bufferLength=analyser.frequencyBinCount
const dataArray=new Uint8Array(bufferLength)

function draw(){

requestAnimationFrame(draw)

analyser.getByteFrequencyData(dataArray)

ctx.fillStyle="#000"
ctx.fillRect(0,0,canvas.width,canvas.height)

const barWidth=canvas.width/bufferLength

for(let i=0;i<bufferLength;i++){

const barHeight=dataArray[i]

const gradient=ctx.createLinearGradient(0,0,0,200)

gradient.addColorStop(0,"#4c4cff")
gradient.addColorStop(1,"#9a4cff")

ctx.fillStyle=gradient

ctx.fillRect(i*barWidth,200-barHeight,barWidth-1,barHeight)

}

}

draw()