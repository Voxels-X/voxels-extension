function loadGuildWar(){premium?loadGWSetup():displayPremium()}let isPollingStarted=!1;function loadGWSetup(){let e=document.querySelector(".voxels-main");var t=document.createElement("div");t.classList.add("voxels-main-gw");var a=document.createElement("div");a.classList.add("voxels-gw-header");var s=document.createElement("div");s.classList.add("voxels-gw-navigator");var l=document.createElement("div");l.classList.add("voxels-gw-nav-item","clickable"),l.textContent="Division";var i=document.createElement("div");i.classList.add("voxels-gw-nav-item","clickable"),i.textContent="Guild";var d=document.createElement("div");d.classList.add("voxels-nav-divider");var n=document.createElement("div");n.classList.add("voxels-gw-nav-item","clickable"),n.textContent="Stats";var r=d.cloneNode(!0);s.appendChild(l),s.appendChild(d),s.appendChild(i),s.appendChild(r),s.appendChild(n),a.appendChild(s),t.appendChild(a);var o=document.createElement("div");o.classList.add("voxels-gw-page"),t.appendChild(o),e.appendChild(t);let c=localStorage.getItem("voxels-gw-active-tab")||"division";function v(e){l.classList.remove("voxels-gw-active"),i.classList.remove("voxels-gw-active"),n.classList.remove("voxels-gw-active"),"division"===e?l.classList.add("voxels-gw-active"):"guild"===e?i.classList.add("voxels-gw-active"):"stats"===e&&n.classList.add("voxels-gw-active"),localStorage.setItem("voxels-gw-active-tab",e)}"division"===c?l.classList.add("voxels-gw-active"):"guild"===c?i.classList.add("voxels-gw-active"):"stats"===c&&n.classList.add("voxels-gw-active"),l.addEventListener("click",function(){loadGWPage("division"),v("division")}),i.addEventListener("click",function(){loadGWPage("guild"),v("guild")}),n.addEventListener("click",function(){loadGWPage("stats"),v("stats")}),isPollingStarted||(startGWStatsPolling(),isPollingStarted=!0),refreshGW(!0)}function refreshGW(e){chrome.storage.local.get("pid",async function(t){let a=t.pid;e&&loadingScreen(1);try{let s=await makeRequestToTools({pid:a,operation:"request_lb"});e&&loadingScreen(0);let l=document.querySelector(".voxels-gw-nav-item.voxels-gw-active");chrome.storage.local.set({gw_stats:s.data},function(){loadGWPage(l.textContent.toLowerCase())})}catch(i){}})}function startGWStatsPolling(){setInterval(()=>{document.querySelector(".voxels-gw-page")&&refreshGW(!1)},6e4)}function loadGWPage(e){chrome.storage.local.get(["gw_stats"],function(t){clearGWPage();let a=document.querySelector(".voxels-gw-page"),s=[45,39,34,30,27,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];switch(e){case"division":if(t.gw_stats&&t.gw_stats.division_leaderboard&&0!==t.gw_stats.division_leaderboard.length){let l=document.createElement("div");l.classList.add("voxels-gw-leaderboard-container"),t.gw_stats.division_leaderboard.forEach((e,t)=>{let a=document.createElement("div");a.classList.add("voxels-gw-leaderboard-entry");let i=document.createElement("div");i.classList.add("voxels-gw-rank"),i.textContent=t+1+".",a.appendChild(i);let d=document.createElement("div");d.classList.add("voxels-gw-username","clickable"),d.textContent=e.username,a.appendChild(d),d.addEventListener("click",function(){loadPlayerPageTop(),loadPlayerPage(e.pid)});let n=document.createElement("div");n.classList.add("voxels-gw-score");let r=e.score.toLocaleString();n.textContent=r,a.appendChild(n);let o=s[t]||1,c=document.createElement("div");c.classList.add("voxels-gw-seasonal-points"),c.textContent=`+${o}`,a.appendChild(c),l.appendChild(a)}),a.appendChild(l)}else{let i=document.createElement("div");i.classList.add("voxels-gw-info"),i.innerHTML="Division leaderboard is loading...<br>Check your current leaderboard at: ";let d=document.createElement("a");d.href="https://dashboard.pixels.xyz/leaderboards/ldb_guildwars_season1_individual_overall_weekly",d.textContent="dashboard.pixels.xyz",d.target="_blank",i.appendChild(d),i.innerHTML+="<br>You can find links to your seasonal and weekly division in the stats tab.",a.appendChild(i)}break;case"guild":if(t.gw_stats&&t.gw_stats.guild_leaderboard&&0!==t.gw_stats.guild_leaderboard.length){let n=document.createElement("div");n.classList.add("voxels-gw-leaderboard-container"),t.gw_stats.guild_leaderboard.forEach((e,t)=>{let a=document.createElement("div");a.classList.add("voxels-gw-leaderboard-entry");let l=document.createElement("div");l.classList.add("voxels-gw-rank"),l.textContent=t+1+".",a.appendChild(l);let i=document.createElement("div");i.classList.add("voxels-gw-username"),i.textContent=e.guild,a.appendChild(i);let d=document.createElement("div");d.classList.add("voxels-gw-score");let r=e.score.toLocaleString();d.textContent=r,a.appendChild(d);let o=s[t]||1,c=document.createElement("div");c.classList.add("voxels-gw-seasonal-points"),c.textContent=`+${o}`,a.appendChild(c),n.appendChild(a)}),a.appendChild(n)}else{let r=document.createElement("div");r.classList.add("voxels-gw-info"),r.textContent="Guild is loading... Please come back later.",a.appendChild(r)}break;case"stats":let o=document.createElement("div");o.classList.add("voxels-gw-stats-container");let c=document.createElement("div");c.classList.add("voxels-gw-stats-details");let v=document.createElement("div");v.classList.add("voxels-gw-stats-title"),v.textContent="Weekly Stats",c.appendChild(v);let p=(()=>{let e=new Date,t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()));t.setUTCDate(t.getUTCDate()+4-(t.getUTCDay()||7));let a=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-a)/864e5+1)/7)+3})();function g(e,t){let a=document.createElement("div");a.classList.add("voxels-gw-stats-details-balances"),a.innerHTML=`<img src="${chrome.runtime.getURL(`images/GW/${e}.png`)}"><div>${t}</div>`,c.appendChild(a)}c.innerHTML+=`<div>Week: <span>${p}</span></div>`,g("guild_runes",guildRunes);let $=document.createElement("div");$.classList.add("voxels-gw-stats-details-timer","voxels-gw-stats-details-80"),c.appendChild($);let x=e=>{let t=new Date,a=t.getUTCDay(),s=60*t.getUTCHours()+t.getUTCMinutes(),l=t.getSeconds(),i=1/0,d=!1;if(e.forEach(({day:e,startTimesUTC:t,durationMinutes:n})=>{let r=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(e);t.forEach(e=>{let t=60*e,o=r-a<0?7+r:r;if(o===a&&s>=t&&s<t+n&&(d=!0),o>0||s<t){let c=60*(1440*o+t)-((1440*a+s)*60+l);c<i&&c>0&&(i=c)}})}),d)return"Sessions: <span>Live</span>";let n=Math.floor(i/86400),r=Math.floor(i%86400/3600),o=Math.floor(i%3600/60),c=i%60,v="Next session: <span>";return n>0&&(v+=`${n}d `),r>0&&(v+=`${r}h `),o>0&&(v+=`${o}m `),c>0&&(v+=`${c}s`),v.trim()+"</span>"};((e,t)=>{let a=()=>{let a=x(e);t.innerHTML=`<div>${a}</div>`};a(),setInterval(a,1e3)})(weeklySessions,$),g("itm_mushroomSeeds_04",T4Items.itm_mushroomSeeds_04.total);let m=document.createElement("div");m.classList.add("voxels-gw-stats-details-80");let w=t.gw_stats?.individual_participants??0;m.innerHTML=`Players: <span>${w}</span>`,c.appendChild(m),g("itm_cave_fertilizer_04",T4Items.itm_cave_fertilizer_04.total);let h=document.createElement("div");h.classList.add("voxels-gw-stats-details-80");let C=t.gw_stats?.division_count??0;h.innerHTML=`Divisions: <span>${C}</span>`,c.appendChild(h),g("itm_soilDryer_04",T4Items.itm_soilDryer_04.total);let L=document.createElement("div");L.innerHTML="Leaderboards: ";let u=document.createElement("a");u.href="https://dashboard.pixels.xyz/leaderboards/ldb_guildwars_season1_individual_overall_weekly",u.textContent="Weekly",u.target="_blank";let E=document.createElement("a");E.href="https://dashboard.pixels.xyz/leaderboards/ldb_guildwars_season1_individual_overall",E.textContent="Seasonal",E.target="_blank",L.appendChild(u),L.innerHTML+=" <span>|</span> ",L.appendChild(E),c.appendChild(L),o.appendChild(c);let f=document.createElement("div");f.classList.add("voxels-gw-stats-details");let b=document.createElement("div");b.classList.add("voxels-gw-stats-title"),b.textContent="Mixers",f.appendChild(b);let _=e=>{let t=Date.now(),a=e-t;if(a<=0)return"<span>Ready</span>";let s=Math.floor(a/864e5),l=Math.floor(a%864e5/36e5),i=Math.floor(a%36e5/6e4),d=Math.floor(a%6e4/1e3),n="";return s>0&&(n+=`${s}d `),l>0&&(n+=`${l}h `),i>0&&(n+=`${i}m `),d>0&&(n+=`${d}s`),"Time remaining <span>"+n.trim()+"</span>"},y=document.createElement("div");if(y.classList.add("voxels-gw-stats-mixer-container"),Object.entries(globalMixerData).forEach(([e,t])=>{let a=document.createElement("div");a.classList.add("voxels-gw-stats-mixer");let s=document.createElement("img");s.src=chrome.runtime.getURL(`images/GW/${e}.png`),a.appendChild(s);let l=document.createElement("div"),i=document.createElement("div");i.classList.add("voxels-gw-stats-mixer-timer");let d=()=>{i.innerHTML=_(t.finishTimer)};d(),setInterval(d,1e3),l.appendChild(i);let n=document.createElement("div");n.classList.add("voxels-gw-stats-mixer-points"),n.innerHTML=`Points: <span>${parseFloat(t.points.toFixed(2))}</span>`,l.appendChild(n),t.pointsDiv=n,a.appendChild(l),y.appendChild(a)}),f.appendChild(y),o.appendChild(f),t.gw_stats&&t.gw_stats.top_10_individual_leaderboard&&0!==t.gw_stats.top_10_individual_leaderboard.length){let k=document.createElement("div");k.classList.add("voxels-gw-stats-details");let T=document.createElement("div");T.classList.add("voxels-gw-stats-title"),T.textContent="Weekly Top 10",k.appendChild(T);let S=document.createElement("div");S.classList.add("voxels-gw-leaderboard-container"),t.gw_stats.top_10_individual_leaderboard.forEach((e,t)=>{let a=document.createElement("div");a.classList.add("voxels-gw-leaderboard-entry");let s=document.createElement("div");s.classList.add("voxels-gw-rank"),s.textContent=t+1+".",a.appendChild(s);let l=document.createElement("div");l.classList.add("voxels-gw-username","clickable"),l.textContent=e.username,a.appendChild(l),l.addEventListener("click",function(){loadPlayerPageTop(),loadPlayerPage(e.pid)});let i=document.createElement("div");i.classList.add("voxels-gw-score");let d=e.score.toLocaleString();i.textContent=d,a.appendChild(i),S.appendChild(a)}),k.appendChild(S),o.appendChild(k)}a.appendChild(o)}})}function clearGWPage(){document.querySelector(".voxels-gw-page").innerHTML=""}