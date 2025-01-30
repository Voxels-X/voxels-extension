function loadLandPage(e){if(console.log(e),premium){if(e.mapId&&/(pixelsNFTFarm|nftHouse|shareRent|shareInterior)/.test(e.mapId)){let t=document.querySelectorAll(".voxels-limits-container");0===t.length&&(reloadOverlay(),loadTitleSection("land"));let i=document.querySelector(".voxels-main"),s={};t.forEach((e,t)=>{let i=e.querySelector(".voxels-limits-title");i&&(s[i.textContent.toLowerCase()]={container:e,index:t})}),Object.keys(s).forEach(t=>{e.landAttributes.some(e=>e.attribute.toLowerCase()===t)||s[t].container.remove()}),e.landAttributes.forEach((e,l)=>{let r=e.attribute.toLowerCase(),o=e.used/e.max*100,a=Math.min(o,100);if(s[r]){let{container:n}=s[r];n.querySelector(".voxels-limits-numbers").textContent=`${e.used}/${e.max}`,n.querySelector(".voxels-limits-percentage").textContent=`${nFormatter(o,2)}%`,n.querySelector(".voxels-limits-progress").style.width=`${a}%`}else{let d=document.createElement("div");d.classList.add("voxels-limits-container"),d.innerHTML=`
    <div class="voxels-limits-info">
        <div class="voxels-limits-title">${e.attribute.charAt(0).toUpperCase()+e.attribute.slice(1)}</div>
        <div class="voxels-limits-numbers">${e.used}/${e.max}</div>
        <div class="voxels-limits-percentage">${nFormatter(o,2)}%</div>
    </div>
    <div class="voxels-limits-progress-bar-container">
        <div class="voxels-limits-progress" style="width: ${a}%;"></div>
    </div>
`,(t=document.querySelectorAll(".voxels-limits-container"))[l]?i.insertBefore(d,t[l]):i.appendChild(d)}});return}reloadOverlay(),loadTitleSection("land"),displayPageInfo("View land limits","Please visit an NFT land or speck to display limit info.")}else displayPremium()}