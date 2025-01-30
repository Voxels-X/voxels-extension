function loadLeaderboardPage(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"fetchPlayerLeaderboard",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadLeaderboardHome(l.data)))}catch(n){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(n)}})}function loadLeaderboardHome(e){data=e.leaderboard,skill=e.skill,skill_list=e.skill_list,currentPlayer=e.currentPlayer;var a=document.getElementById("voxels-full-page-main");a.innerHTML="";var t=document.createElement("div");t.setAttribute("id","voxels-player-home");var l=document.createElement("div");l.classList.add("voxels-player-top-row");var n=document.createElement("img");n.src=chrome.runtime.getURL("images/icons/icon__house.svg"),n.classList.add("voxels-player-home-icon","clickable"),n.onclick=function(){loadLeaderboardHome(e)},l.appendChild(n);var r=document.createElement("div");r.classList.add("voxels-player-input-container");var i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("placeholder","Enter username, id or wallet..."),i.classList.add("voxels-player-input"),i.setAttribute("autocomplete","off");var s=document.createElement("button");s.setAttribute("id","playerSubmitButton"),s.innerHTML="&#8594;",s.classList.add("voxels-player-submit-button");let d=limiter(function(e){searchPlayer(e)},5e3);s.onclick=function(){i.value.length<=45?d(i.value):quickMessage("Please check your input","error")},i.addEventListener("keydown",function(e){document.activeElement===i&&(e.stopPropagation(),"Enter"===e.key&&document.getElementById("playerSubmitButton").click())}),r.appendChild(i),r.appendChild(s),l.appendChild(r),t.appendChild(l);var o=document.createElement("div");o.setAttribute("id","voxels-player-main-area"),o.classList.add("voxels-scroll"),t.appendChild(o),createPlayerLeaderboard(o,data,skill,skill_list,currentPlayer),a.appendChild(t),initCustomSelect()}function createPlayerLeaderboard(e,a,t,l,n){e.innerHTML="";let r=document.createElement("div");r.classList.add("voxels-player-leaderboard");let i=document.createElement("div");i.classList.add("voxels-player-leaderboard-header");let s=document.createElement("div");s.classList.add("voxels-custom-select");let d=document.createElement("ul");d.classList.add("voxels-custom-select-items","voxels-custom-select-hide"),s.appendChild(d);let o=document.createElement("div");if(o.classList.add("voxels-custom-select-selected"),"overall"==t)o.innerHTML="Sort by skill",t="farming";else{let p=document.createElement("img");p.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${t}.png?v2`,p.classList.add("skill_logo"),o.appendChild(p);let c=document.createTextNode(t);o.appendChild(c)}s.appendChild(o),l.forEach(e=>{let a=document.createElement("li"),t=document.createElement("img");t.classList.add("skill_logo"),t.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${e}.png?v2`,a.appendChild(t);let l=document.createTextNode(e);a.appendChild(l),a.addEventListener("click",function(){loadLeaderboardPage(e)}),d.appendChild(a)}),["Rank","Username","Overall Level"].forEach(e=>{let a=document.createElement("div");if(a.textContent=e,"Overall Level"==e){a.classList.add("clickable");let t=limiter(function(){loadLeaderboardPage("overall")},5e3);a.addEventListener("click",t)}i.appendChild(a)}),i.appendChild(s),r.appendChild(i);let v=document.createElement("div");if(v.classList.add("voxels-player-leaderboard-rows","voxels-scroll"),a.forEach((e,a)=>{let l=document.createElement("div");l.classList.add("voxels-player-leaderboard-row","clickable");let n=document.createElement("div");n.classList.add("voxels-player-leaderboard-rank"),n.textContent=a+1+".",l.appendChild(n);let r=document.createElement("div");r.classList.add("voxels-player-leaderboard-username"),r.textContent=e.username,l.appendChild(r);let i=document.createElement("div");i.classList.add("voxels-player-leaderboard-overalllvl"),i.textContent=e.overall_level,l.appendChild(i);let s=document.createElement("div");s.classList.add("voxels-player-leaderboard-skilllvl"),s.textContent=e[t+"_level"],l.appendChild(s),l.addEventListener("click",function(){loadPlayerPage(e.pid)}),v.appendChild(l)}),n){let m=document.createElement("div");m.classList.add("voxels-player-leaderboard-row","voxels-player-leaderboard-row-current","clickable");let h=document.createElement("div");h.classList.add("voxels-player-leaderboard-rank"),h.textContent=n.position+".",m.appendChild(h);let g=document.createElement("div");g.classList.add("voxels-player-leaderboard-username"),g.textContent=n.username,m.appendChild(g);let y=document.createElement("div");y.classList.add("voxels-player-leaderboard-overalllvl"),y.textContent=n.overall_level,m.appendChild(y);let u=document.createElement("div");u.classList.add("voxels-player-leaderboard-skilllvl"),u.textContent=n[t+"_level"],m.appendChild(u),m.addEventListener("click",function(){loadPlayerPage(n.pid)}),v.appendChild(m)}r.appendChild(v),e.appendChild(r)}function loadPlayerPage(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"fetchPlayerPageData",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadPlayerHome(l.data)))}catch(n){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(n)}})}function loadPlayerHome(e){var a=document.getElementById("voxels-player-main-area");a.innerHTML="",a.scrollIntoView({behavior:"smooth",block:"start"});var t=document.createElement("div");t.classList.add("voxels-playerpage-container");var l=document.createElement("div");l.classList.add("voxels-playerpage-card");var l=document.createElement("div");l.classList.add("voxels-playerpage-card");var n=document.createElement("div");n.classList.add("voxels-playerpage-header");var r=document.createElement("div");r.classList.add("voxels-playerpage-iconlevel");var i=document.createElement("img");"Basic"===e.currentAvatar||e.currentAvatar.includes(".gif")||e.currentAvatar.includes("ipfs.io")?i.src=chrome.runtime.getURL("images/Other/Basic.png"):(i.src=e.currentAvatar,i.addEventListener("error",function(){i.src=chrome.runtime.getURL("images/Other/Basic.png")})),i.classList.add("voxels-playerpage-icon"),r.appendChild(i);var s=document.createElement("div");s.classList.add("voxels-playerpage-levelicon"),s.innerHTML="<span class='voxels-playerpage-levelicon-prefix'>Rank </span>"+e.overall_position,s.innerHTML+="<br><span class='voxels-playerpage-levelicon-prefix'>lvl </span>"+e.overall_level,r.appendChild(s),n.appendChild(r);var d=document.createElement("div");d.classList.add("voxels-playerpage-profile-balance");var o=document.createElement("div");o.classList.add("voxels-playerpage-balance-container"),d.appendChild(o);var p=document.createElement("div");p.classList.add("voxels-playerpage-balance-currency"),p.innerHTML=e.coinBalances.cur_coins.toLocaleString("en-US"),o.appendChild(p);var c=document.createElement("img");c.src=chrome.runtime.getURL("images/Prices/coin.png"),p.prepend(c);var v=document.createElement("div");v.classList.add("voxels-playerpage-balance-currency"),v.innerHTML=e.coinBalances.cur_pixel,o.appendChild(v);var m=document.createElement("img");m.src=chrome.runtime.getURL("images/Other/Pixel.png"),v.prepend(m);var h=document.createElement("div");h.classList.add("voxels-playerpage-balance-currency"),h.innerHTML=e.coinBalances.cur_guildtoken,o.appendChild(h);var g=document.createElement("img");g.src=chrome.runtime.getURL("images/GW/guild_runes.png"),h.prepend(g);var y=document.createElement("div");y.classList.add("voxels-playerpage-balance-currency"),y.innerHTML=e.nftLandPixelsCount,o.appendChild(y);var u=document.createElement("img");u.src=chrome.runtime.getURL("images/pixels_icon.png"),y.prepend(u),n.appendChild(d),l.appendChild(n);var x=document.createElement("div");x.classList.add("voxels-playerpage-info-panels"),l.appendChild(x);var C=document.createElement("div");C.classList.add("voxels-playerpage-info-panel"),C.innerHTML="<span class='voxels-playerpage-info-panel-number'>"+e.reputation+"</span><span class='voxels-playerpage-info-panel-text'>Reputation</span>",x.appendChild(C);var f=document.createElement("div");f.classList.add("voxels-playerpage-info-panel"),f.innerHTML="<span class='voxels-playerpage-info-panel-number'>"+Number(e.overall_total_xp).toLocaleString("en-US")+"</span><span class='voxels-playerpage-info-panel-text'>Total experience</span>",x.appendChild(f),t.appendChild(l);var L=document.createElement("div");L.classList.add("voxels-playerpage-username"),L.innerHTML="<h2>"+e.username+"</h2>",t.appendChild(L);var E=document.createElement("div");E.classList.add("voxels-playerpage-info-section");var b=document.createElement("div");b.classList.add("voxels-playerpage-info-content","voxels-scroll");var k=document.createElement("div");function P(e,a,t){var l=document.createElement("li");l.classList.add("voxels-playerpage-info-row");var n=document.createElement("div");n.classList.add("voxels-playerpage-info-name"),n.innerHTML=e;var r=document.createElement("div");r.classList.add("voxels-playerpage-info-points"),r.innerHTML=a;var i=document.createElement("img");i.src=chrome.runtime.getURL("images/icons/icon__task.svg");var s=document.createElement("img");s.src=chrome.runtime.getURL("images/icons/icon__xmark.svg");var d=document.createElement("div");return d.classList.add("voxels-playerpage-info-completed"),n.classList.toggle("js-completed",t),d.classList.toggle("js-completed",t),t?d.appendChild(i):d.appendChild(s),l.appendChild(n),l.appendChild(r),l.appendChild(d),l}function w(e,a){var t=document.createElement("div");t.classList.add("voxels-playerpage-info-subsection");var l=document.createElement("ul");l.classList.add("voxels-playerpage-info-subheader");var n=document.createElement("div");n.classList.add("voxels-playerpage-info-subsection-header-title-row");var r=document.createElement("div");r.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),r.textContent=e,n.appendChild(r);var i=document.createElement("div");i.classList.add("voxels-playerpage-info-subsection-header-title-row-points"),i.textContent="Reward",n.appendChild(i);var s=document.createElement("div");return s.classList.add("voxels-playerpage-info-subsection-header-title-row-status"),s.textContent="Status",n.appendChild(s),l.appendChild(n),t.appendChild(l),a.forEach(function(e){l.appendChild(P(e.name,e.points,e.completed))}),t}k.classList.add("voxels-playerpage-info-content-title"),k.textContent="Reputation",b.appendChild(k);var $=w("Quests",e.rep_points.quests);b.appendChild($);var T=w("Socials",e.rep_points.socialConnections);b.appendChild(T);var H=w("Other",[e.rep_points.vipMembership,e.rep_points.landOwnership,e.rep_points.accountAge]);b.appendChild(H);var S=document.createElement("div");S.classList.add("voxels-playerpage-info-subsection");var M=document.createElement("ul");M.classList.add("voxels-playerpage-info-subheader");var _=document.createElement("div");_.classList.add("voxels-playerpage-info-subsection-header-title-row");var A=document.createElement("div");A.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),A.textContent="Unlockable",_.appendChild(A);var R=document.createElement("div");R.classList.add("voxels-playerpage-info-subsection-header-title-row-points"),R.textContent="Required",_.appendChild(R);var U=document.createElement("div");U.classList.add("voxels-playerpage-info-subsection-header-title-row-status"),U.textContent="Status",_.appendChild(U),M.appendChild(_),S.appendChild(M),Object.keys(e.rep_points.unlocks).forEach(function(a){var t=e.reputation>=Number(a);M.appendChild(P(e.rep_points.unlocks[a],a,t))}),b.appendChild(S),E.appendChild(b),t.appendChild(E);var N=document.createElement("div");N.classList.add("voxels-playerpage-info-content","voxels-scroll","voxels-playerpage-info-content-guild");var B=document.createElement("div");B.classList.add("voxels-playerpage-info-content-title"),B.textContent="Player Info",N.appendChild(B);var I=document.createElement("div");I.classList.add("voxels-playerpage-meta");var O=document.createElement("p");O.classList.add("clickable"),O.textContent="ID "+e.pid,O.addEventListener("click",function(){navigator.clipboard.writeText(e.pid).then(()=>{var e=document.createElement("span");e.textContent="Copied!",e.style.position="absolute",e.style.backgroundColor="#333",e.style.color="#fff",e.style.padding="5px",e.style.borderRadius="5px",e.style.top=O.offsetTop+"px",e.style.left=O.offsetLeft+O.offsetWidth+10+"px",e.style.zIndex=4e3,document.body.appendChild(e),setTimeout(()=>{document.body.removeChild(e)},2e3)}).catch(e=>{console.error("Failed to copy text: ",e)})}),I.appendChild(O);var z=document.createElement("div");if(e.cryptoWallets.forEach(e=>{var a=document.createElement("p");"ETH"===e.type?a.innerHTML="ETH <a target='_blank' href='https://etherscan.io/address/"+e.address+"'>"+e.address+"</a>":"Ronin"===e.type&&(a.innerHTML="RONIN <a target='_blank' href='https://app.roninchain.com/address/"+e.address+"'>"+e.address+"</a>"),z.appendChild(a)}),I.appendChild(z),e.vipExpiration){var D=document.createElement("p");D.textContent="VIP TILL "+formatDateTime(e.vipExpiration),I.appendChild(D)}N.appendChild(I);var q=document.createElement("div");q.classList.add("voxels-playerpage-info-subsection");var F=document.createElement("div");if(F.classList.add("voxels-playerpage-info-content-title"),F.textContent="Player Name History",q.appendChild(F),e.player_name_history.length>0){var V=document.createElement("ul");V.classList.add("voxels-playerpage-info-subheader");var X=document.createElement("div");X.classList.add("voxels-playerpage-info-subsection-header-title-row");var G=document.createElement("div");G.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),G.textContent="Name",X.appendChild(G);var W=document.createElement("div");W.classList.add("voxels-playerpage-info-subsection-header-title-count"),W.textContent="Date",X.appendChild(W),V.appendChild(X),q.appendChild(V),e.player_name_history.forEach(function(e){var a=document.createElement("li");a.classList.add("voxels-playerpage-info-row");var t=document.createElement("div");t.classList.add("voxels-playerpage-info-name"),t.textContent=e.username;var l=document.createElement("div");l.classList.add("voxels-playerpage-info-count"),l.textContent=e.date,a.appendChild(t),a.appendChild(l),q.appendChild(a)})}else{var j=document.createElement("div");j.classList.add("voxels-playerpage-info-empty-message"),j.textContent="No player name changes.",q.appendChild(j)}N.appendChild(q);var Y=document.createElement("div");Y.classList.add("voxels-playerpage-info-subsection");var Z=document.createElement("div");Z.classList.add("voxels-playerpage-info-content-title"),Z.textContent="Guilds",N.appendChild(Z);var Q=document.createElement("ul");Q.classList.add("voxels-playerpage-info-subheader");var J=document.createElement("div");J.classList.add("voxels-playerpage-info-subsection-header-title-row");var K=document.createElement("div");K.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),K.textContent="Name",J.appendChild(K);var ee=document.createElement("div");if(ee.classList.add("voxels-playerpage-info-subsection-header-title-count"),ee.textContent="Shards",J.appendChild(ee),Q.appendChild(J),N.appendChild(Q),0===e.guilds.length){var ea=document.createElement("div");ea.classList.add("voxels-playerpage-info-empty-message"),ea.innerText="No guild shards found.",Y.appendChild(ea)}else Object.keys(e.guilds).map(function(a){return{handle:a,...e.guilds[a]}}).sort(function(e,a){return a.count-e.count}).forEach(function(e){var a,t,l,n,r,i;Y.appendChild((a=e,(t=document.createElement("li")).classList.add("voxels-playerpage-info-row"),(l=document.createElement("div")).classList.add("voxels-playerpage-info-emblem","clickable"),(n=document.createElement("img")).src=a.emblem,n.alt=a.name+" emblem",n.style.width="32px",n.style.height="32px",l.appendChild(n),(r=document.createElement("div")).classList.add("voxels-playerpage-info-name"),r.innerHTML=a.name,(i=document.createElement("div")).classList.add("voxels-playerpage-info-count"),i.innerHTML=a.count,t.appendChild(l),t.appendChild(r),t.appendChild(i),l.addEventListener("click",function(){loadGuildPageTop(),openGuild(a.handle)}),t))});N.appendChild(Y),E.appendChild(N);var et=document.createElement("div");et.id="playerGraph",t.appendChild(et),generateAndAddPlayerChart(et,e);var el=document.createElement("div");el.classList.add("voxels-playerpage-skills-list");var en=document.createElement("div");en.classList.add("voxels-playerpage-info-content-title"),en.textContent="Skills",el.appendChild(en),e.current_skills.forEach(a=>{var t=document.createElement("div");t.classList.add("voxels-playerpage-skill-container");var l=document.createElement("div");l.classList.add("voxels-playerpage-skill-details");var n=document.createElement("div");n.classList.add("voxels-playerpage-skill-info");let r=Number(e[`${a}_total_xp`]).toLocaleString("en-US");if(n.innerHTML=`<div class="voxels-playerpage-skill-title">${a}</div> Rank: ${e[`${a}_position`]}, XP: ${r}`,l.appendChild(n),e.enable_level_up){var i=document.createElement("div");i.classList.add("voxels-playerpage-level-up");for(var s=e[`${a}_level`]+1,d=document.createElement("select"),o=s;o<=100;o++){var p=document.createElement("option");p.value=o,p.text=o,d.appendChild(p)}var c=document.createElement("span"),v=e[`${a}_total_xp`];function m(){var e=parseInt(d.value),a=Number(xpArray[e-1]-v).toLocaleString("en-US");c.textContent=`${a} XP`}d.addEventListener("change",m),m(),i.innerHTML="XP required for Level ",i.appendChild(d),i.appendChild(document.createTextNode(": ")),i.appendChild(c),l.appendChild(i)}t.appendChild(l);var h=document.createElement("div");h.classList.add("voxels-playerpage-skill-bar");var g=document.createElement("img");g.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${a}.png?v2`,g.alt=a,g.classList.add("voxels-playerpage-skill-icon"),h.appendChild(g);var y=document.createElement("div");y.classList.add("voxels-playerpage-skill-level"),y.innerHTML="<span class='voxels-playerpage-levelicon-prefix'>Lvl</span>"+e[`${a}_level`],h.appendChild(y);var u=document.createElement("div");u.classList.add("voxels-playerpage-skill-progress-bar");var x=document.createElement("div");x.classList.add("voxels-playerpage-skill-progress-bar-inner");var y=e[`${a}_level`];if(x.style.width=`${y}%`,u.appendChild(x),h.appendChild(u),e.player_history&&e.player_history.length>0){var C=document.createElement("div");C.classList.add("voxels-playerpage-skill-tooltip"),document.body.appendChild(C),h.addEventListener("mouseenter",function(t){var l="";[...e.player_history].reverse().forEach(e=>{void 0!==e[`${a}_level`]&&(l+=`<span>${e.date}</span>: Level ${e[`${a}_level`]}, Total XP ${Number(e[`${a}_total_xp`]).toLocaleString("en-US")}<br>`)}),C.innerHTML=l,C.style.display="block";var n=t.target.getBoundingClientRect();C.style.left=`${n.left+window.pageXOffset}px`,C.style.top=`${n.bottom+window.pageYOffset}px`}),h.addEventListener("mouseleave",function(){C.style.display="none"})}t.appendChild(h),el.appendChild(t)}),t.appendChild(el),a.appendChild(t)}function formatDateTime(e){var a,t=new Date(e),l=t.getDate(),n=t.getMonth()+1,r=t.getFullYear();return l+"."+n+"."+r+" "+t.getHours()+":"+("0"+t.getMinutes()).substr(-2)}function generateAndAddPlayerChart(e,a){var t,l,n,r,i,s,d,o,p,c,v,m,h=function e(a){var t=[],l=[],n=[];for(var r in a)a.hasOwnProperty(r)&&(t.push(r),l.push(a[r].pixels),n.push(a[r].coins));return{labels:t,datasets:[{label:"Pixels",data:l,borderColor:"#5ff600",backgroundColor:"#5ff600",fill:!1,tension:.4,yAxisID:"y"},{label:"Coins",data:n,borderColor:"#e3ff36",backgroundColor:"#e3ff36",fill:!1,tension:.4,yAxisID:"y1"}]}}((t=a,l=t.player_history,n=t.coinBalances,r={},l.forEach(e=>{var a=e.date,t=parseFloat(e.pixels),l=parseFloat(e.coins);r[a]={pixels:t,coins:l}}),i=new Date().toISOString().split("T")[0],s=parseFloat(n.cur_pixel),d=parseFloat(n.cur_coins),r[i]={pixels:s,coins:d},r)),g="playerChartCanvas";o=h,p={responsive:!0,interaction:{mode:"index",intersect:!1},stacked:!1,plugins:{title:{display:!1},legend:{labels:{color:"white",font:{family:"'Press Start 2P'",size:6}}},tooltip:{titleColor:"white",bodyColor:"white",backgroundColor:"black",titleFont:{family:"'Press Start 2P'",size:6},bodyFont:{family:"'Press Start 2P'",size:6}}},scales:{x:{grid:{color:e=>0===e.tick.value?"white":"transparent"},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}}},y:{beginAtZero:!0,grid:{color:e=>0===e.tick.value?"white":"rgba(255, 255, 255, 0.2)"},border:{dash:e=>0===e.tick.value?[]:[2,4]},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}},title:{display:!0,text:"Pixels",color:"white",font:{family:"'Press Start 2P'",size:6}}},y1:{beginAtZero:!0,position:"right",grid:{drawOnChartArea:!1},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}},title:{display:!0,text:"Coins",color:"white",font:{family:"'Press Start 2P'",size:6}}}}},c=(v=e,m=document.createElement("canvas"),m.id=g,m.style.width="100%",m.style.height="100%",m.style.maxHeight="400px",v.appendChild(m),m.getContext("2d")),new Chart(c,{type:"line",data:o,options:p})}function searchPlayer(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"searchPlayer",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadPlayerHome(l.data)))}catch(n){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(n)}})}function checkForAboutPage(){let e=document.querySelectorAll(nodeNames.playerPageAbout);if(0===e.length||document.querySelector(".aboutToVoxelsLink"))return;let a=document.createElement("div");a.classList.add("aboutToVoxelsLink","clickable");let t=document.createElement("img");t.src=chrome.runtime.getURL("images/logo.png"),t.alt="Logo";let l=document.createElement("span");l.innerText="Player Page",a.appendChild(t),a.appendChild(l),a.addEventListener("click",()=>{let e=document.querySelector(nodeNames.playerPageUsername);if(e){let a=e.textContent.trim();openFullpage(),loadPlayerPageTop(),searchPlayer(a)}}),e[0].appendChild(a)}function showPlayerPagePremium(){var e=document.getElementById("voxels-full-page-main");e.innerHTML="";var a=document.createElement("div");a.className="voxels-playerpage-premium-container";var t=document.createElement("h3");t.className="voxels-playerpage-premium-heading",t.textContent="Voxels Premium feature";var l=document.createElement("p");l.className="voxels-playerpage-premium-text";var n=document.createElement("span");n.classList.add("voxels-playerpage-premium-link","clickable"),n.textContent="premium",n.onclick=function(){changeTab("premium")},l.textContent="Acquire ",l.appendChild(n),l.appendChild(document.createTextNode(" to view leaderboards, player stats with skills/coins/pixels/reputation and a lot more... and search for any player!"));var r=document.createElement("img");r.className="voxels-playerpage-premium-image",r.src=chrome.runtime.getURL("images/Premium/playerpage.png"),r.alt="Premium features",a.appendChild(t),a.appendChild(l),a.appendChild(r),e.appendChild(a)}