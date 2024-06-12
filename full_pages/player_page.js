function loadLeaderboardPage(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"fetchPlayerLeaderboard",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadLeaderboardHome(l.data)))}catch(r){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(r)}})}function loadLeaderboardHome(e){data=e.leaderboard,skill=e.skill,skill_list=e.skill_list,currentPlayer=e.currentPlayer;var a=document.getElementById("voxels-full-page-main");a.innerHTML="";var t=document.createElement("div");t.setAttribute("id","voxels-player-home");var l=document.createElement("div");l.classList.add("voxels-player-top-row");var r=document.createElement("img");r.src=chrome.runtime.getURL("images/icons/icon__house.svg"),r.classList.add("voxels-player-home-icon","clickable"),r.onclick=function(){loadLeaderboardHome(e)},l.appendChild(r);var n=document.createElement("div");n.classList.add("voxels-player-input-container");var i=document.createElement("input");i.setAttribute("type","text"),i.setAttribute("placeholder","Enter username, id or wallet..."),i.classList.add("voxels-player-input"),i.setAttribute("autocomplete","off");var s=document.createElement("button");s.setAttribute("id","playerSubmitButton"),s.innerHTML="&#8594;",s.classList.add("voxels-player-submit-button");let d=limiter(function(e){searchPlayer(e)},5e3);s.onclick=function(){i.value.length<=45?d(i.value):quickMessage("Please check your input","error")},i.addEventListener("keydown",function(e){document.activeElement===i&&(e.stopPropagation(),"Enter"===e.key&&document.getElementById("playerSubmitButton").click())}),n.appendChild(i),n.appendChild(s),l.appendChild(n),t.appendChild(l);var o=document.createElement("div");o.setAttribute("id","voxels-player-main-area"),o.classList.add("voxels-scroll"),t.appendChild(o),createPlayerLeaderboard(o,data,skill,skill_list,currentPlayer),a.appendChild(t),initCustomSelect()}function createPlayerLeaderboard(e,a,t,l,r){e.innerHTML="";let n=document.createElement("div");n.classList.add("voxels-player-leaderboard");let i=document.createElement("div");i.classList.add("voxels-player-leaderboard-header");let s=document.createElement("div");s.classList.add("voxels-custom-select");let d=document.createElement("ul");d.classList.add("voxels-custom-select-items","voxels-custom-select-hide"),s.appendChild(d);let o=document.createElement("div");if(o.classList.add("voxels-custom-select-selected"),"overall"==t)o.innerHTML="Sort by skill",t="farming";else{let p=document.createElement("img");p.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${t}.png?v2`,p.classList.add("skill_logo"),o.appendChild(p);let c=document.createTextNode(t);o.appendChild(c)}s.appendChild(o),l.forEach(e=>{let a=document.createElement("li"),t=document.createElement("img");t.classList.add("skill_logo"),t.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${e}.png?v2`,a.appendChild(t);let l=document.createTextNode(e);a.appendChild(l),a.addEventListener("click",function(){loadLeaderboardPage(e)}),d.appendChild(a)}),["Rank","Username","Overall Level"].forEach(e=>{let a=document.createElement("div");if(a.textContent=e,"Overall Level"==e){a.classList.add("clickable");let t=limiter(function(){loadLeaderboardPage("overall")},5e3);a.addEventListener("click",t)}i.appendChild(a)}),i.appendChild(s),n.appendChild(i);let v=document.createElement("div");if(v.classList.add("voxels-player-leaderboard-rows","voxels-scroll"),a.forEach((e,a)=>{let l=document.createElement("div");l.classList.add("voxels-player-leaderboard-row","clickable");let r=document.createElement("div");r.classList.add("voxels-player-leaderboard-rank"),r.textContent=a+1+".",l.appendChild(r);let n=document.createElement("div");n.classList.add("voxels-player-leaderboard-username"),n.textContent=e.username,l.appendChild(n);let i=document.createElement("div");i.classList.add("voxels-player-leaderboard-overalllvl"),i.textContent=e.overall_level,l.appendChild(i);let s=document.createElement("div");s.classList.add("voxels-player-leaderboard-skilllvl"),s.textContent=e[t+"_level"],l.appendChild(s),l.addEventListener("click",function(){loadPlayerPage(e.pid)}),v.appendChild(l)}),r){let m=document.createElement("div");m.classList.add("voxels-player-leaderboard-row","voxels-player-leaderboard-row-current","clickable");let h=document.createElement("div");h.classList.add("voxels-player-leaderboard-rank"),h.textContent=r.position+".",m.appendChild(h);let g=document.createElement("div");g.classList.add("voxels-player-leaderboard-username"),g.textContent=r.username,m.appendChild(g);let u=document.createElement("div");u.classList.add("voxels-player-leaderboard-overalllvl"),u.textContent=r.overall_level,m.appendChild(u);let y=document.createElement("div");y.classList.add("voxels-player-leaderboard-skilllvl"),y.textContent=r[t+"_level"],m.appendChild(y),m.addEventListener("click",function(){loadPlayerPage(r.pid)}),v.appendChild(m)}n.appendChild(v),e.appendChild(n)}function loadPlayerPage(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"fetchPlayerPageData",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadPlayerHome(l.data)))}catch(r){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(r)}})}function loadPlayerHome(e){var a=document.getElementById("voxels-player-main-area");a.innerHTML="",a.scrollIntoView({behavior:"smooth",block:"start"});var t=document.createElement("div");t.classList.add("voxels-playerpage-container");var l=document.createElement("div");l.classList.add("voxels-playerpage-card");var l=document.createElement("div");l.classList.add("voxels-playerpage-card");var r=document.createElement("div");r.classList.add("voxels-playerpage-header");var n=document.createElement("div");n.classList.add("voxels-playerpage-iconlevel");var i=document.createElement("img");"Basic"===e.currentAvatar||e.currentAvatar.includes(".gif")||e.currentAvatar.includes("ipfs.io")?i.src=chrome.runtime.getURL("images/Other/Basic.png"):(i.src=e.currentAvatar,i.addEventListener("error",function(){i.src=chrome.runtime.getURL("images/Other/Basic.png")})),i.classList.add("voxels-playerpage-icon"),n.appendChild(i);var s=document.createElement("div");s.classList.add("voxels-playerpage-levelicon"),s.innerHTML="<span class='voxels-playerpage-levelicon-prefix'>Rank </span>"+e.overall_position,s.innerHTML+="<br><span class='voxels-playerpage-levelicon-prefix'>lvl </span>"+e.overall_level,n.appendChild(s),r.appendChild(n);var d=document.createElement("div");d.classList.add("voxels-playerpage-profile-balance");var o=document.createElement("div");o.classList.add("voxels-playerpage-balance-container"),d.appendChild(o);var p=document.createElement("div");p.classList.add("voxels-playerpage-balance-currency"),p.innerHTML=e.coinBalances.cur_coins.toLocaleString("en-US"),o.appendChild(p);var c=document.createElement("img");c.src=chrome.runtime.getURL("images/Prices/coin.png"),p.prepend(c);var v=document.createElement("div");v.classList.add("voxels-playerpage-balance-currency"),v.innerHTML=e.coinBalances.cur_pixel,o.appendChild(v);var m=document.createElement("img");m.src=chrome.runtime.getURL("images/Other/Pixel.png"),v.prepend(m);var h=document.createElement("div");h.classList.add("voxels-playerpage-balance-currency"),h.innerHTML=e.nftLandPixelsCount,o.appendChild(h);var g=document.createElement("img");g.src=chrome.runtime.getURL("images/pixels_icon.png"),h.prepend(g),r.appendChild(d),l.appendChild(r);var u=document.createElement("div");u.classList.add("voxels-playerpage-info-panels"),l.appendChild(u);var y=document.createElement("div");y.classList.add("voxels-playerpage-info-panel"),y.innerHTML="<span class='voxels-playerpage-info-panel-number'>"+e.reputation+"</span><span class='voxels-playerpage-info-panel-text'>Reputation</span>",u.appendChild(y);var x=document.createElement("div");x.classList.add("voxels-playerpage-info-panel"),x.innerHTML="<span class='voxels-playerpage-info-panel-number'>"+Number(e.overall_total_xp).toLocaleString("en-US")+"</span><span class='voxels-playerpage-info-panel-text'>Total experience</span>",u.appendChild(x),t.appendChild(l);var f=document.createElement("div");f.classList.add("voxels-playerpage-username"),f.innerHTML="<h2>"+e.username+"</h2>",t.appendChild(f);var C=document.createElement("div");C.classList.add("voxels-playerpage-info-section");var L=document.createElement("div");L.classList.add("voxels-playerpage-info-content","voxels-scroll");var E=document.createElement("div");function b(e,a,t){var l=document.createElement("li");l.classList.add("voxels-playerpage-info-row");var r=document.createElement("div");r.classList.add("voxels-playerpage-info-name"),r.innerHTML=e;var n=document.createElement("div");n.classList.add("voxels-playerpage-info-points"),n.innerHTML=a;var i=document.createElement("img");i.src=chrome.runtime.getURL("images/icons/icon__task.svg");var s=document.createElement("img");s.src=chrome.runtime.getURL("images/icons/icon__xmark.svg");var d=document.createElement("div");return d.classList.add("voxels-playerpage-info-completed"),r.classList.toggle("js-completed",t),d.classList.toggle("js-completed",t),t?d.appendChild(i):d.appendChild(s),l.appendChild(r),l.appendChild(n),l.appendChild(d),l}function k(e,a){var t=document.createElement("div");t.classList.add("voxels-playerpage-info-subsection");var l=document.createElement("ul");l.classList.add("voxels-playerpage-info-subheader");var r=document.createElement("div");r.classList.add("voxels-playerpage-info-subsection-header-title-row");var n=document.createElement("div");n.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),n.textContent=e,r.appendChild(n);var i=document.createElement("div");i.classList.add("voxels-playerpage-info-subsection-header-title-row-points"),i.textContent="Reward",r.appendChild(i);var s=document.createElement("div");return s.classList.add("voxels-playerpage-info-subsection-header-title-row-status"),s.textContent="Status",r.appendChild(s),l.appendChild(r),t.appendChild(l),a.forEach(function(e){l.appendChild(b(e.name,e.points,e.completed))}),t}E.classList.add("voxels-playerpage-info-content-title"),E.textContent="Reputation",L.appendChild(E);var P=k("Quests",e.rep_points.quests);L.appendChild(P);var $=k("Socials",e.rep_points.socialConnections);L.appendChild($);var w=k("Other",[e.rep_points.vipMembership,e.rep_points.landOwnership,e.rep_points.accountAge]);L.appendChild(w);var T=document.createElement("div");T.classList.add("voxels-playerpage-info-subsection");var H=document.createElement("ul");H.classList.add("voxels-playerpage-info-subheader");var S=document.createElement("div");S.classList.add("voxels-playerpage-info-subsection-header-title-row");var M=document.createElement("div");M.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),M.textContent="Unlockable",S.appendChild(M);var _=document.createElement("div");_.classList.add("voxels-playerpage-info-subsection-header-title-row-points"),_.textContent="Required",S.appendChild(_);var A=document.createElement("div");A.classList.add("voxels-playerpage-info-subsection-header-title-row-status"),A.textContent="Status",S.appendChild(A),H.appendChild(S),T.appendChild(H),Object.keys(e.rep_points.unlocks).forEach(function(a){var t=e.reputation>=Number(a);H.appendChild(b(e.rep_points.unlocks[a],a,t))}),L.appendChild(T),C.appendChild(L),t.appendChild(C);var R=document.createElement("div");R.classList.add("voxels-playerpage-info-content","voxels-scroll","voxels-playerpage-info-content-guild");var U=document.createElement("div");U.classList.add("voxels-playerpage-info-content-title"),U.textContent="Player Info",R.appendChild(U);var I=document.createElement("div");I.classList.add("voxels-playerpage-meta");var B=document.createElement("p");B.classList.add("clickable"),B.textContent="ID "+e.pid,B.addEventListener("click",function(){navigator.clipboard.writeText(e.pid).then(()=>{var e=document.createElement("span");e.textContent="Copied!",e.style.position="absolute",e.style.backgroundColor="#333",e.style.color="#fff",e.style.padding="5px",e.style.borderRadius="5px",e.style.top=B.offsetTop+"px",e.style.left=B.offsetLeft+B.offsetWidth+10+"px",e.style.zIndex=4e3,document.body.appendChild(e),setTimeout(()=>{document.body.removeChild(e)},2e3)}).catch(e=>{console.error("Failed to copy text: ",e)})}),I.appendChild(B);var O=document.createElement("div");if(e.cryptoWallets.forEach(e=>{var a=document.createElement("p");"ETH"===e.type?a.innerHTML="ETH <a target='_blank' href='https://etherscan.io/address/"+e.address+"'>"+e.address+"</a>":"Ronin"===e.type&&(a.innerHTML="RONIN <a target='_blank' href='https://app.roninchain.com/address/"+e.address+"'>"+e.address+"</a>"),O.appendChild(a)}),I.appendChild(O),e.vipExpiration){var N=document.createElement("p");N.textContent="VIP TILL "+formatDateTime(e.vipExpiration),I.appendChild(N)}R.appendChild(I);var z=document.createElement("div");z.classList.add("voxels-playerpage-info-subsection");var q=document.createElement("div");q.classList.add("voxels-playerpage-info-content-title"),q.textContent="Guilds",R.appendChild(q);var D=document.createElement("ul");D.classList.add("voxels-playerpage-info-subheader");var F=document.createElement("div");F.classList.add("voxels-playerpage-info-subsection-header-title-row");var V=document.createElement("div");V.classList.add("voxels-playerpage-info-subsection-header-title-row-name"),V.textContent="Name",F.appendChild(V);var X=document.createElement("div");if(X.classList.add("voxels-playerpage-info-subsection-header-title-count"),X.textContent="Shards",F.appendChild(X),D.appendChild(F),R.appendChild(D),0===e.guilds.length){var j=document.createElement("div");j.classList.add("voxels-playerpage-info-empty-message"),j.innerText="No guild shards found.",z.appendChild(j)}else Object.keys(e.guilds).map(function(a){return{handle:a,...e.guilds[a]}}).sort(function(e,a){return a.count-e.count}).forEach(function(e){var a,t,l,r,n,i;z.appendChild((a=e,(t=document.createElement("li")).classList.add("voxels-playerpage-info-row"),(l=document.createElement("div")).classList.add("voxels-playerpage-info-emblem","clickable"),(r=document.createElement("img")).src=a.emblem,r.alt=a.name+" emblem",r.style.width="32px",r.style.height="32px",l.appendChild(r),(n=document.createElement("div")).classList.add("voxels-playerpage-info-name"),n.innerHTML=a.name,(i=document.createElement("div")).classList.add("voxels-playerpage-info-count"),i.innerHTML=a.count,t.appendChild(l),t.appendChild(n),t.appendChild(i),l.addEventListener("click",function(){loadGuildPageTop(),openGuild(a.handle)}),t))});R.appendChild(z),C.appendChild(R);var G=document.createElement("div");G.id="playerGraph",t.appendChild(G),generateAndAddPlayerChart(G,e);var W=document.createElement("div");W.classList.add("voxels-playerpage-skills-list");var Y=document.createElement("div");Y.classList.add("voxels-playerpage-info-content-title"),Y.textContent="Skills",W.appendChild(Y),e.current_skills.forEach(a=>{var t=document.createElement("div");t.classList.add("voxels-playerpage-skill-container");var l=document.createElement("div");l.classList.add("voxels-playerpage-skill-details");var r=document.createElement("div");r.classList.add("voxels-playerpage-skill-info");let n=Number(e[`${a}_total_xp`]).toLocaleString("en-US");if(r.innerHTML=`<div class="voxels-playerpage-skill-title">${a}</div> Rank: ${e[`${a}_position`]}, XP: ${n}`,l.appendChild(r),e.enable_level_up){var i=document.createElement("div");i.classList.add("voxels-playerpage-level-up");for(var s=e[`${a}_level`]+1,d=document.createElement("select"),o=s;o<=100;o++){var p=document.createElement("option");p.value=o,p.text=o,d.appendChild(p)}var c=document.createElement("span"),v=e[`${a}_total_xp`];function m(){var e=parseInt(d.value),a=Number(xpArray[e-1]-v).toLocaleString("en-US");c.textContent=`${a} XP`}d.addEventListener("change",m),m(),i.innerHTML="XP required for Level ",i.appendChild(d),i.appendChild(document.createTextNode(": ")),i.appendChild(c),l.appendChild(i)}t.appendChild(l);var h=document.createElement("div");h.classList.add("voxels-playerpage-skill-bar");var g=document.createElement("img");g.src=`https://d31ss916pli4td.cloudfront.net/game/ui/skills/skills_icon_${a}.png?v2`,g.alt=a,g.classList.add("voxels-playerpage-skill-icon"),h.appendChild(g);var u=document.createElement("div");u.classList.add("voxels-playerpage-skill-level"),u.innerHTML="<span class='voxels-playerpage-levelicon-prefix'>Lvl</span>"+e[`${a}_level`],h.appendChild(u);var y=document.createElement("div");y.classList.add("voxels-playerpage-skill-progress-bar");var x=document.createElement("div");x.classList.add("voxels-playerpage-skill-progress-bar-inner");var u=e[`${a}_level`];if(x.style.width=`${u}%`,y.appendChild(x),h.appendChild(y),e.player_history&&e.player_history.length>0){var f=document.createElement("div");f.classList.add("voxels-playerpage-skill-tooltip"),document.body.appendChild(f),h.addEventListener("mouseenter",function(t){var l="";[...e.player_history].reverse().forEach(e=>{void 0!==e[`${a}_level`]&&(l+=`<span>${e.date}</span>: Level ${e[`${a}_level`]}, Total XP ${Number(e[`${a}_total_xp`]).toLocaleString("en-US")}<br>`)}),f.innerHTML=l,f.style.display="block";var r=t.target.getBoundingClientRect();f.style.left=`${r.left+window.pageXOffset}px`,f.style.top=`${r.bottom+window.pageYOffset}px`}),h.addEventListener("mouseleave",function(){f.style.display="none"})}t.appendChild(h),W.appendChild(t)}),t.appendChild(W),a.appendChild(t)}function formatDateTime(e){var a,t=new Date(e),l=t.getDate(),r=t.getMonth()+1,n=t.getFullYear();return l+"."+r+"."+n+" "+t.getHours()+":"+("0"+t.getMinutes()).substr(-2)}function generateAndAddPlayerChart(e,a){var t,l,r,n,i,s,d,o,p,c,v,m,h=function e(a){var t=[],l=[],r=[];for(var n in a)a.hasOwnProperty(n)&&(t.push(n),l.push(a[n].pixels),r.push(a[n].coins));return{labels:t,datasets:[{label:"Pixels",data:l,borderColor:"#5ff600",backgroundColor:"#5ff600",fill:!1,tension:.4,yAxisID:"y"},{label:"Coins",data:r,borderColor:"#e3ff36",backgroundColor:"#e3ff36",fill:!1,tension:.4,yAxisID:"y1"}]}}((t=a,l=t.player_history,r=t.coinBalances,n={},l.forEach(e=>{var a=e.date,t=parseFloat(e.pixels),l=parseFloat(e.coins);n[a]={pixels:t,coins:l}}),i=new Date().toISOString().split("T")[0],s=parseFloat(r.cur_pixel),d=parseFloat(r.cur_coins),n[i]={pixels:s,coins:d},n)),g="playerChartCanvas";o=h,p={responsive:!0,interaction:{mode:"index",intersect:!1},stacked:!1,plugins:{title:{display:!1},legend:{labels:{color:"white",font:{family:"'Press Start 2P'",size:6}}},tooltip:{titleColor:"white",bodyColor:"white",backgroundColor:"black",titleFont:{family:"'Press Start 2P'",size:6},bodyFont:{family:"'Press Start 2P'",size:6}}},scales:{x:{grid:{color:e=>0===e.tick.value?"white":"transparent"},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}}},y:{beginAtZero:!0,grid:{color:e=>0===e.tick.value?"white":"rgba(255, 255, 255, 0.2)"},border:{dash:e=>0===e.tick.value?[]:[2,4]},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}},title:{display:!0,text:"Pixels",color:"white",font:{family:"'Press Start 2P'",size:6}}},y1:{beginAtZero:!0,position:"right",grid:{drawOnChartArea:!1},ticks:{color:"white",font:{family:"'Press Start 2P'",size:6}},title:{display:!0,text:"Coins",color:"white",font:{family:"'Press Start 2P'",size:6}}}}},c=(v=e,m=document.createElement("canvas"),m.id=g,m.style.width="100%",m.style.height="100%",m.style.maxHeight="400px",v.appendChild(m),m.getContext("2d")),new Chart(c,{type:"line",data:o,options:p})}function searchPlayer(e){chrome.storage.local.get("pid",async function(a){let t=a.pid;loadingScreenFull(1);try{let l=await makeFetchRequestByPID(apiURL,{pid:t,operation:"searchPlayer",extra:e});handleErrors(l)||("logout"==l?initiate():(loadingScreenFull(0),loadPlayerHome(l.data)))}catch(r){loadingScreenFull(0),quickMessage("Please try again.","error"),console.error(r)}})}function checkForAboutPage(){let e=document.querySelectorAll(nodeNames.playerPageAbout);if(0===e.length||document.querySelector(".aboutToVoxelsLink"))return;let a=document.createElement("div");a.classList.add("aboutToVoxelsLink","clickable");let t=document.createElement("img");t.src=chrome.runtime.getURL("images/logo.png"),t.alt="Logo";let l=document.createElement("span");l.innerText="Player Page",a.appendChild(t),a.appendChild(l),a.addEventListener("click",()=>{let e=document.querySelector(nodeNames.playerPageUsername);if(e){let a=e.textContent.trim();openFullpage(),loadPlayerPageTop(),searchPlayer(a)}}),e[0].appendChild(a)}function showPlayerPagePremium(){var e=document.getElementById("voxels-full-page-main");e.innerHTML="";var a=document.createElement("div");a.className="voxels-playerpage-premium-container";var t=document.createElement("h3");t.className="voxels-playerpage-premium-heading",t.textContent="Voxels Premium feature";var l=document.createElement("p");l.className="voxels-playerpage-premium-text";var r=document.createElement("span");r.classList.add("voxels-playerpage-premium-link","clickable"),r.textContent="premium",r.onclick=function(){changeTab("premium")},l.textContent="Acquire ",l.appendChild(r),l.appendChild(document.createTextNode(" to view leaderboards, player stats with skills/coins/pixels/reputation and a lot more... and search for any player!"));var n=document.createElement("img");n.className="voxels-playerpage-premium-image",n.src=chrome.runtime.getURL("images/Premium/playerpage.png"),n.alt="Premium features",a.appendChild(t),a.appendChild(l),a.appendChild(n),e.appendChild(a)}