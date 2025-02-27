let inventoryPending=!1;var displayInventoryPrice,currentFetchedInventory=[],inventoryModeTotal=!1,displayHoverInfo=!0,marketPrices=[];let sentInventory=null;function getMarketPrices(){chrome.storage.local.get("pid",async function(e){let t=e.pid;try{let n=await makeRequestToTools({pid:t,operation:"getMarketPrices"});if(!n||!n.data)return;marketPrices=n.data,loadInventoryPrices()}catch(r){console.log("Error retrieving lands")}})}function loadInventoryPrices(){let e=document.querySelectorAll(nodeNames.hudItems);if(settings.useNewInventory){if(e.length>0&&sentInventory){let t=6*sentInventory.activeRow,n=sentInventory.size,r=0;function i(e){return e>9999?nFormatter(e,1):e}sentInventory.items.forEach(function(o){hudSlot=(parseInt(o.slot,10)-t+n)%n,quantity=o.quantity;let l=marketPrices[itmCode=o.item];if(l&&l>0){let a=l*quantity;if(r+=a,inventoryModeTotal&&(l=a),hudElement=e[hudSlot]){let c=hudElement.querySelector(".Hud_shortcut__UvE3h");if(c){let s=parseInt(c.innerText,10)-1;if(s!==parseInt(o.slot,10))return}let d=hudElement.querySelector(".voxels-inventory-price");if(d){d.innerText=i(l);let y=document.createElement("img");inventoryModeTotal?y.src=chrome.runtime.getURL("images/Prices/coin_total.png"):y.src=chrome.runtime.getURL("images/Prices/coin.png"),d.appendChild(y)}else{var u=document.createElement("div");u.classList.add("voxels-inventory-price"),u.innerText=i(l);let v=document.createElement("img");inventoryModeTotal?v.src=chrome.runtime.getURL("images/Prices/coin_total.png"):v.src=chrome.runtime.getURL("images/Prices/coin.png"),u.appendChild(v),hudElement.appendChild(u)}}}});let o=document.querySelector(nodeNames.hudSliding);var l=document.querySelector(".voxels-inventory-total");l||(l=document.createElement("div")),l.classList.add("voxels-inventory-total"),l.innerText=i(r),inventoryValue=r;let a=document.createElement("img");if(a.src=chrome.runtime.getURL("images/Prices/coin_total.png"),l.appendChild(a),o.appendChild(l),!displayInventoryPrice){let c=document.querySelectorAll(".voxels-inventory-price");c.forEach(function(e){e.style.display="none"});let s=document.querySelector(".voxels-inventory-total");s&&(s.style.display="none")}}}else if(e.length>0&&!inventoryPending){let d=[],y=[];e.forEach(e=>{let t=e.querySelector(nodeNames.hudItemImage);if(t){if(t.complete){let n=calculateAverageColor(t);d.push(n),y.push(e)}else t.onload=function(){let n=calculateAverageColor(t);d.push(n),y.push(e)}}}),d.length>0&&(inventoryPending=!0,sendRequestByHash(d).then(e=>{setPricesInInventory(e,y),inventoryPending=!1}).catch(e=>{console.error(e),inventoryPending=!1}))}}function toggleInventoryStack(){return inventoryModeTotal=!inventoryModeTotal,loadInventoryPrices(),!0}function togglePrices(){displayInventoryPrice=!displayInventoryPrice;let e=document.querySelectorAll(".voxels-inventory-price");e.forEach(function(e){displayInventoryPrice?e.style.display="":e.style.display="none"});let t=document.querySelector(".voxels-inventory-total");return t&&(displayInventoryPrice?t.style.display="":t.style.display="none"),chrome.storage.local.set({displayInventoryPrice:displayInventoryPrice}),!0}function receiveInventory(e){if(e.source===window&&e.data.type&&"VOXELS_INV_DATA"===e.data.type){let t=e.data.data;checkAndUpdateInventory(t)}}window.addEventListener("message",receiveInventory);let currentInventory=[];function deepEqual(e,t){if(e===t)return!0;if("object"!=typeof e||"object"!=typeof t||null===e||null===t)return!1;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let i of n)if(!r.includes(i)||!deepEqual(e[i],t[i]))return!1;return!0}function checkAndUpdateInventory(e){deepEqual(e,currentInventory)||(currentInventory=e,addTaskQuantities())}function setPricesInInventory(e,t){let n=0;function r(e){return e>9999?nFormatter(e,1):e}e.forEach((e,i)=>{let o=t[i];if(null!==e.price.price){let l=o.querySelector(".voxels-inventory-price"),a=e.price.price,c=o.querySelector(nodeNames.hudQuantities).textContent,s=c&&c.length>1?parseInt(c.substring(1),10):1,d=a*s;if(n+=d,inventoryModeTotal&&(a=d),l){l.innerText=r(a);let y=document.createElement("img");inventoryModeTotal?y.src=chrome.runtime.getURL("images/Prices/coin_total.png"):y.src=chrome.runtime.getURL("images/Prices/coin.png"),l.appendChild(y),l.classList.add("voxels-blinking"),setTimeout(()=>{l.classList.remove("voxels-blinking")},500)}else{var u=document.createElement("div");u.classList.add("voxels-inventory-price"),u.innerText=r(a);let v=document.createElement("img");inventoryModeTotal?v.src=chrome.runtime.getURL("images/Prices/coin_total.png"):v.src=chrome.runtime.getURL("images/Prices/coin.png"),u.appendChild(v),o.appendChild(u),u.classList.add("voxels-blinking"),setTimeout(()=>{u.classList.remove("voxels-blinking")},500)}}});let i=document.querySelector(nodeNames.hudSliding);var o=document.querySelector(".voxels-inventory-total");o||(o=document.createElement("div")),o.classList.add("voxels-inventory-total"),o.innerText=r(n),inventoryValue=n;let l=document.createElement("img");if(l.src=chrome.runtime.getURL("images/Prices/coin_total.png"),o.appendChild(l),i.appendChild(o),!displayInventoryPrice){let a=document.querySelectorAll(".voxels-inventory-price");a.forEach(function(e){e.style.display="none"});let c=document.querySelector(".voxels-inventory-total");c&&(c.style.display="none")}}async function sendRequestByHash(e){return new Promise(async(t,n)=>{chrome.storage.local.get("user_info",async function(r){let i={name:r.user_info,operation:"fetchPricesByHash",extra:e};try{let o=await makeFetchRequest(apiURL,i),l=o.data,a=e.map((e,t)=>({averageColor:e,price:l[t]}));t(a)}catch(c){n(c)}})})}function calculateAverageColor(e){let t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.width,t.height=e.height,n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height).data,i=0,o=0,l=0;for(let a=0;a<r.length;a+=4)i+=r[a],o+=r[a+1],l+=r[a+2];let c=r.length/4,s=i/c,d=o/c,y=l/c,u=generateColorHash(s,d,y);return u}function calculateAverageBlueScore(e,t){let n=new Image;n.crossOrigin="Anonymous",n.src=e,n.onload=function(){let e=document.createElement("canvas"),r=e.getContext("2d");e.width=n.width,e.height=n.height,r.drawImage(n,0,0,n.width,n.height);let i=r.getImageData(0,0,n.width,n.height).data,o=0;for(let l=0;l<i.length;l+=4)o+=i[l+2];let a=i.length/4,c=o/a;t(c)},n.onerror=function(){t(!1)}}function generateColorHash(e,t,n){let r=`${Math.round(e)},${Math.round(t)},${Math.round(n)}`,i=0;for(let o=0;o<r.length;o++){let l=r.charCodeAt(o);i=(i<<5)-i+l}let a=(i>>>0).toString(16);return a}function observeTooltips(){let e=new MutationObserver(e=>{for(let t of e)"childList"===t.type&&(t.addedNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&"tooltip"===e.getAttribute("role")&&displayHoverInfo&&handleTooltip(e)}),premium&&t.removedNodes.forEach(e=>{e.nodeType!==Node.ELEMENT_NODE||"tooltip"!==e.getAttribute("role")||document.querySelector('[role="tooltip"]')||(currentItemHovered=null)}))});e.observe(document.body,{childList:!0,subtree:!0})}function handleTooltip(e){let t=e.querySelector(".ItemStyles_tooltipTitle____kIs");if(t){let n=t.textContent.trim(),r=getItmByName(n);if(null!==r){let i=e.querySelector(".MuiTooltip-tooltip");if(i){premium&&(currentItemHovered=r,itemHoverLoop());let o=findRecipe(r);if(null!==o){let l=i.querySelector(".voxels-tooltip-recipe-container");l&&l.remove();let a=createRecipeContainer(o);i.appendChild(a)}let c=historic_item_prices(r);if(c){let s=document.createElement("div");s.classList.add("voxels-networth-hover-graph-container");let d=document.createElement("div");d.classList.add("voxels-networth-hover-graph-header"),d.textContent="7-day Graph",s.appendChild(d);let y=[...c];if(marketPrices[r]){let u=marketPrices[r],v=Math.floor(Date.now()/1e3);y.push({t:v,p:u})}let p=renderPriceChart(y);s.appendChild(p),i.appendChild(s)}}}}}observeTooltips();