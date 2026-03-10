export class Playlist{

constructor(){
this.tracks=[]
this.currentIndex=-1
}

add(file){

const url=URL.createObjectURL(file)

const track={
name:file.name,
url:url,
cover:null
}

this.tracks.push(track)

this.readMetadata(file,track)

}

readMetadata(file,track){

window.jsmediatags.read(file,{

onSuccess:(tag)=>{

const pic=tag.tags.picture

if(pic){

let base64=""

for(let i=0;i<pic.data.length;i++){
base64+=String.fromCharCode(pic.data[i])
}

track.cover=`data:${pic.format};base64,${btoa(base64)}`

}

}

})

}

get(index){
this.currentIndex=index
return this.tracks[index]
}

next(){

this.currentIndex++

if(this.currentIndex>=this.tracks.length)
this.currentIndex=0

return this.tracks[this.currentIndex]

}

previous(){

this.currentIndex--

if(this.currentIndex<0)
this.currentIndex=this.tracks.length-1

return this.tracks[this.currentIndex]

}

}