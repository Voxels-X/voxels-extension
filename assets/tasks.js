let tasksPending=!1;function addTaskPrices(e){if(premium){let t=document.querySelectorAll(nodeNames.tasksCard);if(t.length>0&&!tasksPending){let s=[],i=[];t.forEach(e=>{if(!e.classList.contains(nodeNames.tasksTitle)){let t=e.querySelector(nodeNames.tasksTitle);if(t){let n=t.innerText;s.push(n),i.push(e)}}}),s.length>0&&(tasksPending=!0,sendRequestByName(s).then(t=>{addPricesToTasks(t,i,e),tasksPending=!1}).catch(e=>{console.error(e),tasksPending=!1}))}}}function addPricesToTasks(e,t,s){e.forEach((e,i)=>{let n=t[i];if(null!==e.price){var r;let a=n.querySelector(nodeNames.tasksQuantity),l=a?parseInt(a.innerText,10):1,c=e.price*l,o=(r=c)>9999?nFormatter(r,1):r,d=n.querySelector(s);if(d)d.innerHTML=`Total: <img src="${chrome.runtime.getURL("images/Prices/coin.png")}">${o}`;else{let g=n.querySelector(nodeNames.tasksTitle);if(g){let T=document.createElement("div");T.classList.add(s.replace(".","")),T.innerHTML=`Total: <img src="${chrome.runtime.getURL("images/Prices/coin.png")}">${o}`,g.parentNode.insertBefore(T,g.nextSibling)}}}})}