let currentItemHovered=null,storagesHighlighted=!0;function itemHoverLoop(){if(currentItemHovered&&cachedStorages&&storagesHighlighted){let e=cachedStorages.filter(e=>e.items.some(e=>e.itemName===currentItemHovered));e.forEach(e=>{let t=queueToDraw.findIndex(t=>t.id===e.mid),i=e.items.reduce((e,t)=>t.itemName===currentItemHovered?e+t.quantity:e,0),o={x:e.position.x,y:e.position.y,width:e.position.width,height:e.position.height};if(entityOnScreen(o)){let{screenX:r,screenY:d,screenWidth:h,screenHeight:m}=calculateScreenCoords(o),s={id:e.mid,x:r,y:d,shape:"rect",shapeParams:{width:h,height:m,fillColor:"rgba(34, 32, 68, 0.5)",borderColor:"#6626ff",borderWidth:2,text:`${nFormatter(i,1)}`}};t>=0?queueToDraw[t]=s:queueToDraw.push(s)}}),requestAnimationFrame(itemHoverLoop)}}