let queueToDraw=[];function initializeCanvas(){let e=document.querySelector("#game-container"),t=document.createElement("canvas");function i(){t.width=window.innerWidth,t.height=window.innerHeight}t.id="voxels-canvas",!function i(){e?e.appendChild(t):setTimeout(i,100)}(),i(),window.addEventListener("resize",i),!function e(){let i=t.getContext("2d");i&&(i.clearRect(0,0,t.width,t.height),queueToDraw.length>0&&(i.font='15px "Press Start 2P"',i.textAlign="center",i.textBaseline="middle",queueToDraw.sort((e,t)=>e.y-t.y),queueToDraw.forEach(({x:e,y:t,text:l,shape:r,shapeParams:o})=>{if(l){let n=i.measureText(l).width;i.fillStyle="rgba(64, 64, 64, 0.9)",i.beginPath(),i.roundRect(e-n/2-10,t-12-5,n+20,34,10),i.fill(),i.strokeStyle="#6626ff",i.lineWidth=3,i.beginPath(),i.roundRect(e-n/2-10,t-12-5,n+20,34,10),i.stroke(),i.fillStyle="#e3ff36",i.fillText(l,e,t)}else if(r){if(i.beginPath(),"circle"===r){let{radius:f}=o;i.arc(e,t,f,0,2*Math.PI)}else if("rect"===r){let{width:a,height:h}=o;i.rect(e,t,a,h)}if(i.fillStyle=o.fillColor||"#ffffff",i.fill(),i.strokeStyle=o.borderColor||"#000000",i.lineWidth=o.borderWidth||1,i.stroke(),o.text){i.font='10px "Press Start 2P"';let c=e+o.width/2,d=t+o.height/2;i.fillStyle="#e3ff36",i.fillText(o.text,c,d)}}}),queueToDraw=[]),requestAnimationFrame(e))}()}function entityOnScreen(e){if(cameraData&&"object"==typeof cameraData&&["left","right","top","bottom"].every(e=>e in cameraData)){let{left:t,right:i,top:l,bottom:r}=cameraData;if(e.x>=t&&e.x<=i&&e.y>=l&&e.y<=r)return!0}return!1}function calculateScreenCoords(e){let t=cameraData,i=(e.x-t.left)*t.zoom,l=(e.y-t.top)*t.zoom,r=(void 0!==e.width?e.width:0)*t.zoom,o=(void 0!==e.height?e.height:0)*t.zoom;return{screenX:i,screenY:l,screenWidth:r,screenHeight:o}}