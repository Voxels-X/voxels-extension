function loadSettings(){var e=document.getElementById("voxels-full-page-main");e.innerHTML="";var t=document.createElement("div");t.setAttribute("id","voxels-setting-main");let n=limiter(toggleInventoryStack,1e4),o=[{id:"toggle-stack-value",text:"Toggle stack value",toggleFunction:n,initial:inventoryModeTotal?"ON":"OFF"},{id:"toggle-inventory-prices",text:"Toggle inventory prices",toggleFunction:togglePrices,initial:displayInventoryPrice?"ON":"OFF"}];function a(){o.forEach(function(e){var n=document.createElement("div");n.className="voxels-setting";var o=document.createElement("label");o.textContent=e.text,o.className="voxels-setting-label",n.appendChild(o);var a=document.createElement("button");a.textContent=e.initial,a.className="voxels-setting-toggle","OFF"===e.initial&&a.classList.add("js-is-inactive"),a.onclick=function(){let t;e.toggleFunction()&&(t="ON"===a.textContent?"OFF":"ON",a.textContent=t,a.classList.toggle("js-is-inactive"))},n.appendChild(a),t.appendChild(n)});var n=document.createElement("button");n.textContent="Hide Voxels",n.className="voxels-hide-button",n.onclick=function(){toggleVoxels()},t.appendChild(n);var a=document.createElement("button");a.textContent="Claim Shard Premium",a.className="voxels-settings-button";let i=limiter(function(){claimShardPremium()},5e3);a.addEventListener("click",i),t.appendChild(a);var l=document.createElement("button");l.textContent="Secure Voxels",l.className="voxels-settings-button";let s=limiter(function(){voxelsConfirm("\uD83D\uDEA8 If you continue your account authentication token will be visible. Make sure to keep this safe! And do not share with others! \uD83D\uDEA8<br><br>Continue?",function(e){e&&secureVoxelsAccount()})},5e3);l.addEventListener("click",s),t.appendChild(l),e.appendChild(t)}if(premium){let i=limiter(toggleTaskboardDisplay,1e4);chrome.storage.local.get(["notifications","storageHover","taskboardTiles"],function(e){o.push({id:"toggle-notifications",text:"Toggle notifications",toggleFunction:toggleNotifications,initial:e.notifications?"ON":"OFF"},{id:"toggle-storage-hover",text:"Toggle storage hover",toggleFunction:toggleStorageHover,initial:e.storageHover?"ON":"OFF"},{id:"toggle-taskboard-display",text:"Taskboard Fewer Details",toggleFunction:i,initial:e.taskboardTiles?"ON":"OFF"}),a()})}else a()}function claimShardPremium(){chrome.storage.local.get("pid",async function(e){let t=e.pid;loadingScreenFull(1);try{let n=await makeFetchRequestByPID(apiURL,{pid:t,operation:"redeemPremiumShard"});if(!handleErrors(n)){if("logout"==n)initiate();else{loadingScreenFull(0);let o=n.data.shards;quickMessage("You have successfully redeemed "+o+' shard(s). You can find your passes under "My Passes".',"success")}}}catch(a){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(a)}})}function secureVoxelsAccount(){chrome.storage.local.get("pid",async function(e){let t=e.pid;loadingScreenFull(1);try{let n=await makeFetchRequestByPID(apiURL,{pid:t,operation:"secureVoxelsAccount"});if(!handleErrors(n)){if("logout"==n)initiate();else{loadingScreenFull(0),showFullOverlay();let o=document.getElementById("voxels-full-overlay-main");o.innerHTML="";let a=document.createElement("div");if(a.setAttribute("id","voxels-auth-area"),a.classList.add("voxels-scroll"),n.data&&n.data.auth_code){let i=document.createElement("h2");i.textContent="\uD83D\uDEA8 DO NOT SHARE! \uD83D\uDEA8",a.appendChild(i);let l=document.createElement("div");l.innerHTML="The following code is your personal Voxels login code. From now on you cannot login with your username anymore, but only with the following code, which you can enter on any device to login to Voxels securely.<br><br><span>Make sure to save it somewhere safe, without it you won't be able to access your Voxels account!</span><br><br>Voxels Authentication code: <span>"+n.data.auth_code+"</span>",a.appendChild(l),chrome.storage.local.set({user_acde:n.data.auth_code})}else a.textContent="Couldn't authenticate your account. Please contact us on discord.";o.appendChild(a)}}}catch(s){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(s)}})}