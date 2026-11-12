import {days,schedule,workshops,partners,guests} from "./data.js";
import "./hero-logo.js";

const tabs=document.querySelector("#day-tabs");
const panel=document.querySelector("#schedule-panel");
const esc=value=>String(value).replace(/[&<>"']/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
function showDay(day,focus=false){
  tabs.querySelectorAll("button").forEach(button=>{const selected=button.dataset.day===day;button.classList.toggle("active",selected);button.setAttribute("aria-selected",String(selected));button.tabIndex=selected?0:-1;});
  const items=schedule.filter(item=>item.day===day);
  panel.setAttribute("aria-labelledby","day-"+day);
  panel.innerHTML=items.map(item=>'<article class="event-row"><time datetime="2026-11-'+esc(day)+'T'+esc(item.time)+'">'+esc(item.time)+(item.endTime?'–'+esc(item.endTime):'')+'</time><div class="event-info"><span class="type">'+esc(item.type)+'</span><h3>'+esc(item.title)+'</h3>'+(item.speaker?'<p>'+esc(item.speaker)+'</p>':'')+(item.place?'<small>⌖ '+esc(item.place)+'</small>':'')+'</div><span class="event-arrow" aria-hidden="true">↗</span></article>').join("");
  if(focus)tabs.querySelector('[data-day="'+day+'"]').focus();
}
days.forEach((day,index)=>{const button=document.createElement("button");button.type="button";button.id="day-"+day.id;button.dataset.day=day.id;button.setAttribute("role","tab");button.setAttribute("aria-controls","schedule-panel");button.setAttribute("aria-label",day.name+", "+day.id+" de novembro");button.innerHTML='<span class="day-level" aria-hidden="true">LEVEL '+String(index+1).padStart(2,"0")+'</span><small>'+esc(day.weekday)+'</small><strong>'+day.id+'</strong><span>NOV</span>';button.addEventListener("click",()=>showDay(day.id));button.addEventListener("keydown",e=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();const idx=days.findIndex(d=>d.id===button.dataset.day);const target=e.key==="Home"?0:e.key==="End"?days.length-1:e.key==="ArrowRight"?(idx+1)%days.length:(idx-1+days.length)%days.length;showDay(days[target].id,true);});tabs.append(button);});
showDay("23");

// Cards de convidados: fotos podem ser cadastradas depois via data.js.
const guestGrid = document.querySelector("#guests-grid");
const initials = name => {
  const parts = name.split("(")[0].trim().split(" ").filter(Boolean);
  return (parts[0]?.[0] || "") + (parts.length > 1 ? parts[parts.length - 1][0] : "");
};
guestGrid.innerHTML = guests.map(guest =>
  '<article class="guest-card">' +
  '<div class="guest-avatar" aria-hidden="true">' +
  (guest.photo ? '<img src="' + esc(guest.photo) + '" alt="" loading="lazy" decoding="async"' + (Number.isFinite(guest.photoOffset) && Number.isFinite(guest.photoScale) ? ' style="transform:translateY(' + guest.photoOffset + 'px) scale(' + guest.photoScale + ');"' : '') + '>' : '<span>' + esc(initials(guest.name).toUpperCase()) + '</span>') +
  '</div>' +
  '<div class="guest-details">' +
  '<h3>' + esc(guest.name) + '</h3>' +
  (guest.affiliation ? '<p class="guest-affiliation">' + esc(guest.affiliation) + '</p>' : '') +
  '<p class="guest-role">' + esc(guest.role) + '</p>' +
  '<p class="guest-activity">' + esc(guest.activity) + '</p>' +
  (guest.bio ? '<p class="guest-bio">' + esc(guest.bio) + '</p>' : '') +
  (guest.profileUrl && /^https?:\/\//i.test(guest.profileUrl)
    ? '<a class="guest-profile" href="' + esc(guest.profileUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(guest.profileLabel || "Perfil profissional") + ' de ' + esc(guest.name) + ' (abre em nova aba)">' + esc(guest.profileLabel || "Perfil profissional") + ' ↗</a>'
    : '') +
  '</div></article>'
).join("");
guestGrid.querySelectorAll(".guest-avatar img").forEach(img => {
  img.addEventListener("error", () => { img.replaceWith(document.createTextNode("")); }, { once: true });
});

document.querySelector("#workshop-grid").innerHTML=workshops.map(item=>'<article class="workshop"><div class="workshop-icon" aria-hidden="true">'+esc(item.icon)+'</div><p class="workshop-date">'+esc(item.day)+' · '+esc(item.time)+'</p><h3>'+esc(item.title)+'</h3>'+(item.description?'<p>'+esc(item.description)+'</p>':'')+(item.speaker?'<div class="workshop-speaker">'+esc(item.speaker)+'</div>':'')+(item.place?'<div class="workshop-place">⌖ '+esc(item.place)+'</div>':'')+'</article>').join("");

const partnerContainer = document.querySelector("#partner-groups");
const partnerDialog = document.querySelector("#partner-dialog");
const partnerDialogTitle = document.querySelector("#partner-dialog-title");
const partnerDialogTier = document.querySelector("#partner-dialog-tier");
const partnerDialogDescription = document.querySelector("#partner-dialog-description");
const partnerDialogLink = document.querySelector("#partner-dialog-link");

partnerContainer.innerHTML = partners.map((group,groupIndex) =>
  '<section class="partner-tier"><h3><span class="tier-diamond" aria-hidden="true">✦</span> PARCEIRO ' + esc(group.tier.toUpperCase()) + '</h3>' +
  '<div class="partner-logos">' + group.items.map((item,itemIndex) =>
    '<button type="button" class="partner-card' + (item.theme === "dark" ? ' partner-card--dark' : '') + '" ' +
    'data-group="' + groupIndex + '" data-item="' + itemIndex + '" ' +
    'aria-haspopup="dialog" aria-label="Saiba mais sobre ' + esc(item.name) + '">' +
    '<img class="partner-logo" src="' + esc(item.logo) + '" alt="" loading="lazy" decoding="async">' +
    '<span class="partner-fallback" hidden>' + esc(item.name) + '</span>' +
    '<span class="partner-more" aria-hidden="true"><span class="partner-more-icon">ⓘ</span> Saiba mais <span>↗</span></span>' +
    '</button>'
  ).join("") + '</div></section>'
).join("");

// Permite que a identidade do parceiro continue visível se o logo não carregar.
partnerContainer.querySelectorAll(".partner-logo").forEach(img => {
  const displayFallback = () => {
    img.hidden = true;
    img.nextElementSibling.hidden = false;
  };
  img.addEventListener("error", displayFallback, { once: true });
  if (img.complete && img.naturalWidth === 0) displayFallback();
});

// O card abre uma descrição curta; a visita ao Instagram é uma ação separada.
partnerContainer.addEventListener("click", event => {
  const card = event.target.closest(".partner-card");
  if (!card || !partnerContainer.contains(card)) return;
  const group = partners[Number(card.dataset.group)];
  const item = group?.items[Number(card.dataset.item)];
  if (!item) return;
  partnerDialogTier.textContent = "PARCEIRO " + group.tier.toUpperCase();
  partnerDialogTitle.textContent = item.name;
  partnerDialogDescription.textContent = item.description;
  partnerDialogLink.href = item.url;
  partnerDialogLink.setAttribute("aria-label", "Ver Instagram de " + item.name + " (abre em nova aba)");
  partnerDialog.showModal();
});
document.querySelector(".partner-dialog-close").addEventListener("click", () => partnerDialog.close());
partnerDialog.addEventListener("click", event => {
  if (event.target === partnerDialog) partnerDialog.close();
});

const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{const opened=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!opened));nav.classList.toggle("open",!opened);});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");nav.classList.remove("open");}));

