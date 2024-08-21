async function makeFetchRequest(e,t,l="POST"){try{let{userStatus:a,user_acde:o}=await new Promise(e=>{chrome.storage.local.get(["userStatus","user_acde"],function(t){e(t)})});if(!a||!o)return chrome.storage.local.clear(function(){}),"logout";t.user_acde=o,t.version=version;let s=await fetch(e,{method:l,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(t)});if(200!==s.status)throw Error("fail");let n=await s.json();return n}catch(r){throw console.log(r),r}}async function makeFetchRequestByPID(e,t,l="POST"){try{let{pid:a,user_acde:o}=await new Promise(e=>{chrome.storage.local.get(["pid","user_acde"],function(t){e(t)})});if(!a||!o)return chrome.storage.local.clear(function(){}),"logout";t.user_acde=o,t.version=version;let s=await fetch(e,{method:l,headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest"},body:JSON.stringify(t)});if(200!==s.status)throw Error("fail");let n=await s.json();return n}catch(r){throw console.log(r),r}}function debugLog(e){console.log("Voxels: "),console.log(e)}function handleErrors(e){if(e&&e.data&&e.data.error){switch(e.data.error){case"2001":showAlert("You've already added this location","error");break;case"2003":showAlert("You have to be ingame to add locations.","error");break;case"2006":showAlert("Currently only terravilla and farms can be added. More coming soon!","error");break;case"2007":break;case"2008":showAlert("This farm already exists at this location.","error");break;case"3006":showAlert("You have reached the maximum number of farms.","error");break;case"4006":showAlert("You have reached the maximum number of storages.","error");break;case"7001":showAlert("Too fast.","error");break;case"7002":showAlert("No new transaction found. Please retry in 10s","error");break;case"8001":displayInfo({title:"Update!",rows:[{text:"Voxels has received an update. Please reload this page."}]});break;case"8002":showAlert(e.data.text,"info");break;case"not_premium_playerpage":showPlayerPagePremium();break;default:showAlert(e.data.error,"error")}return loadingScreenFull(0),!0}return!1}function showAlert(e,t){var l=document.querySelector(".voxels-popup");l&&l.remove();var a=document.createElement("div");switch(a.className="voxels-popup",t){case"error":a.innerHTML+="<h3>Voxels Error:</h3><p>"+e+"</p>";break;case"info":a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>",a.classList.add("voxels-popup-info");break;case"success":a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>",a.classList.add("voxels-popup-success");break;default:a.innerHTML+="<h3>Voxels:</h3><p>"+e+"</p>"}var o=document.createElement("div");o.className="voxels-popup-close",o.innerHTML="X",a.appendChild(o),document.body.appendChild(a),o.addEventListener("click",function(){a.remove()}),setTimeout(function(){a.style.opacity="0",setTimeout(function(){a.remove()},1e3)},5e3)}function quickMessage(e,t){let l=3e3;"news"==t&&(l=6e3);var a=document.querySelector(".voxels-quick-message-popup");a&&a.remove();var o=document.createElement("div");o.className="voxels-quick-message-popup voxels-"+t,o.innerHTML='<p>Voxels:</p><p class="voxels-quick-info">'+e+'</p><div class="voxels-progress-bar"></div>',document.body.appendChild(o),o.querySelector(".voxels-progress-bar").style.animation="voxels-progressBarAnimation "+l/1e3+"s linear forwards",setTimeout(function(){o.style.animation="0.5s ease 0s 1 normal forwards running voxels-slideOut",setTimeout(function(){o.remove()},500)},l)}function convertArrayToObject(e){let t={};return e.forEach((e,l)=>{t[l]=e}),t}function reloadVoxels(){var e=document.querySelector(".voxels-main-container");e&&e.parentNode.removeChild(e),startLoad()}function nFormatter(e,t){let l=e<0;e=Math.abs(e);let a=[{value:1,symbol:""},{value:1e3,symbol:"K"},{value:1e6,symbol:"M"},{value:1e9,symbol:"G"},{value:1e12,symbol:"T"},{value:1e15,symbol:"P"},{value:1e18,symbol:"E"}].findLast(t=>e>=t.value),o=a?(e/a.value).toFixed(t).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/,"").concat(a.symbol):"0";return l&&(o="-"+o),o}function parseFormattedAmount(e){"string"!=typeof e&&(e=String(e));let t=e.match(/^([\d\.]+)([KMBT]?)$/);if(!t)return NaN;let l=parseFloat(t[1]),a=t[2];return Math.round(l*(({K:1e3,M:1e6,B:1e9,T:1e12})[a]||1))}function loadingScreen(e){let t=document.querySelector("#voxels-main-modal"),l=document.querySelector(".voxels-main"),a=document.createElement("div");if(a.id="voxels-loading-div",a.classList.add("voxels-loading"),1===e)a.innerHTML='<div class="voxels-loader"></div>',l.appendChild(a),t.style.filter="brightness(0.5)";else{let o=document.getElementById("voxels-loading-div");o&&l.removeChild(o),t.style.filter=""}}function loadingScreenFull(e){let t=document.querySelector("#voxels-full-page"),l=document.createElement("div");if(l.id="voxels-loading-div",l.classList.add("voxels-loading"),1===e)l.innerHTML='<div class="voxels-loader"></div>',t.appendChild(l),t.style.filter="brightness(0.5)";else{let a=document.getElementById("voxels-loading-div");a&&t.removeChild(a),t.style.filter=""}}let dragEl,dragHandleEl,dragging=!1;const lastPosition={};let dragBoundaries;function setupDraggable(){(dragHandleEl=document.querySelector("[data-drag-handle]")).addEventListener("mousedown",dragStart),document.addEventListener("mouseup",dragEnd)}function dragStart(e){0===e.button&&(dragging=!0,(dragEl=getDraggableAncestor(e.target)).style.setProperty("position","absolute"),lastPosition.left=e.target.clientX,lastPosition.top=e.target.clientY,dragHandleEl.classList.add("dragging"),document.addEventListener("mousemove",dragMove))}function dragMove(e){if(1!==e.buttons)return;let t=dragEl.getBoundingClientRect(),l=t.left+e.clientX-lastPosition.left,a=t.top+e.clientY-lastPosition.top,o=window.innerWidth-t.width,s=window.innerHeight-t.height,n=Math.max(0,Math.min(l,o)),r=Math.max(0,Math.min(a,s));dragEl.style.setProperty("left",`${n}px`),dragEl.style.setProperty("top",`${r}px`),lastPosition.left=e.clientX,lastPosition.top=e.clientY,window.getSelection().removeAllRanges(),(0===n||n===o||0===r||r===s)&&0===e.buttons&&dragEnd()}function getDraggableAncestor(e){return e.getAttribute("data-draggable")?e:getDraggableAncestor(e.parentElement)}function dragEnd(){if(dragging){dragHandleEl.classList.remove("dragging"),document.removeEventListener("mousemove",dragMove),dragEl=null,dragging=!1;var e=document.getElementById("voxels-main-modal"),t={};t.top=e.style.top,t.left=e.style.left,chrome.storage.local.set({modalPosition:t})}}function responsiveDraggableReset(){var e=document.getElementById("voxels-main-modal");window.innerWidth>540?(e.style.top="70px",e.style.left="20px"):(e.style.top="50%",e.style.left="50%")}function inputWithCallback(e,t){var l=document.createElement("div");l.className="voxels-popup-input",l.innerHTML="<h3>"+e+'</h3><input type="text" id="inputField"><button id="submitButton">OK</button>',l.classList.add("voxels-popup-info");var a=l.querySelector("#inputField");a.addEventListener("keydown",function(e){document.activeElement===a&&(e.stopPropagation(),"Enter"===e.key&&document.getElementById("submitButton").click())});var o=document.createElement("div");o.className="voxels-popup-close",o.innerHTML="X",l.appendChild(o),document.body.appendChild(l),o.addEventListener("click",function(){l.remove()}),document.getElementById("inputField").focus(),document.getElementById("submitButton").addEventListener("click",function(){var e=document.getElementById("inputField").value.trim();""===e?showAlert("Please enter some input.","error"):(t(e),l.remove())})}function limiter(e,t){let l=0;return function(...a){let o=Date.now();if(o-l>=t)return e(...a),l=o,!0;{let s=Math.round((t-(o-l))/1e3);return quickMessage("Please wait "+s+"s...","error"),!1}}}function voxelsConfirm(e,t){var l=document.createElement("div");l.classList.add("voxels-popup-storage","voxels-popup-info"),l.innerHTML="<h3>"+e+'</h3><button id="confirmButton">Yes</button>';var a=document.createElement("div");function o(){l.remove()}a.className="voxels-popup-close",a.innerHTML="X",l.appendChild(a),document.body.appendChild(l),a.addEventListener("click",o),document.getElementById("confirmButton").addEventListener("click",function(){t(!0),o()})}function openFullpage(){document.body.classList.contains("js-voxels-main-modal-active")&&document.body.classList.toggle("js-voxels-main-modal-active");let e=document.querySelector("#voxels-full-page");e.style.display="flex",fullPageActive=!0}function closeFullpage(){let e=document.querySelector("#voxels-full-page");e.style.display="none",fullPageActive=!1}function showFullOverlay(){let e=document.querySelector("#voxels-full-page-overlay");e.style.display="block"}function hideFullOverlay(){let e=document.querySelector("#voxels-full-page-overlay");e.style.display="none"}function toggleNotifications(){if(premium)return quickMessage("Nofications "+((notifications=!notifications)?"On":"Off"),"info"),chrome.storage.local.set({notifications:notifications}),!0}function toggleStorageHover(){return quickMessage("Storage Hover "+((displayStorageHover=!displayStorageHover)?"On":"Off"),"info"),chrome.storage.local.set({storageHover:displayStorageHover}),!0}function toggleTaskboardDisplay(){return quickMessage("Taskboard style: "+((taskboardTiles=!taskboardTiles)?"Minimal":"Detailed"),"info"),chrome.storage.local.set({taskboardTiles:taskboardTiles}),loadTasks(0),!0}function toggleVoxels(){voxelsDisplayed=!voxelsDisplayed;let e=document.body,t=document.querySelector("#voxels-main-nav"),l=document.querySelector("#voxels-toggle-voxels-button");return voxelsDisplayed?(t.style.display="flex",l.style.display="none",e.classList.add("js-voxels-main-modal-active")):(t.style.display="none",l.style.display="flex",e.classList.remove("js-voxels-main-modal-active")),chrome.storage.local.set({voxelsDisplayed:voxelsDisplayed}),!0}function initCustomSelect(){var e=document.querySelector(".voxels-custom-select-selected"),t=document.querySelector(".voxels-custom-select-items"),l=t.querySelectorAll("li");e.addEventListener("click",function(){t.classList.toggle("voxels-custom-select-hide"),e.classList.toggle("voxels-custom-select-arrow-active"),e.classList.toggle("voxels-custom-select-arrow-inactive")}),l.forEach(function(l){l.addEventListener("click",function(){e.textContent=this.textContent,e.setAttribute("data-select",this.textContent),t.classList.add("voxels-custom-select-hide"),e.classList.remove("voxels-custom-select-arrow-active"),e.classList.add("voxels-custom-select-arrow-inactive")})}),document.addEventListener("click",function(l){e.contains(l.target)||(t.classList.add("voxels-custom-select-hide"),e.classList.remove("voxels-custom-select-arrow-active"),e.classList.add("voxels-custom-select-arrow-inactive"))})}function toggleItems(e){e.currentTarget.closest(".voxels-playerpage-info-subsection").querySelectorAll(".voxels-playerpage-info-row").forEach((e,t)=>{e.classList.contains("js-visible")?e.classList.remove("js-visible"):setTimeout(()=>{e.classList.add("js-visible")},100*t)})}function loadPlayerPageTop(){openFullpage();var e=document.getElementById("voxels-full-page-main");e.innerHTML="";var t=document.createElement("div");t.setAttribute("id","voxels-player-home");var l=document.createElement("div");l.classList.add("voxels-player-top-row");var a=document.createElement("img");a.src=chrome.runtime.getURL("images/icons/icon__house.svg"),a.classList.add("voxels-player-home-icon","clickable"),a.onclick=function(){loadLeaderboardPage("overall")},l.appendChild(a);var o=document.createElement("div");o.classList.add("voxels-player-input-container");var s=document.createElement("input");s.setAttribute("type","text"),s.setAttribute("placeholder","Enter username, id or wallet..."),s.classList.add("voxels-player-input"),s.setAttribute("autocomplete","off");var n=document.createElement("button");n.setAttribute("id","playerSubmitButton"),n.innerHTML="&#8594;",n.classList.add("voxels-player-submit-button");let r=limiter(function(e){searchPlayer(e)},5e3);n.onclick=function(){s.value.length<=45?r(s.value):quickMessage("Please check your input","error")},s.addEventListener("keydown",function(e){document.activeElement===s&&(e.stopPropagation(),"Enter"===e.key&&document.getElementById("playerSubmitButton").click())}),o.appendChild(s),o.appendChild(n),l.appendChild(o),t.appendChild(l);var i=document.createElement("div");i.setAttribute("id","voxels-player-main-area"),i.classList.add("voxels-scroll"),t.appendChild(i),e.appendChild(t),switchFullPageNav("player")}function loadGuildPageTop(){var e=document.getElementById("voxels-full-page-main");e.innerHTML="";var t=document.createElement("div");t.setAttribute("id","voxels-guild-home");var l=document.createElement("div");l.classList.add("voxels-guild-top-row");var a=document.createElement("img");a.src=chrome.runtime.getURL("images/icons/icon__house.svg"),a.classList.add("voxels-guild-home-icon","clickable"),a.addEventListener("click",function(){loadGuildsPage()}),l.appendChild(a),t.appendChild(l);var o=document.createElement("div");o.setAttribute("id","voxels-guild-main-area"),o.classList.add("voxels-scroll"),t.appendChild(o),e.appendChild(t),switchFullPageNav("guilds")}function switchFullPageNav(e){let t=document.querySelectorAll(".voxels-full-nav-item");t.forEach(e=>{e.classList.remove("active")});let l=Array.from(t).find(t=>t.textContent.toLowerCase()===e);l&&l.classList.add("active"),activeFullPage=e}window.addEventListener("resize",function(){responsiveDraggableReset()},!0);let currentPricesList=[];function fetchItemListPrices(e){e.length>1&&chrome.storage.local.get("pid",async function(t){let l=t.pid;try{let a=await makeFetchRequestByPID(apiURL,{pid:l,operation:"retrieveItems",extra:e});currentPricesList=a.data}catch(o){reject(o)}})}