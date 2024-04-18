function loadPremium(){let e=document.querySelector(".voxels-main");chrome.storage.local.get("user_info",async function(t){let a=t.user_info;loadingScreen(1);try{let r=await makeFetchRequest(apiURL,{name:a,operation:"getPremium"});handleErrors(r)||("logout"==r?initiate():(loadingScreen(0),reloadOverlay(),loadTitleSection("premium"),loadPremiumDiv(e,r.data,a),loadFeatureDiv(e)))}catch(n){console.error(n)}})}function loadPremiumDiv(e,t,a){var r=document.createElement("div");r.classList.add("voxels-main-premium","pixel-border","voxels-premium-main");var n=document.createElement("div");n.classList.add("voxels-premium-title"),n.innerText="VOXELS PREMIUM",r.appendChild(n);var i=document.createElement("div");i.classList.add("voxels-premium-content");let s=t.premium,l=t.wallet_address||!1;if(s){let o=new Date().getTime();if(1e3*t.premium_end>o){let d=loadPremiumEnd(t.premium_end);i.appendChild(d)}}let p=loadUserData(a,l);i.appendChild(p);let c=t.pixels_price,m=loadPrice(c);i.appendChild(m);var u=document.createElement("hr");u.classList.add("voxels-premium-spacer"),i.appendChild(u);let v=t.voxels_addresses;i.appendChild(loadPremiumHowTo(c,a,v)),(u=document.createElement("hr")).classList.add("voxels-premium-spacer"),i.appendChild(u);let h="";t.creator_code&&(h=t.creator_code),i.appendChild(loadCreatorCodeSection(h,a)),(u=document.createElement("hr")).classList.add("voxels-premium-spacer"),i.appendChild(u),i.appendChild(loadFAQ()),i.appendChild(loadHelp()),r.appendChild(i),"premium"==currentActiveTab&&e.appendChild(r)}function loadPremiumEnd(e){var t=document.createElement("div");t.classList.add("voxels-premium-end");var a=new Date(1e3*e).toLocaleString();return t.innerHTML="<p>Premium active:<br><span>Ends on "+a+"</span></p>",t}function loadUserData(e,t){var a=document.createElement("div");if(a.classList.add("voxels-premium-data"),a.innerHTML+="<p>Username: <span>"+e+"</span></p>",!1===t)a.innerHTML+="<p>Your wallet: <span>Not found</span></p>";else{var r=t.replace(/^(.{5})(.*)(.{5})$/,"$1...$3");a.innerHTML+="<p>Your wallet: <span>"+r+"</span></p>"}return a}function loadPrice(e){var t=document.createElement("div");return t.classList.add("voxels-premium-price"),t.innerHTML="<p>Premium (1 Month): <span><img class='pixels-icon' src='"+chrome.runtime.getURL("images/Other/Pixel.png")+"'>"+e+"</span></p>",t}function loadPremiumHowTo(e,t,a){var r=document.createElement("div");r.classList.add("voxels-premium-info"),r.innerHTML="<p>How to get Premium:</p><p><span>Send <img class='pixels-icon' src='"+chrome.runtime.getURL("images/Other/Pixel.png")+"'>"+e+" from your wallet connected to <span style='color: var(--main-new-bg);'>"+t+"</span> to:</span></p>";var n=document.createElement("p");n.classList.add("voxels-premium-copy"),n.setAttribute("id","voxels-copy"),n.setAttribute("translate","no"),n.innerHTML=a.rns+"<img src='"+chrome.runtime.getURL("images/icons/icon__copy.svg")+"' alt='Copy Icon'>",r.appendChild(n),n.addEventListener("click",function(){var e=document.createElement("textarea");e.value=a.rns,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e);var t=document.createElement("div");t.classList.add("voxels-hover-box"),t.textContent="Copied!",document.body.appendChild(t);var r=n.getBoundingClientRect();t.style.position="absolute",t.style.top=r.top-t.offsetHeight+"px",t.style.left=r.left+"px",setTimeout(function(){document.body.removeChild(t)},2e3)});var i=document.createElement("p");i.classList.add("voxels-premium-copy");let s=a.base.replace(/^(.{6})(.*)(.{6})$/,"$1...$3");i.innerHTML="<span>"+s+"</span>",r.appendChild(i);var l=document.createElement("p");l.innerHTML="<span>After sending $PIXEL click:</span>",r.appendChild(l);var o=document.createElement("p");o.classList.add("voxels-premium-reload"),o.innerHTML="Claim Premium<img src='"+chrome.runtime.getURL("images/icons/icon__refresh.svg")+"' alt='Refresh Icon'>",r.appendChild(o);var d=0;return o.addEventListener("click",function(){var e=Date.now();if(e-d<1e4){showAlert("Please wait 10s before retrying.","error");return}d=e,o.disabled=!0,setTimeout(function(){o.disabled=!1},1e4),checkPremium(t)}),r}function loadCreatorCodeSection(e,t){var a=document.createElement("div");a.classList.add("voxels-premium-code");var r=document.createElement("p");if(r.innerHTML="Creator code",a.appendChild(r),""==e){var n=document.createElement("div");n.classList.add("voxels-input-container");var i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("placeholder","Enter creator code"),n.appendChild(i),i.addEventListener("keydown",function(e){document.activeElement===i&&e.stopPropagation()});var s=document.createElement("button");s.textContent="Submit",s.addEventListener("click",function(){setCreatorCode(i.value,t)}),n.appendChild(s),a.appendChild(n)}else{var l=document.createElement("p");l.innerHTML="<span>Creator: "+e.code+"</span>",a.appendChild(l)}return a}async function setCreatorCode(e,t){try{let a=await makeFetchRequest(apiURL,{name:t,operation:"setCreatorCode",extra:e});handleErrors(a)||("logout"==a?initiate():setNewCode(e))}catch(r){console.error(r)}}function setNewCode(e){var t=document.querySelector(".voxels-premium-code"),a=t.querySelector(".voxels-input-container");a&&a.remove();var r=document.createElement("p");r.innerHTML="<span>Creator: "+e+"</span>",t.appendChild(r)}async function checkPremium(e){try{let t=await makeFetchRequest(apiURL,{name:e,operation:"checkPremium"});handleErrors(t)||("logout"==t?initiate():"paid"==t.data&&(showAlert("Successfully claimed Premium! Reload play.pixels.xyz","success"),reloadVoxels()))}catch(a){console.error(a)}}function loadFAQ(){var e=document.createElement("div");e.classList.add("voxels-premium-faq");var t=document.createElement("p");t.innerHTML="FAQ",e.appendChild(t);var a=[["How to renew Premium?",'Every time you send $PIXEL and click "Claim Premium" your Premium will be prolonged by another 30 days.'],["I sent $PIXEL but didn't receive premium?",'Check that your transaction has settled and click "Claim Premium". If you haven\'t received premium after 5 minutes contact us on <a href="https://discord.gg/jKnhzscVn3" target="_blank">Discord</a>'],["Why has the $PIXEL amount changed?","As the market situation can be rather volatile we aim to keep the premium price for Voxels stable."]],r=document.createElement("ol");for(let n=0;n<a.length;n++){var i=document.createElement("li"),t=a[n][0],s=a[n][1];i.appendChild(document.createTextNode(t));var l=document.createElement("span");l.innerHTML="<br>"+s,i.appendChild(l),r.appendChild(i)}return e.appendChild(r),e}function loadHelp(){var e=document.createElement("div");e.classList.add("voxels-premium-help");var t=document.createElement("a");t.href="https://discord.gg/jKnhzscVn3",t.target="_blank",t.innerHTML='<img src="'+chrome.runtime.getURL("images/icons/icon__discord.svg")+'" alt="Discord Icon">',e.appendChild(t);var a=document.createElement("a");return a.href="https://twitter.com/VoxelsExtension",a.target="_blank",a.innerHTML='<img src="'+chrome.runtime.getURL("images/icons/icon__X.svg")+'" alt="X Icon">',e.appendChild(a),e}function loadFeatureDiv(e){var t=document.createElement("div");t.classList.add("voxels-main-premium","pixel-border","voxels-premium-feature");var a=document.createElement("div");a.classList.add("voxels-premium-title"),a.innerText="Premium features",t.appendChild(a);var r=document.createElement("div");r.classList.add("voxels-premium-content");var n=[["50 Plots","Add up to 50 plots/locations to track farm timers (more timers coming soon: trees etc.).","timers.png"],["40 Storages","Track 40 storages and view their contents from anywhere!","storages.png"],["Auto-Detect collecting","Voxels automatically starts the timer for your farm (4 main farms: apiary, mine, coop, hutch). Make sure to add the location first."],["Total tasks cost","View the total cost of your task, if you would buy the items on the market place.","task_cost.png"],["Display tasks","Track your current tasks for Hazel from anywhere!","tasks_display.png"],["Discord Premium","Get a special premium role on the Voxels discord and take part in premium events!"],["Personal stats","Your personal Pixel statistics display","stats_personal.png"],["Graphs","Detailed graphs of the statistics","stats_graphs.png"],["Seasonal Voxels leaderboard","Compete with other Voxel Premium users for prizes","stats_leaderboard.png"],],i=document.createElement("ol");for(let s=0;s<n.length;s++){var l=document.createElement("li"),o=n[s][0],d=n[s][1],p=n[s][2];if(l.appendChild(document.createTextNode(o)),p){var c=document.createElement("img");c.src=chrome.runtime.getURL("images")+"/Premium/"+p,c.classList.add("voxels-premium-feature-image"),l.appendChild(c);var m=document.createElement("span");m.innerHTML=d,l.appendChild(m)}else{var m=document.createElement("span");m.innerHTML="<br>"+d,l.appendChild(m)}i.appendChild(l)}r.appendChild(i),t.appendChild(r),"premium"==currentActiveTab&&e.appendChild(t)}