// Detalhes de navegação: calendário no fuso do Acre e leitura progressiva da página.
const countdownText = document.querySelector("#countdown-text");
if (countdownText) {
  // formatToParts evita depender do fuso configurado no aparelho do visitante.
  const acreParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Rio_Branco",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date()).map(({ type, value }) => [type, value])
  );
  const todayUTC = Date.UTC(Number(acreParts.year), Number(acreParts.month) - 1, Number(acreParts.day));
  const startUTC = Date.UTC(2026, 10, 23);
  const endUTC = Date.UTC(2026, 10, 27);
  const remainingDays = Math.round((startUTC - todayUTC) / 86400000);
  countdownText.textContent = todayUTC > endUTC
    ? "OBRIGADO POR FAZER PARTE DA SASI 2026!"
    : remainingDays <= 0
      ? "A SASI 2026 ESTÁ ACONTECENDO!"
      : remainingDays === 1
        ? "FALTA 1 DIA PARA A SASI 2026"
        : "FALTAM " + remainingDays + " DIAS PARA A SASI 2026";
}
const progressBar = document.querySelector("#page-progress");
const backToTop = document.querySelector("#back-to-top");
if (progressBar && backToTop) {
  let scrollTicking = false;
  function updateScrollControls() {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const progress = maxScroll ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progressBar.style.transform = "scaleX(" + progress.toFixed(4) + ")";
    backToTop.hidden = window.scrollY < 650;
    scrollTicking = false;
  }
  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollControls);
  }
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
    });
  });
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  updateScrollControls();
}
