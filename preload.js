const {ipcRenderer}=require('electron')
let div=document.getElementById('container')
let text="";
ipcRenderer.on('status',(e,data)=>{
    text+=data+"\n";
    div.innerText=text
})
ipcRenderer.on('downloading',(e,progress)=>{
    text+=progress+"\n";
    div.innerText=text;
})