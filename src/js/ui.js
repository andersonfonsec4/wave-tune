export function renderPlaylist(playlist,element,handlers){

element.innerHTML=""

playlist.tracks.forEach((track,index)=>{

const item=document.createElement("div")

item.className="track"

if(index===playlist.currentIndex)
item.classList.add("active")

item.textContent=track.name

item.onclick=()=>handlers.play(index)

element.appendChild(item)

})

}

export function formatTime(time){

if(!time)return"0:00"

const m=Math.floor(time/60)
const s=Math.floor(time%60)

return`${m}:${s.toString().padStart(2,"0")}`

}