import {days,schedule,workshops,partners} from "./data.js";

const tabs=document.querySelector("#day-tabs");
const panel=document.querySelector("#schedule-panel");
const esc=value=>String(value).replace(/[&<>"']/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
function showDay(day,focus=false){
  tabs.querySelectorAll("button").forEach(button=>{const selected=button.dataset.day===day;button.classList.toggle("active",selected);button.setAttribute("aria-selected",String(selected));button.tabIndex=selected?0:-1;});
  const items=schedule.filter(item=>item.day===day);
  panel.setAttribute("aria-labelledby","day-"+day);
  panel.innerHTML='<div class="schedule-head"><span>23—27 NOVEMBRO 2026</span><strong>'+esc(days.find(d=>d.id===day).name)+' <span>• '+esc(days.find(d=>d.id===day).theme)+'</span></strong></div>'+items.map(item=>'<article class="event-row"><time datetime="2026-11-'+esc(day)+'T'+esc(item.time)+'">'+esc(item.time)+'</time><div class="event-info"><span class="type">'+esc(item.type)+'</span><h3>'+esc(item.title)+'</h3>'+(item.speaker?'<p>'+esc(item.speaker)+'</p>':'')+(item.place?'<small>⌖ '+esc(item.place)+'</small>':'')+'</div><span class="event-arrow" aria-hidden="true">↗</span></article>').join("");
  if(focus)tabs.querySelector('[data-day="'+day+'"]').focus();
}
days.forEach((day,index)=>{const button=document.createElement("button");button.type="button";button.id="day-"+day.id;button.dataset.day=day.id;button.setAttribute("role","tab");button.setAttribute("aria-controls","schedule-panel");button.innerHTML='<small>'+esc(day.weekday)+'</small><strong>'+day.id+'</strong><span>NOV</span>';button.addEventListener("click",()=>showDay(day.id));button.addEventListener("keydown",e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();const idx=days.findIndex(d=>d.id===button.dataset.day);const target=e.key==="Home"?0:e.key==="End"?days.length-1:e.key==="ArrowRight"?(idx+1)%days.length:(idx-1+days.length)%days.length;showDay(days[target].id,true);});tabs.append(button);});
showDay("23");

document.querySelector("#workshop-grid").innerHTML=workshops.map(item=>'<article class="workshop"><div class="workshop-icon" aria-hidden="true">'+esc(item.icon)+'</div><p class="workshop-date">'+esc(item.day)+' · '+esc(item.time)+'</p><h3>'+esc(item.title)+'</h3><p>'+esc(item.description)+'</p>'+(item.speaker?'<div class="workshop-speaker">'+esc(item.speaker)+'</div>':'')+(item.place?'<div class="workshop-place">⌖ '+esc(item.place)+'</div>':'')+'</article>').join("");

document.querySelector("#partner-groups").innerHTML=partners.map(group=>'<section class="partner-tier"><h3><span class="tier-diamond" aria-hidden="true">✦</span> PARCEIRO '+esc(group.tier.toUpperCase())+'</h3><div class="partner-logos">'+group.names.map(name=>'<div class="partner-name">'+esc(name)+'</div>').join("")+'</div></section>').join("");

const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{const opened=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!opened));nav.classList.toggle("open",!opened);});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");nav.classList.remove("open");}));
