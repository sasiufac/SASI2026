import { days, schedule, workshops, partners, guests, places } from "./data.js?v=20261113i";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = selector => document.querySelector(selector);
const esc = value =>
  String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));

const dayIndex = id => days.findIndex(d => d.id === id);
const levelLabel = id => "LV." + String(dayIndex(id) + 1).padStart(2, "0");
const TALK_KEYS = ["palestra", "mesa", "painel", "apresenta", "institucional", "confirmar"];
const WORKSHOP_KEYS = ["minicurso", "oficina"];
const isTalk = type => TALK_KEYS.some(k => type.toLowerCase().includes(k));
const isWorkshop = type => WORKSHOP_KEYS.some(k => type.toLowerCase().includes(k));
const placeOf = item => item.place || (item.type === "Intervalo" ? "" : "Local a confirmar");
const pxIcon = (name, cls = "") => `<svg class="px-icon${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="#px-${name}"></use></svg>`;

// Local com página própria vira botão de destaque; os demais ficam como texto.
function placeHtml(place, extraClass = "") {
  if (!place) return "";
  if (places[place]) {
    return `<button type="button" class="place-link${extraClass ? " " + extraClass : ""}" data-place="${esc(place)}" aria-haspopup="dialog" aria-label="${esc(place)}: fotos e mapa">${pxIcon("pin")}<span>${esc(place)}</span></button>`;
  }
  const tbd = place === "Local a confirmar";
  return `<small class="event-place${tbd ? " event-place--tbd" : ""}${extraClass ? " " + extraClass : ""}">${pxIcon("pin")}${esc(place)}</small>`;
}

// Horário oficial do Acre (UTC−5, sem horário de verão).
function acreNow() {
  const d = new Date(Date.now() - 5 * 3600000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, day: String(d.getUTCDate()).padStart(2, "0"), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}
const toMinutes = hhmm => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const eventToday = () => {
  const now = acreNow();
  return now.y === 2026 && now.m === 11 && days.some(d => d.id === now.day) ? now : null;
};

// "Prof. Dr." / "Prof.ª Dr.ª" ficam num campo à parte para não quebrar a
// ligação entre convidado e programação, que usa só o nome.
const TITLED = guests.filter(g => g.title).map(g => [g.name, `${g.title} ${g.name}`]);
const withTitles = text => TITLED.reduce((acc, [name, full]) => (acc.includes(full) ? acc : acc.split(name).join(full)), text);

/* =========================================================
   1. PROGRAMAÇÃO (LEVELS, FILTROS & PAINEL)
   ========================================================= */
const tabs = $("#day-tabs");
const scheduleFilters = $("#schedule-filters");
const panel = $("#schedule-panel");

let activeDay = "23";
let activeScheduleFilter = "all";

const scheduleFilterDefs = [
  { id: "all", label: "Tudo" },
  { id: "palestras", label: "Palestras & Mesas" },
  { id: "minicursos", label: "Minicursos & Oficinas" },
  { id: "gamejam", label: "Game Jam" }
];

const matchesScheduleFilter = (item, filterId) => {
  if (filterId === "all") return true;
  if (filterId === "minicursos") return isWorkshop(item.type);
  if (filterId === "gamejam") return item.type.toLowerCase().includes("game jam");
  return isTalk(item.type);
};

function renderScheduleFilters() {
  scheduleFilters.innerHTML = scheduleFilterDefs
    .map(f => `<button type="button" class="filter-chip${f.id === activeScheduleFilter ? " is-active" : ""}" data-filter="${f.id}" aria-pressed="${f.id === activeScheduleFilter}">${esc(f.label)}</button>`)
    .join("");
}

function showDay(day, focus = false) {
  activeDay = day;
  tabs.querySelectorAll("button").forEach(button => {
    const selected = button.dataset.day === day;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  const dayMeta = days.find(d => d.id === day);
  const dayItems = schedule.filter(item => item.day === day);
  const items = dayItems.filter(item => matchesScheduleFilter(item, activeScheduleFilter));
  panel.setAttribute("aria-labelledby", "day-" + day);

  const countLabel = activeScheduleFilter === "all" ? `${items.length} atividades` : `${items.length} de ${dayItems.length} atividades`;
  const headHtml = dayMeta
    ? `<div class="schedule-head"><span>${levelLabel(day)} · ${esc(dayMeta.name)} · ${esc(day)} NOV</span><strong>${countLabel}</strong></div>`
    : "";

  // Durante o evento: marca o que está acontecendo agora e o próximo.
  const today = eventToday();
  const liveMinutes = today && today.day === day ? today.minutes : null;
  const nextItem = liveMinutes === null ? null : items.find(it => it.type !== "Intervalo" && toMinutes(it.time) > liveMinutes);

  const rowsHtml = items.length
    ? items
        .map(item => {
          const lowerType = item.type.toLowerCase();
          const isBreak = lowerType === "intervalo";
          const isJam = lowerType.includes("game jam");
          const isTbd = lowerType.includes("confirmar");
          const place = placeOf(item);
          const start = toMinutes(item.time);
          const end = item.endTime ? toMinutes(item.endTime) : start + 30;
          const isNow = liveMinutes !== null && !isBreak && liveMinutes >= start && liveMinutes < end;
          const isNext = item === nextItem;
          const rowClass = "event-row" + (isBreak ? " event-row--break" : "") + (isTbd ? " event-row--tbd" : "") + (isNow ? " event-row--now" : "");
          const typeClass = "type" + (isJam ? " type--jam" : isBreak ? " type--break" : "");
          return (
            `<article class="${rowClass}">` +
            `<time datetime="2026-11-${esc(day)}T${esc(item.time)}">${esc(item.time)}${item.endTime ? "–" + esc(item.endTime) : ""}</time>` +
            `<div class="event-info">` +
            (isNow ? `<span class="live-badge">● AGORA</span>` : isNext ? `<span class="live-badge live-badge--next">PRÓXIMA</span>` : "") +
            // "Institucional" (credenciamento, solenidade, despedida) não leva etiqueta.
            (lowerType === "institucional" ? "" : `<span class="${typeClass}">${esc(item.type)}</span>`) +
            `<h3>${esc(item.title)}</h3>` +
            (item.speaker ? `<p>${esc(withTitles(item.speaker))}</p>` : "") +
            (item.note ? `<p class="event-note">${esc(item.note)}</p>` : "") +
            (place || item.seats
              ? `<div class="event-meta">` +
                placeHtml(place) +
                (item.seats ? `<small class="event-seats" title="Capacidade prevista no plano da atividade">${pxIcon("player")}≈ ${esc(item.seats)} vagas</small>` : "") +
                `</div>`
              : "") +
            `</div>` +
            `<span class="event-arrow" aria-hidden="true">${isBreak ? "·" : "↗"}</span>` +
            `</article>`
          );
        })
        .join("")
    : `<p class="schedule-empty">Nenhuma atividade desta categoria neste dia. Escolha outro dia ou clique em <strong>Tudo</strong>.</p>`;

  panel.innerHTML = headHtml + rowsHtml;
  if (focus) tabs.querySelector('[data-day="' + day + '"]')?.focus();
}

days.forEach((day, index) => {
  const button = document.createElement("button");
  const level = String(index + 1).padStart(2, "0");
  button.type = "button";
  button.id = "day-" + day.id;
  button.dataset.day = day.id;
  button.setAttribute("role", "tab");
  button.setAttribute("aria-controls", "schedule-panel");
  button.setAttribute("aria-label", `${day.name}, ${day.id} de novembro (level ${level})`);
  button.innerHTML =
    `<span class="day-level" aria-hidden="true"><span class="lv-long">LEVEL&nbsp;</span><span class="lv-short">LV.</span>${level}</span>` +
    `<small>${esc(day.weekday)}</small><strong>${esc(day.id)}</strong><span class="day-month">NOV</span>`;
  button.addEventListener("click", () => showDay(day.id));
  button.addEventListener("keydown", e => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const idx = days.findIndex(d => d.id === button.dataset.day);
    const target =
      e.key === "Home" ? 0 : e.key === "End" ? days.length - 1 : e.key === "ArrowRight" ? (idx + 1) % days.length : (idx - 1 + days.length) % days.length;
    showDay(days[target].id, true);
  });
  tabs.append(button);
});

renderScheduleFilters();
scheduleFilters.addEventListener("click", e => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  activeScheduleFilter = btn.dataset.filter;
  renderScheduleFilters();
  showDay(activeDay);
});
// Na semana do evento a programação já abre no dia de hoje.
showDay(eventToday()?.day || "23");

/* =========================================================
   2. CONVIDADOS (ATIVIDADES LIGADAS À PROGRAMAÇÃO + LINKS)
   ========================================================= */
const guestGrid = $("#guests-grid");
const guestFilters = $("#guest-filters");
const guestsExtra = $("#guests-extra");
const guestsMiniGrid = $("#guests-mini-grid");
const guestsMore = $("#guests-more");
const GUEST_PREVIEW = window.matchMedia("(max-width: 620px)").matches ? 6 : 9;

const initials = name => {
  const parts = name.split("(")[0].trim().split(" ").filter(Boolean);
  return ((parts[0]?.[0] || "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

const guestData = guests.map(guest => {
  const acts = schedule.filter(item => item.speaker && item.speaker.includes(guest.name));
  return {
    ...guest,
    acts,
    talk: acts.some(a => isTalk(a.type)),
    workshop: acts.some(a => isWorkshop(a.type)),
    days: new Set(acts.map(a => a.day))
  };
});

const guestCategoryDefs = [
  { id: "all", label: `Todos (${guestData.length})` },
  { id: "talks", label: `Palestras & Mesas (${guestData.filter(g => g.talk).length})` },
  { id: "workshops", label: `Minicursos & Oficinas (${guestData.filter(g => g.workshop).length})` }
];

let activeGuestCategory = "all";
let activeGuestDay = "all";
let guestsExpanded = false;

const LINK_META = {
  lattes: { icon: "lattes.svg", label: "Lattes" },
  linkedin: { icon: "linkedin.svg", label: "LinkedIn" },
  scholar: { icon: "google-scholar.svg", label: "Scholar" },
  site: { icon: "globe.svg", label: "Site" }
};

function renderGuestFilters() {
  const cat = guestCategoryDefs
    .map(f => `<button type="button" class="filter-chip${f.id === activeGuestCategory ? " is-active" : ""}" data-guest-filter="${f.id}" aria-pressed="${f.id === activeGuestCategory}">${esc(f.label)}</button>`)
    .join("");
  const dayChips = [{ id: "all", label: "Todos os dias" }, ...days.map(d => ({ id: d.id, label: `${d.weekday} ${d.id}`, lv: levelLabel(d.id) }))]
    .map(d => `<button type="button" class="filter-chip filter-chip--day${d.id === activeGuestDay ? " is-active" : ""}" data-guest-day="${d.id}" aria-pressed="${d.id === activeGuestDay}">${d.lv ? `<span class="chip-lv" aria-hidden="true">${d.lv}</span>` : ""}${esc(d.label)}</button>`)
    .join("");
  guestFilters.innerHTML =
    `<div class="filter-row" role="group" aria-label="Filtrar por atuação">${cat}</div>` +
    `<div class="filter-row filter-row--days" role="group" aria-label="Filtrar por dia">${dayChips}</div>`;
}

function buildLinks(guest) {
  const links = (guest.links || []).filter(l => /^https?:\/\//i.test(l.url));
  if (!links.length) return "";
  return (
    `<div class="guest-links">` +
    links
      .map(l => {
        const meta = LINK_META[l.type] || LINK_META.site;
        const label = l.label || meta.label;
        return `<a class="guest-link guest-link--${esc(l.type)}" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} de ${esc(guest.name)} (abre em nova aba)"><img src="./assets/icons/${meta.icon}" alt="" width="16" height="16" loading="lazy" decoding="async"><span>${esc(label)}</span></a>`;
      })
      .join("") +
    `</div>`
  );
}

function buildActs(guest, compact = false) {
  if (!guest.acts.length) return "";
  return (
    `<ul class="guest-acts${compact ? " guest-acts--compact" : ""}">` +
    guest.acts
      .map(a => {
        const d = days.find(x => x.id === a.day);
        const time = a.time + (a.endTime ? "–" + a.endTime : "");
        const place = placeOf(a);
        return (
          `<li><span class="guest-act-lv" aria-hidden="true">${levelLabel(a.day)}</span><div>` +
          `<strong>${esc(d.weekday)} ${esc(a.day)}/11 · ${esc(time)}</strong>` +
          (compact ? "" : `<span class="guest-act-title">${esc(a.title)}</span>`) +
          (place ? placeHtml(place, "place-link--small") : "") +
          `</div></li>`
        );
      })
      .join("") +
    `</ul>`
  );
}

function buildGuestCard(guest, extra) {
  const pos = guest.photoPosition || "50% 35%";
  const shift = guest.photoTranslate || "0%, 0%";
  const scale = Number.isFinite(guest.photoScale) ? guest.photoScale : 1;
  const imgStyle = `object-position:${pos};transform:translate(${shift}) scale(${scale});`;
  return (
    `<article class="guest-card${guest.talk ? " guest-card--featured" : ""}${extra ? " is-extra" : ""}">` +
    `<div class="guest-avatar" data-initials="${esc(initials(guest.name))}" aria-hidden="true">` +
    (guest.photo
      ? `<img src="${esc(guest.photo)}" alt="" loading="lazy" decoding="async" width="96" height="96" style="${imgStyle}">`
      : `<span>${esc(initials(guest.name))}</span>`) +
    `</div>` +
    `<div class="guest-details">` +
    `<span class="guest-role-badge">${guest.talk ? "★ " : ""}${esc(guest.role)}</span>` +
    `<h3>${guest.title ? `<span class="guest-title">${esc(guest.title)}</span> ` : ""}${esc(guest.name)}</h3>` +
    (guest.affiliation ? `<p class="guest-affiliation">${esc(guest.affiliation)}</p>` : "") +
    (guest.bio ? `<p class="guest-bio">${esc(guest.bio)}</p>` : "") +
    buildActs(guest) +
    buildLinks(guest) +
    `</div></article>`
  );
}

function buildGuestMiniCard(guest) {
  return (
    `<article class="guest-mini-card">` +
    `<div class="guest-avatar--monogram" aria-hidden="true">${esc(initials(guest.name))}</div>` +
    `<div class="guest-mini-info">` +
    `<h4>${esc(guest.name)}</h4>` +
    (guest.affiliation ? `<p>${esc(guest.affiliation)}</p>` : "") +
    buildActs(guest, true) +
    `</div></article>`
  );
}

function renderGuests() {
  const filtered = guestData.filter(g => {
    if (activeGuestCategory === "talks" && !g.talk) return false;
    if (activeGuestCategory === "workshops" && !g.workshop) return false;
    if (activeGuestDay !== "all" && !g.days.has(activeGuestDay)) return false;
    return true;
  });
  const portrait = filtered.filter(g => g.photo);
  const compact = filtered.filter(g => !g.photo);
  const limitActive = !guestsExpanded && activeGuestCategory === "all" && activeGuestDay === "all" && portrait.length > GUEST_PREVIEW;

  guestGrid.innerHTML = portrait.length
    ? portrait.map((g, i) => buildGuestCard(g, limitActive && i >= GUEST_PREVIEW)).join("")
    : `<p class="schedule-empty guests-empty">Nenhum convidado com foto neste filtro. Veja a lista abaixo ou escolha outro dia.</p>`;
  guestGrid.classList.toggle("is-collapsed", limitActive);

  if (guestsMore) {
    const hidden = limitActive ? portrait.length - GUEST_PREVIEW : 0;
    guestsMore.hidden = !hidden;
    guestsMore.querySelector("[data-more-count]").textContent = `+${hidden}`;
  }

  guestsExtra.hidden = !compact.length;
  guestsMiniGrid.innerHTML = compact.map(buildGuestMiniCard).join("");

  guestGrid.querySelectorAll(".guest-avatar img").forEach(img => {
    img.addEventListener(
      "error",
      () => {
        const span = document.createElement("span");
        span.textContent = img.closest(".guest-avatar")?.dataset.initials || "SI";
        img.replaceWith(span);
      },
      { once: true }
    );
  });
}

renderGuestFilters();
guestFilters.addEventListener("click", e => {
  const cat = e.target.closest("[data-guest-filter]");
  const day = e.target.closest("[data-guest-day]");
  if (!cat && !day) return;
  if (cat) activeGuestCategory = cat.dataset.guestFilter;
  if (day) activeGuestDay = day.dataset.guestDay;
  renderGuestFilters();
  renderGuests();
});
guestsMore?.addEventListener("click", () => {
  guestsExpanded = true;
  renderGuests();
  // O botão some; o foco vai para o primeiro convidado revelado.
  const firstNew = guestGrid.querySelectorAll(".guest-card")[GUEST_PREVIEW]?.querySelector("h3");
  if (firstNew) {
    firstNew.tabIndex = -1;
    firstNew.focus({ preventScroll: true });
  }
});
renderGuests();

/* =========================================================
   3. MINICURSOS & OFICINAS (QUESTS)
   ========================================================= */
$("#workshop-grid").innerHTML = workshops
  .map(
    (item, i) =>
      `<article class="workshop">` +
      `<div class="workshop-top"><div class="workshop-icon" aria-hidden="true">${pxIcon(item.icon)}</div><span class="workshop-quest" aria-hidden="true">QUEST ${String(i + 1).padStart(2, "0")}</span></div>` +
      `<p class="workshop-date">${esc(item.day)} · ${esc(item.time)}</p>` +
      `<h3>${esc(item.title)}</h3>` +
      (item.description ? `<p>${esc(item.description)}</p>` : "") +
      (item.seats || item.requirement
        ? `<div class="workshop-chips">` +
          (item.seats ? `<span title="Capacidade prevista no plano da atividade">${pxIcon("player")}≈ ${esc(item.seats)} vagas</span>` : "") +
          (item.requirement ? `<span>${esc(item.requirement)}</span>` : "") +
          `</div>`
        : "") +
      (item.speaker ? `<div class="workshop-speaker">${esc(withTitles(item.speaker))}</div>` : "") +
      `<div class="workshop-place${item.place ? "" : " workshop-place--tbd"}">${item.place && places[item.place] ? placeHtml(item.place) : pxIcon("pin") + esc(item.place || "Local a confirmar")}</div>` +
      `</article>`
  )
  .join("");

/* =========================================================
   CAIXA DE AGRADECIMENTO (ESTILO RPG) — LOCAIS E PARCEIROS
   ========================================================= */
// "theme" escolhe o visual em styles.css (.thanks-box--tema), "icon" é um ícone
// pixel do sprite e "badge" é o selo do canto. O texto aparece letra por letra
// (um toque mostra tudo) e fica completo para leitores de tela.
function makeThanksBox(root) {
  if (!root) return { show: () => false, type() {}, stop() {} };
  const name = root.querySelector(".thanks-box-name");
  const badge = root.querySelector(".thanks-box-badge");
  const sr = root.querySelector(".thanks-box-sr");
  const typed = root.querySelector(".thanks-box-typed");
  const rest = root.querySelector(".thanks-box-rest");
  let timer = 0;
  let full = "";
  const stop = () => {
    clearInterval(timer);
    timer = 0;
    typed.textContent = full;
    rest.textContent = "";
    root.classList.add("is-done");
  };
  root.addEventListener("click", () => {
    if (timer) stop();
  });
  const show = t => {
    clearInterval(timer);
    timer = 0;
    root.hidden = !(t && t.text);
    if (root.hidden) return false;
    root.className = "thanks-box" + (t.theme ? " thanks-box--" + t.theme : "");
    name.textContent = t.title || "OBRIGADO!";
    badge.textContent = t.badge || "+1 UP";
    root.querySelectorAll(".thanks-box-title use").forEach(u => u.setAttribute("href", "#px-" + (t.icon || "heart")));
    full = t.text;
    sr.textContent = full;
    typed.textContent = "";
    rest.textContent = full;
    return true;
  };
  const type = () => {
    if (root.hidden) return;
    if (prefersReducedMotion) {
      stop();
      return;
    }
    root.classList.remove("is-done");
    let shown = 0;
    timer = window.setInterval(() => {
      shown = Math.min(full.length, shown + 2);
      typed.textContent = full.slice(0, shown);
      rest.textContent = full.slice(shown);
      if (shown >= full.length) stop();
    }, 24);
  };
  return { show, type, stop };
}

/* =========================================================
   4. PARCEIROS (HALL DA FAMA + MODAL COM INSTAGRAM)
   ========================================================= */
const partnerContainer = $("#partner-groups");
const partnerDialog = $("#partner-dialog");
const partnerDialogTitle = $("#partner-dialog-title");
const partnerDialogTier = $("#partner-dialog-tier");
const partnerDialogDescription = $("#partner-dialog-description");
const partnerDialogLink = $("#partner-dialog-link");
const partnerDialogNoIg = $("#partner-dialog-noig");
const partnerDialogLogo = $("#partner-dialog-logo");
const partnerDialogLogoWrap = $("#partner-dialog-logo-wrap");
const partnerThanksBox = makeThanksBox($("#partner-thanks"));
const IG_ICON = `<img class="ig-icon" src="./assets/icons/instagram.svg" alt="" width="18" height="18" decoding="async">`;

const tierMeta = {
  Diamante: { slug: "diamante", badge: "Patrocinador Principal", icon: "diamond", spotlight: true },
  Platinum: { slug: "platinum", badge: "Comunidade & Apoio", icon: "star", spotlight: false },
  Esmeralda: { slug: "esmeralda", badge: "Patrocinador Destaque", icon: "gem", spotlight: true },
  Ouro: { slug: "ouro", badge: "Inovação & Conectividade", icon: "coin", spotlight: false },
  Bronze: { slug: "bronze", badge: "Apoio Local", icon: "medal", spotlight: true }
};

function renderPartnerTier(group, groupIndex) {
  const meta = tierMeta[group.tier] || { slug: group.tier.toLowerCase(), badge: "Parceiro Oficial", icon: "star", spotlight: false };
  const cardsHtml = group.items
    .map((item, itemIndex) => {
      const cls = "partner-card" + (meta.spotlight ? " partner-card--spotlight" : "") + (item.theme === "dark" ? " partner-card--dark" : "");
      const logoCls = "partner-logo" + (item.outline ? " partner-logo--outline" : "");
      const more = item.url ? `${IG_ICON} ${meta.spotlight ? "Instagram e detalhes" : "Saiba mais"}` : `<span class="partner-more-icon">ⓘ</span> Saiba mais`;
      const logoHtml = `<div class="partner-logo-stage"><img class="${logoCls}" src="${esc(item.logo)}" alt="" loading="lazy" decoding="async"><span class="partner-fallback" hidden>${esc(item.name)}</span></div>`;
      return (
        `<button type="button" class="${cls}" data-group="${groupIndex}" data-item="${itemIndex}" aria-haspopup="dialog" aria-label="Saiba mais sobre ${esc(item.name)}">` +
        logoHtml +
        (meta.spotlight
          ? `<div class="partner-spotlight-copy"><strong>${esc(item.name)}</strong><p>${esc(item.description)}</p><span class="partner-more" aria-hidden="true">${more} <span>↗</span></span></div>`
          : `<span class="partner-more" aria-hidden="true">${more} <span>↗</span></span>`) +
        `</button>`
      );
    })
    .join("");
  return (
    `<section class="partner-tier partner-tier--${meta.slug}">` +
    `<div class="partner-tier-head"><h3>${pxIcon(meta.icon, "tier-icon")} PARCEIRO ${esc(group.tier.toUpperCase())}</h3><span class="partner-tier-tag">${esc(meta.badge)}</span></div>` +
    `<div class="partner-logos">${cardsHtml}</div>` +
    `</section>`
  );
}

// Um ranking embaixo do outro; cotas com um parceiro só usam o card largo.
partnerContainer.innerHTML = partners.map(renderPartnerTier).join("");

// Com loading="lazy" o evento "error" basta: checar "complete" logo após o
// innerHTML poderia marcar como quebrado um logo que ainda nem começou a carregar.
partnerContainer.querySelectorAll(".partner-logo").forEach(img => {
  img.addEventListener(
    "error",
    () => {
      img.hidden = true;
      if (img.nextElementSibling) img.nextElementSibling.hidden = false;
    },
    { once: true }
  );
});

partnerContainer.addEventListener("click", event => {
  const card = event.target.closest(".partner-card");
  if (!card || !partnerContainer.contains(card)) return;
  const group = partners[Number(card.dataset.group)];
  const item = group?.items[Number(card.dataset.item)];
  if (!item) return;
  const meta = tierMeta[group.tier] || { slug: group.tier.toLowerCase(), icon: "star" };
  partnerDialog.dataset.tier = meta.slug;
  partnerDialogTier.innerHTML = pxIcon(meta.icon) + "PARCEIRO " + esc(group.tier.toUpperCase());
  partnerDialogLogo.src = item.logo;
  partnerDialogLogoWrap.classList.toggle("is-dark", Boolean(item.logoDark));
  partnerDialogTitle.textContent = item.name;
  partnerDialogDescription.textContent = item.description;
  const hasThanks = partnerThanksBox.show(item.thanks);
  const hasIg = /^https:\/\/www\.instagram\.com\//i.test(item.url || "");
  partnerDialogLink.hidden = !hasIg;
  if (partnerDialogNoIg) partnerDialogNoIg.hidden = hasIg;
  if (hasIg) {
    partnerDialogLink.href = item.url;
    partnerDialogLink.setAttribute("aria-label", "Ver Instagram de " + item.name + " (abre em nova aba)");
  }
  partnerDialog.showModal();
  if (hasThanks) partnerThanksBox.type();
});
if (partnerDialog) partnerDialog.addEventListener("close", partnerThanksBox.stop);

/* =========================================================
   4b. LOCAIS: LOGO, FRASE, CARROSSEL DE FOTOS E MAPA EXATO
   ========================================================= */
const placeDialog = $("#place-dialog");
const placeLogo = $("#place-logo");
const placeKicker = $("#place-kicker");
const placeTitle = $("#place-title");
const placeSub = $("#place-sub");
const placeLogoWrap = $("#place-logo-wrap");
const placeAbout = $("#place-about");
const placeLinks = $("#place-links");
const placeThanksBox = makeThanksBox($("#place-thanks"));
const placeCarousel = $("#place-carousel");
const placeSlides = $("#place-slides");
const placeDots = $("#place-dots");
const placeTimer = $("#place-timer");
const placeMap = $("#place-map");
const placeRoute = $("#place-route");
const placeMapNote = $("#place-map-note");
let slideIndex = 0;

const placeTarget = p => (p.lat != null ? `${p.lat},${p.lng}` : p.query);
const mapEmbedUrl = p => `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(placeTarget(p))}&z=${p.lat != null ? 18 : 16}&output=embed`;
const routeUrl = p => p.mapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(placeTarget(p))}`;

// Carrossel sem setas: as fotos trocam sozinhas (com fade) a cada SLIDE_MS.
// Pausa com o mouse em cima ou com foco; troca também por deslize, pelos
// pontinhos e pelas setas do teclado. Com "reduzir movimento", não passa sozinho.
// Só as 2 primeiras fotos carregam ao abrir; as outras, uma antes de aparecer.
const SLIDE_MS = 4000;
let slideTimer = 0;

function renderSlides(p) {
  const photos = (p.photos || []).filter(ph => ph && ph.src);
  placeSlides.innerHTML = photos.length
    ? photos
        .map((ph, i) =>
          `<figure class="place-slide${i ? "" : " is-active"}" aria-hidden="${i ? "true" : "false"}">` +
          `<img ${i < 2 ? "" : "data-"}src="${esc(ph.src)}" alt="${esc(ph.alt || p.name)}" decoding="async">` +
          (ph.caption ? `<figcaption>${esc(ph.caption)}</figcaption>` : "") +
          `</figure>`)
        .join("")
    : `<figure class="place-slide place-slide--soon is-active">${pxIcon("pin", "place-soon-icon")}<figcaption><strong>${esc(p.name)}</strong><span>Fotos do local em breve</span></figcaption></figure>`;
  const count = placeSlides.children.length;
  placeDots.innerHTML = count > 1
    ? Array.from({ length: count }, (_, i) => `<button type="button" class="place-dot${i ? "" : " is-active"}" data-slide="${i}" aria-label="Foto ${i + 1} de ${count}"></button>`).join("")
    : "";
  placeTimer.hidden = count < 2;
  slideIndex = 0;
}

function loadSlide(k) {
  const img = placeSlides.children[k]?.querySelector("img[data-src]");
  if (img) {
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  }
}

function goToSlide(i) {
  const slides = placeSlides.children;
  const count = slides.length;
  if (count < 2) return;
  slideIndex = (i + count) % count;
  loadSlide(slideIndex);
  loadSlide((slideIndex + 1) % count);
  [...slides].forEach((s, k) => {
    s.classList.toggle("is-active", k === slideIndex);
    s.setAttribute("aria-hidden", String(k !== slideIndex));
  });
  placeDots.querySelectorAll(".place-dot").forEach((d, k) => d.classList.toggle("is-active", k === slideIndex));
}

// Pausa enquanto o mouse está em cima ou o foco do teclado está no carrossel.
let holdHover = false;
let holdFocus = false;
function stopSlides() {
  clearInterval(slideTimer);
  slideTimer = 0;
  placeTimer.classList.remove("is-running");
}
function startSlides() {
  stopSlides();
  if (prefersReducedMotion || holdHover || holdFocus || placeSlides.children.length < 2 || !placeDialog.open) return;
  slideTimer = window.setInterval(() => {
    goToSlide(slideIndex + 1);
    restartTimerBar();
  }, SLIDE_MS);
  restartTimerBar();
}
// Barrinha de tempo (estilo barra de XP) até a próxima foto.
function restartTimerBar() {
  placeTimer.classList.remove("is-running");
  void placeTimer.offsetWidth;
  placeTimer.classList.add("is-running");
}
// Troca manual: vai para a foto e recomeça a contagem.
function stepSlide(i) {
  goToSlide(i);
  startSlides();
}

if (placeDialog) {
  placeTimer.style.setProperty("--slide-ms", SLIDE_MS + "ms");
  placeDots.addEventListener("click", e => {
    const dot = e.target.closest("[data-slide]");
    if (dot) stepSlide(Number(dot.dataset.slide));
  });
  placeSlides.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      stepSlide(slideIndex + (e.key === "ArrowRight" ? 1 : -1));
    }
  });
  let touchX = null;
  placeCarousel.addEventListener("touchstart", e => {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  placeCarousel.addEventListener("touchend", e => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 40) stepSlide(slideIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
  placeCarousel.addEventListener("pointerenter", e => {
    if (e.pointerType !== "mouse") return;
    holdHover = true;
    stopSlides();
  });
  placeCarousel.addEventListener("pointerleave", e => {
    if (e.pointerType !== "mouse") return;
    holdHover = false;
    startSlides();
  });
  placeCarousel.addEventListener("focusin", e => {
    if (!e.target.matches(":focus-visible")) return;
    holdFocus = true;
    stopSlides();
  });
  placeCarousel.addEventListener("focusout", e => {
    if (placeCarousel.contains(e.relatedTarget)) return;
    holdFocus = false;
    startSlides();
  });
  placeDialog.addEventListener("close", () => {
    holdHover = false;
    holdFocus = false;
    stopSlides();
  });
}

const PLACE_LINK_META = {
  instagram: { icon: "instagram.svg", label: "Instagram" },
  site: { icon: "globe.svg", label: "Site" }
};

// Logo no tamanho de exibição (os arquivos têm o dobro, para telas de alta densidade).
function fitLogo(img, size, maxW, maxH) {
  const [w, h] = size || [maxH, maxH];
  const s = Math.min(maxW / w, maxH / h, 1);
  img.width = Math.round(w * s);
  img.height = Math.round(h * s);
}

function renderPlaceLinks(p) {
  const links = (p.links || []).filter(l => /^https?:\/\//i.test(l.url));
  placeLinks.innerHTML = links
    .map(l => {
      const meta = PLACE_LINK_META[l.type] || PLACE_LINK_META.site;
      const label = l.label || meta.label;
      return `<a class="place-ext" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(label)} do ${esc(l.owner || p.name)} (abre em nova aba)"><img src="./assets/icons/${meta.icon}" alt="" width="16" height="16" decoding="async">${esc(label)}<span aria-hidden="true">↗</span></a>`;
    })
    .join("");
  placeLinks.hidden = !links.length;
}

if (placeDialog) placeDialog.addEventListener("close", placeThanksBox.stop);

function openPlace(name) {
  const p = places[name];
  if (!p || !placeDialog) return;
  placeKicker.innerHTML = pxIcon("pin") + esc(p.kicker || "LOCAL DA SASI");
  placeTitle.textContent = p.name;
  placeSub.textContent = p.subtitle || "";
  placeLogo.src = p.logo;
  fitLogo(placeLogo, p.logoSize, 210, 56);
  placeLogoWrap.classList.toggle("is-dark", Boolean(p.logoDark));
  placeAbout.textContent = p.about || "";
  placeAbout.hidden = !p.about;
  renderPlaceLinks(p);
  // Cada local tem o seu tema (cores, ícone, selo e enfeites próprios).
  const hasThanks = placeThanksBox.show(p.thanks);
  renderSlides(p);
  // O mapa só carrega quando alguém abre o local (e fica pronto para a próxima vez).
  const src = mapEmbedUrl(p);
  if (placeMap.dataset.current !== src) {
    placeMap.src = src;
    placeMap.dataset.current = src;
  }
  placeMap.title = `Mapa do local: ${p.name}`;
  placeRoute.href = routeUrl(p);
  placeMapNote.hidden = p.lat != null;
  holdHover = false;
  holdFocus = false;
  placeDialog.showModal();
  startSlides();
  if (hasThanks) placeThanksBox.type();
}

document.addEventListener("click", e => {
  const link = e.target.closest(".place-link, [data-place-open]");
  if (!link || !places[link.dataset.place]) return;
  e.preventDefault();
  openPlace(link.dataset.place);
});

// Cards "Locais da SASI" (seção do local): um por entrada de "places".
const placePicker = $("#place-picker");
if (placePicker) {
  placePicker.innerHTML = Object.entries(places)
    .map(([key, p]) => {
      const [w, h] = p.logoSize || [120, 56];
      return (
        `<button type="button" class="stage-card" data-place-open data-place="${esc(key)}" aria-haspopup="dialog" aria-label="${esc(p.name)}: fotos, mapa e agradecimento">` +
        `<span class="stage-card-logo${p.logoDark ? " is-dark" : ""}"><img src="${esc(p.logo)}" alt="" width="${w}" height="${h}" loading="lazy" decoding="async"></span>` +
        `<span class="stage-card-kicker">${esc(p.kicker || "LOCAL DA SASI")}</span>` +
        `<strong class="stage-card-name">${esc(p.name)}</strong>` +
        (p.subtitle ? `<span class="stage-card-sub">${esc(p.subtitle)}</span>` : "") +
        `<span class="stage-card-go" aria-hidden="true">VER LOCAL ▶</span>` +
        `</button>`
      );
    })
    .join("");
}

document.querySelectorAll("dialog [data-close-dialog], .partner-dialog-close").forEach(btn =>
  btn.addEventListener("click", () => btn.closest("dialog")?.close())
);
document.querySelectorAll("dialog").forEach(dialog =>
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  })
);

/* =========================================================
   5. MENU MÓVEL, HUD DE SCROLL (XP + SCORE) & TOPO
   ========================================================= */
const siteHeader = $("#site-header");
const menu = $(".menu-toggle");
const nav = $(".nav-links");
const scrollXpFill = $("#scroll-xp-fill");
const hudScore = $("#hud-score");
const backToTopBtn = $("#back-to-top");

const closeMenu = () => {
  menu.setAttribute("aria-expanded", "false");
  nav.classList.remove("open");
};
menu.addEventListener("click", () => {
  const opened = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!opened));
  nav.classList.toggle("open", !opened);
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", e => {
  if (nav.classList.contains("open") && !siteHeader.contains(e.target)) closeMenu();
});
backToTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));

let lastScrolled = false;
let lastBackToTopVisible = false;
let lastScoreText = "";
let scrollRafPending = false;
let runStart = 0;

const syncScrollUi = () => {
  scrollRafPending = false;
  const y = window.scrollY;
  const scrolled = y > 18;
  if (scrolled !== lastScrolled) {
    lastScrolled = scrolled;
    siteHeader.classList.toggle("header--scrolled", scrolled);
  }
  const showTop = y > 460;
  if (showTop !== lastBackToTopVisible) {
    lastBackToTopVisible = showTop;
    backToTopBtn?.classList.toggle("is-visible", showTop);
  }
  const doc = document.documentElement;
  const ratio = Math.min(1, Math.max(0, y / Math.max(1, doc.scrollHeight - window.innerHeight)));
  if (scrollXpFill) scrollXpFill.style.transform = `scaleX(${ratio.toFixed(4)})`;
  if (hudScore) {
    const text = String(Math.round(ratio * 30000)).padStart(6, "0");
    if (text !== lastScoreText) {
      lastScoreText = text;
      hudScore.textContent = text;
    }
  }
  // Easter egg "Speedrun": do topo ao fim da página em menos de 12 s.
  if (!runStart && y > 120) runStart = performance.now();
  if (y < 40) runStart = 0;
  if (runStart && ratio > 0.985) {
    const seconds = (performance.now() - runStart) / 1000;
    runStart = 0;
    if (seconds < 12) unlockAchievement("speedrun", `${seconds.toFixed(1)} s do topo ao fim`);
  }
};
window.addEventListener(
  "scroll",
  () => {
    if (!scrollRafPending) {
      scrollRafPending = true;
      window.requestAnimationFrame(syncScrollUi);
    }
  },
  { passive: true }
);
window.addEventListener("resize", () => window.requestAnimationFrame(syncScrollUi), { passive: true });

/* =========================================================
   6. CONTAGEM REGRESSIVA
   ========================================================= */
const countdownEl = $("#quest-countdown");
const eventStartMs = Date.parse("2026-11-23T07:30:00-05:00");
const eventEndMs = Date.parse("2026-11-27T18:00:00-05:00");

function updateQuestCountdown() {
  if (!countdownEl) return;
  const now = Date.now();
  if (now >= eventEndMs) {
    countdownEl.textContent = "✦ 3ª EDIÇÃO CONCLUÍDA";
    return;
  }
  if (now >= eventStartMs) {
    countdownEl.textContent = "🎮 AO VIVO NA UFAC!";
    return;
  }
  const diff = eventStartMs - now;
  const totalHours = Math.floor(diff / 3600000);
  const daysLeft = Math.floor(totalHours / 24);
  const hoursLeft = totalHours % 24;
  const minsLeft = Math.floor((diff % 3600000) / 60000);
  countdownEl.textContent =
    daysLeft > 0
      ? `⏳ FALTAM ${daysLeft}D · ${String(hoursLeft).padStart(2, "0")}H`
      : `⏳ HOJE EM ${String(hoursLeft).padStart(2, "0")}H ${String(minsLeft).padStart(2, "0")}M`;
}
updateQuestCountdown();

// Na semana do evento, refaz a programação só quando "agora"/"próxima" mudam.
const liveKey = () => {
  const t = eventToday();
  if (!t) return "";
  const items = schedule.filter(i => i.day === t.day && i.type !== "Intervalo");
  const now = items.filter(i => t.minutes >= toMinutes(i.time) && t.minutes < (i.endTime ? toMinutes(i.endTime) : toMinutes(i.time) + 30)).map(i => i.title).join("|");
  const next = items.find(i => toMinutes(i.time) > t.minutes)?.title || "";
  return `${t.day}#${now}#${next}`;
};
let lastLiveKey = liveKey();
window.setInterval(() => {
  if (document.hidden) return;
  updateQuestCountdown();
  const key = liveKey();
  if (key !== lastLiveKey) {
    lastLiveKey = key;
    if (key && activeDay === eventToday()?.day) showDay(activeDay);
  }
}, 60000);

/* =========================================================
   7. LOGO ANIMADA + BOOST XP + SFX 8-BIT + MODO DESCANSO
   ========================================================= */
const logoStage = $("#hero-logo-stage");
const logoTrigger = $("#hero-logo-trigger");
const xpSegs = Array.from(document.querySelectorAll("#sasi-xp-segs rect"));
const xpStatus = $("#hero-xp-status");
const particleLayer = $("#hero-particle-layer");
const sfxBtn = $("#hero-sfx-toggle");
const sfxIcon = $("#hero-sfx-icon");
const arcadeToast = $("#arcade-toast");
const easterFxLayer = $("#easter-fx-layer");

let sfxEnabled = false;
let audioCtx = null;

function tone(freq, start, dur, gainValue = 0.03, type = "square") {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(start);
  osc.stop(start + dur);
}

// Ligar o áudio do navegador leva ~50 ms e travava a tela bem na hora do
// segredo. Agora ele liga num momento ocioso depois do primeiro toque ou tecla
// e é suspenso quando fica alguns segundos em silêncio.
let audioSleepTimer = null;
function ensureAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
  clearTimeout(audioSleepTimer);
  audioSleepTimer = window.setTimeout(() => {
    if (audioCtx?.state === "running") audioCtx.suspend().catch(() => {});
  }, 4000);
  return audioCtx;
}
function warmAudioSoon() {
  if (audioCtx) return;
  const idle = window.requestIdleCallback || (cb => window.setTimeout(cb, 250));
  idle(() => ensureAudio(), { timeout: 1500 });
}
// pointerup (toque ou clique) e keydown contam como gesto; rolar a página não conta.
["pointerup", "keydown"].forEach(type => window.addEventListener(type, warmAudioSoon, { once: true, passive: true }));

function play8BitSfx(kind = "step", level = 13, forcePlay = false) {
  if (!sfxEnabled && !forcePlay) return;
  try {
    if (!ensureAudio()) return;
    const now = audioCtx.currentTime;
    if (kind === "step") tone(320 + level * 26, now, 0.045, 0.022);
    else if (kind === "coin") {
      tone(987.77, now, 0.07, 0.035);
      tone(1318.51, now + 0.07, 0.22, 0.035);
    } else if (kind === "fanfare") {
      [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.51].forEach((f, i) => tone(f, now + [0, 0.075, 0.15, 0.225, 0.33, 0.41, 0.52][i], i === 6 ? 0.26 : 0.085, 0.038));
    } else [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, now + i * 0.055, 0.08, 0.036));
  } catch {
    // O navegador bloqueou o Web Audio antes de uma interação.
  }
}

if (sfxBtn && sfxIcon) {
  sfxBtn.addEventListener("click", () => {
    sfxEnabled = !sfxEnabled;
    sfxBtn.setAttribute("aria-pressed", String(sfxEnabled));
    sfxIcon.textContent = sfxEnabled ? "🔊" : "🔇";
    if (sfxEnabled) play8BitSfx("levelup");
  });
}

let xpTick = 12;
let xpTimer = null;
let boostTimeout = null;
let heroVisible = true;
let logoResting = false;

function applyXpBar(filledCount) {
  const total = xpSegs.length;
  for (let i = 0; i < total; i++) {
    const on = i < filledCount;
    xpSegs[i].classList.toggle("is-on", on);
    xpSegs[i].classList.toggle("is-tip", on && i === filledCount - 1);
  }
  const isLevelUp = filledCount >= total;
  logoStage?.classList.toggle("is-levelup", isLevelUp);
  if (xpStatus) xpStatus.textContent = isLevelUp ? "XP 19/19 • LVL UP!" : `XP ${filledCount}/19 • ${Math.round((filledCount / total) * 100)}%`;
}

function advanceXpLoop() {
  xpTick = (xpTick + 1) % 25;
  const filled = Math.min(19, Math.max(1, xpTick + 1));
  applyXpBar(filled);
  if (xpTick === 18) play8BitSfx("levelup");
  else if (xpTick < 18) play8BitSfx("step", filled);
}

function startXpLoop() {
  if (prefersReducedMotion || xpTimer || !heroVisible || logoResting || document.hidden || !xpSegs.length) return;
  xpTimer = window.setInterval(advanceXpLoop, 145);
}
function stopXpLoop() {
  if (xpTimer) {
    clearInterval(xpTimer);
    xpTimer = null;
  }
}

// Modo descanso: a logo anima enquanto a pessoa interage e para depois de 12 s
// parada, como uma máquina de arcade em espera. Economiza CPU e bateria.
const LOGO_IDLE_MS = 12000;
let restTimer = null;
let lastWake = -Infinity;
function wakeLogo() {
  if (prefersReducedMotion || !logoStage) return;
  const now = performance.now();
  if (!logoResting && now - lastWake < 600) return;
  lastWake = now;
  if (logoResting) {
    logoResting = false;
    logoStage.classList.remove("is-resting");
    startXpLoop();
  }
  clearTimeout(restTimer);
  restTimer = window.setTimeout(() => {
    logoResting = true;
    logoStage.classList.add("is-resting");
    stopXpLoop();
  }, LOGO_IDLE_MS);
}
["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach(type =>
  window.addEventListener(type, wakeLogo, { passive: true })
);

let logoComboCount = 0;
let logoComboReset = null;
let partyTimer = null;

function spawnParticleBurst(clientX, clientY, customLabel) {
  if (prefersReducedMotion || !particleLayer || !logoStage || particleLayer.childElementCount > 24) return;
  const rect = logoStage.getBoundingClientRect();
  const originX = clientX ? clientX - rect.left : rect.width * 0.5;
  const originY = clientY ? clientY - rect.top : rect.height * 0.45;
  for (let i = 0; i < 7; i++) {
    const el = document.createElement("span");
    const isLabel = i === 0;
    el.className = isLabel ? "xp-particle" : "xp-particle xp-particle--sq";
    if (isLabel) el.textContent = customLabel || (Math.random() > 0.4 ? "+1 UP" : "LVL UP!");
    el.style.left = `${originX + (Math.random() - 0.5) * 34}px`;
    el.style.top = `${originY + (Math.random() - 0.5) * 20}px`;
    particleLayer.appendChild(el);
    const dx = Math.round((Math.random() - 0.5) * 96);
    const dy = Math.round(-38 - Math.random() * 48);
    el.animate(
      [
        { opacity: 1, transform: "translate(-50%, -50%) scale(0.8)" },
        { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1)` }
      ],
      { duration: 750, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    ).onfinish = () => el.remove();
  }
}

function boostLogoXp(clientX, clientY, customLabel) {
  if (!logoStage) return;
  wakeLogo();
  xpTick = 19;
  applyXpBar(19);
  logoStage.classList.add("is-boosted");
  clearTimeout(boostTimeout);
  boostTimeout = window.setTimeout(() => logoStage.classList.remove("is-boosted"), 900);
  spawnParticleBurst(clientX, clientY, customLabel);
  play8BitSfx("levelup");
}

function spawnEasterConfetti(tags = ["+30 UP", "30 ANOS", "SI UFAC", "LVL MAX!"]) {
  if (prefersReducedMotion || !easterFxLayer || easterFxLayer.childElementCount > 40) return;
  const palette = ["#00ff33", "#FF8E17", "#72e8ff", "#ffffff", "#a9ffb5"];
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const pieces = [];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement("span");
    const isTag = i % 6 === 0;
    el.className = isTag ? "easter-confetti easter-confetti--tag" : "easter-confetti easter-confetti--px";
    if (isTag) el.textContent = tags[Math.floor(i / 6) % tags.length];
    el.style.setProperty("--c", palette[i % palette.length]);
    pieces.push(el);
  }
  easterFxLayer.append(...pieces);
  // Valores calculados aqui (sem var() nos quadros-chave) deixam a animação na GPU.
  pieces.forEach(el => {
    const sx = Math.round(vw * (0.12 + Math.random() * 0.76));
    const sy = Math.round(vh * (0.38 + Math.random() * 0.36));
    const vx = Math.round((Math.random() - 0.5) * 380);
    const vy = Math.round(-220 - Math.random() * 180 + Math.random() * 460);
    const rot = Math.round((Math.random() - 0.5) * 720);
    el.animate(
      [
        { opacity: 0, transform: `translate3d(${sx}px, ${sy}px, 0) scale(0.4) rotate(0deg)`, easing: ease },
        { opacity: 1, transform: `translate3d(${sx + vx * 0.35}px, ${sy + vy * 0.55}px, 0) scale(1.15) rotate(${rot * 0.3}deg)`, offset: 0.12, easing: ease },
        { opacity: 0, transform: `translate3d(${sx + vx}px, ${sy + vy}px, 0) scale(0.9) rotate(${rot}deg)` }
      ],
      { duration: 1450 + Math.random() * 750, fill: "forwards" }
    ).onfinish = () => el.remove();
  });
}

function launchEasterEggParty(message = "🏆 +30 VIDAS DESBLOQUEADAS — MODO ESPECIAL 30 ANOS SI UFAC!") {
  boostLogoXp(undefined, undefined, "+30 VIDAS!");
  if (xpStatus) xpStatus.textContent = "XP 30/19 • +30 VIDAS!";
  document.body.classList.add("is-konami-party");
  clearTimeout(partyTimer);
  partyTimer = window.setTimeout(() => document.body.classList.remove("is-konami-party"), 4200);
  spawnEasterConfetti();
  play8BitSfx("fanfare", 19, true);
  showArcadeToast(message, true);
}

if (logoTrigger && logoStage) {
  logoTrigger.addEventListener("click", e => {
    logoComboCount += 1;
    clearTimeout(logoComboReset);
    logoComboReset = window.setTimeout(() => {
      logoComboCount = 0;
    }, 2400);
    if (logoComboCount >= 5) {
      logoComboCount = 0;
      launchEasterEggParty();
      unlockAchievement("combo");
    } else {
      boostLogoXp(e.clientX || undefined, e.clientY || undefined, logoComboCount >= 2 ? `COMBO ×${logoComboCount}!` : undefined);
    }
  });
}

// Fila de avisos: conquistas seguidas não se atropelam.
const toastQueue = [];
let toastBusy = false;
let toastTimer = null;
function showArcadeToast(message, isParty = false) {
  if (!arcadeToast) return;
  toastQueue.push({ message, isParty });
  if (!toastBusy) nextToast();
}
function nextToast() {
  const next = toastQueue.shift();
  if (!next) {
    toastBusy = false;
    return;
  }
  toastBusy = true;
  arcadeToast.textContent = next.message;
  arcadeToast.classList.toggle("arcade-toast--party", next.isParty);
  arcadeToast.hidden = false;
  window.requestAnimationFrame(() => arcadeToast.classList.add("is-open"));
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    arcadeToast.classList.remove("is-open");
    window.setTimeout(() => {
      arcadeToast.hidden = true;
      arcadeToast.classList.remove("arcade-toast--party");
      nextToast();
    }, 260);
  }, toastQueue.length ? 2600 : 4200);
}

/* =========================================================
   8. EASTER EGGS & CONQUISTAS (SAVE FILE NO NAVEGADOR)
   ========================================================= */
const ACHIEVEMENTS = [
  { id: "konami", title: "Código Konami", hint: "Use as setas e as letras B e A, como nos fliperamas.", tier: "gold" },
  { id: "combo", title: "Combo ×5", hint: "Toque 5 vezes seguidas na logo do topo.", tier: "bronze" },
  { id: "crt", title: "Modo CRT", hint: "Digite o nome do evento em qualquer lugar da página.", tier: "silver" },
  { id: "ufac", title: "30 anos de SI", hint: "Digite a sigla da universidade.", tier: "silver" },
  { id: "coin", title: "Ficha inserida", hint: "Coloque 3 fichas na máquina do rodapé.", tier: "bronze" },
  { id: "jam", title: "Press Start", hint: "Ligue o console da Game Jam até o fim.", tier: "bronze" },
  { id: "explorer", title: "Mapa 100%", hint: "Passe por todas as fases (seções) da página.", tier: "bronze" },
  { id: "speedrun", title: "Speedrun", hint: "Vá do topo ao fim da página em menos de 12 segundos.", tier: "gold" },
  { id: "invader", title: "Caça ao invasor", hint: "Tem um alienígena passando na faixa verde. Pegue ele!", tier: "silver" },
  { id: "turbo", title: "Modo turbo", hint: "Clique 3 vezes seguidas na faixa verde.", tier: "bronze" }
];
// Bronze, prata e ouro como nos consoles; a platina vem com os 10. Total: 1000G.
const TIERS = {
  bronze: { label: "Bronze", pts: 50, cls: "t-bronze" },
  silver: { label: "Prata", pts: 100, cls: "t-silver" },
  gold: { label: "Ouro", pts: 200, cls: "t-gold" },
  plat: { label: "Platina", pts: 50, cls: "t-plat" }
};
const TOTAL_G = ACHIEVEMENTS.reduce((sum, a) => sum + TIERS[a.tier].pts, 0) + TIERS.plat.pts;
const STAMP_KEY = "sasi26:conquistas-quando";
const SITE_URL = "https://sasiufac.github.io/SASI2026/";
const SHARE_ART = "./assets/share/conquista-sasi2026.jpg?v=20261113a";
const SHARE_TEXT = `🏆 Desvendei todos os segredos do site da SASI 2026! Você consegue fazer o mesmo? ${SITE_URL}`;
const cupSvg = () => `<svg class="ach-cup" aria-hidden="true" focusable="false"><use href="#px-cup"></use></svg>`;
const LOCK_SVG = `<svg class="ach-lock" aria-hidden="true" focusable="false"><use href="#px-lock"></use></svg>`;
const STORAGE_KEY = "sasi26:conquistas";
const achievementsBtn = $("#achievements-btn");
const achievementsCount = $("#achievements-count");
const achievementsDialog = $("#achievements-dialog");
const achievementsList = $("#achievements-list");

const achPct = $("#ach-pct");
const achScore = $("#ach-score");
const achBarFill = $("#ach-bar-fill");
const achTiers = $("#ach-tiers");
const achPlatBadge = $("#ach-plat-badge");
const achShareOpen = $("#ach-share-open");

let unlocked = new Set();
let stamps = {};
try {
  unlocked = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").filter(id => ACHIEVEMENTS.some(a => a.id === id)));
  stamps = JSON.parse(localStorage.getItem(STAMP_KEY) || "{}") || {};
} catch {
  unlocked = new Set();
}
const isPlatinum = () => unlocked.size === ACHIEVEMENTS.length;

function saveAchievements() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...unlocked]));
    localStorage.setItem(STAMP_KEY, JSON.stringify(stamps));
  } catch {
    // Navegação privada pode bloquear o localStorage; o progresso fica só na sessão.
  }
}

function unlockedText(id) {
  const t = stamps[id];
  if (!t) return "Desbloqueado";
  const d = new Date(t);
  const p2 = n => String(n).padStart(2, "0");
  return `Desbloqueado em ${p2(d.getDate())}/${p2(d.getMonth() + 1)} às ${p2(d.getHours())}:${p2(d.getMinutes())}`;
}

function renderAchievements() {
  const got = unlocked.size;
  const total = ACHIEVEMENTS.length;
  const plat = isPlatinum();
  const score = ACHIEVEMENTS.reduce((sum, a) => sum + (unlocked.has(a.id) ? TIERS[a.tier].pts : 0), 0) + (plat ? TIERS.plat.pts : 0);
  if (achievementsCount) achievementsCount.textContent = `${got}/${total}`;
  achievementsBtn?.classList.toggle("is-complete", plat);
  if (achPct) achPct.textContent = `${Math.round((got / total) * 100)}%`;
  if (achScore) achScore.textContent = `${score}/${TOTAL_G} G`;
  if (achBarFill) achBarFill.style.transform = `scaleX(${got / total})`;
  if (achPlatBadge) achPlatBadge.className = "ach-plat-badge " + (plat ? "t-plat is-unlocked" : "t-locked");
  if (achShareOpen) achShareOpen.hidden = !plat;
  if (achTiers) {
    achTiers.innerHTML =
      ["bronze", "silver", "gold"]
        .map(t => {
          const all = ACHIEVEMENTS.filter(a => a.tier === t);
          return `<span class="tier ${TIERS[t].cls}">${cupSvg()} ${all.filter(a => unlocked.has(a.id)).length}/${all.length} <span class="sr-only">${TIERS[t].label}</span></span>`;
        })
        .join("") + `<span class="tier ${plat ? "t-plat" : "t-locked"}">${cupSvg()} ${plat ? 1 : 0}/1 <span class="sr-only">Platina</span></span>`;
  }
  if (achievementsList) {
    achievementsList.innerHTML = ACHIEVEMENTS.map(a => {
      const t = TIERS[a.tier];
      const ok = unlocked.has(a.id);
      return (
        `<li class="ach-item ${t.cls} ${ok ? "is-unlocked" : "is-locked"}">` +
        `<span class="ach-badge">${cupSvg()}${ok ? "" : LOCK_SVG}</span>` +
        `<div class="ach-text"><strong>${ok ? esc(a.title) : "Troféu oculto"}</strong><small>${ok ? unlockedText(a.id) : "Dica: " + esc(a.hint)}</small></div>` +
        `<span class="ach-pts">${t.label}<br>${t.pts}G</span></li>`
      );
    }).join("");
  }
}

// Aviso de conquista: fila própria, no alto da tela, sem esperar os outros avisos.
const achToast = $("#ach-toast");
const achToastKicker = $("#ach-toast-kicker");
const achToastTitle = $("#ach-toast-title");
const achQueue = [];
let achBusy = false;
function showAchievementToast(kicker, title, tierCls, onStart) {
  if (!achToast) return;
  achQueue.push({ kicker, title, tierCls, onStart });
  if (!achBusy) nextAchievementToast();
}
function nextAchievementToast() {
  const next = achQueue.shift();
  if (!next) {
    achBusy = false;
    return;
  }
  achBusy = true;
  achToast.className = `ach-toast ${next.tierCls}`;
  achToastKicker.textContent = next.kicker;
  achToastTitle.textContent = next.title;
  achToast.hidden = false;
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => achToast.classList.add("is-playing")));
  next.onStart?.();
  window.setTimeout(() => {
    achToast.hidden = true;
    achToast.classList.remove("is-playing");
    nextAchievementToast();
  }, 4000);
}

function playTrophySfx(tier) {
  try {
    if (!ensureAudio()) return;
    const now = audioCtx.currentTime + 0.02;
    if (tier === "plat") {
      [659.25, 830.61, 987.77, 1318.51, 1661.22].forEach((f, i) => tone(f, now + i * 0.09, i === 4 ? 0.5 : 0.14, 0.045, "triangle"));
    } else {
      tone(tier === "gold" ? 880 : 783.99, now, 0.12, 0.05, "triangle");
      tone(tier === "gold" ? 1318.51 : 1174.66, now + 0.1, 0.34, 0.05, "triangle");
    }
  } catch {
    // Sem áudio disponível: o aviso aparece em silêncio.
  }
}

function unlockAchievement(id, detail = "") {
  const meta = ACHIEVEMENTS.find(a => a.id === id);
  if (!meta || unlocked.has(id)) return;
  unlocked.add(id);
  stamps[id] = Date.now();
  if (isPlatinum()) stamps.platinum = Date.now();
  saveAchievements();
  renderAchievements();
  achievementsBtn?.classList.add("is-bump");
  window.setTimeout(() => achievementsBtn?.classList.remove("is-bump"), 700);
  const t = TIERS[meta.tier];
  showAchievementToast(`Conquista desbloqueada · ${t.pts}G`, `${meta.title}${detail ? " · " + detail : ""}`, t.cls, () => playTrophySfx(meta.tier));
  if (isPlatinum()) {
    window.setTimeout(() => launchEasterEggParty("👾 100% — VOCÊ ZEROU A SASI 2026! NOS VEMOS NA UFAC."), 900);
    showAchievementToast("Troféu de platina · 50G", "Zerou a SASI 2026", "t-plat", () => {
      playTrophySfx("plat");
      window.setTimeout(openPlatinum, 1600);
    });
  }
}

// Platina: parabéns + arte pronta para o status do WhatsApp ou o Story do Instagram.
const platDialog = $("#platinum-dialog");
const platArt = $("#plat-art");
const platShare = $("#plat-share");
const platDownload = $("#plat-download");
const platWhats = $("#plat-whats");
const platCopy = $("#plat-copy");
// Linha de aviso (ex.: "Link do site copiado!"), vazia até alguém usar um botão.
const platStatus = $("#plat-status");
let shareFile = null;

function prepareShareFile() {
  if (shareFile || !window.fetch || typeof File !== "function") return;
  fetch(SHARE_ART)
    .then(r => (r.ok ? r.blob() : null))
    .then(blob => {
      if (blob) shareFile = new File([blob], "sasi2026-conquista.jpg", { type: "image/jpeg" });
    })
    .catch(() => {});
}

function openPlatinum() {
  if (!platDialog || !isPlatinum()) return;
  if (!platArt.getAttribute("src")) platArt.src = SHARE_ART;
  if (platWhats) platWhats.href = "https://wa.me/?text=" + encodeURIComponent(SHARE_TEXT);
  if (platStatus) platStatus.textContent = "";
  prepareShareFile();
  document.querySelectorAll("dialog[open]").forEach(d => d !== platDialog && d.close());
  if (!platDialog.open) platDialog.showModal();
}

function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text).then(() => true, () => false);
  return Promise.resolve(false);
}

function shareFallback() {
  // Sem a janela de compartilhar do celular (ex.: computador): baixa a arte e copia o texto com o link.
  platDownload?.click();
  copyText(SHARE_TEXT).then(ok => {
    if (platStatus) platStatus.textContent = ok ? "Imagem baixada e texto com o link copiado. É só postar pelo app." : "Imagem baixada. É só postar pelo app.";
  });
}

platShare?.addEventListener("click", () => {
  // Sem await antes do share: o Safari só aceita compartilhar dentro do clique.
  const data = shareFile ? { files: [shareFile], text: SHARE_TEXT } : null;
  const done = () => {
    if (platStatus) platStatus.textContent = "Conquista compartilhada! 🎉";
  };
  const fail = err => {
    if (err?.name !== "AbortError") shareFallback();
  };
  if (data && navigator.canShare?.(data)) {
    navigator.share(data).then(done, fail);
  } else if (navigator.share) {
    navigator.share({ title: "SASI 2026", text: SHARE_TEXT }).then(done, fail);
  } else {
    shareFallback();
  }
});

platCopy?.addEventListener("click", () =>
  copyText(SITE_URL).then(ok => {
    if (platStatus) platStatus.textContent = ok ? "Link do site copiado!" : `Copie o link: ${SITE_URL}`;
  })
);

achShareOpen?.addEventListener("click", openPlatinum);
achievementsBtn?.addEventListener("click", () => {
  renderAchievements();
  achievementsDialog?.showModal();
});
renderAchievements();

// Palavras secretas digitadas (fora de campos de texto) e Código Konami.
const konamiSeq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiPos = 0;
let typed = "";
let crtTimer = null;

function startCrtMode() {
  document.body.classList.add("is-crt");
  clearTimeout(crtTimer);
  crtTimer = window.setTimeout(() => document.body.classList.remove("is-crt"), 8000);
  showArcadeToast("📺 MODO CRT LIGADO — 8 SEGUNDOS DE 1989");
  play8BitSfx("levelup", 13, true);
}

document.addEventListener("keydown", e => {
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if (key === konamiSeq[konamiPos]) {
    konamiPos++;
    if (konamiPos === konamiSeq.length) {
      konamiPos = 0;
      launchEasterEggParty();
      unlockAchievement("konami");
    }
  } else {
    konamiPos = key === konamiSeq[0] ? 1 : 0;
  }
  if (key.length === 1 && /[a-z0-9]/.test(key)) {
    typed = (typed + key).slice(-8);
    if (typed.endsWith("sasi")) {
      typed = "";
      startCrtMode();
      unlockAchievement("crt");
    } else if (typed.endsWith("ufac")) {
      typed = "";
      spawnEasterConfetti(["30 ANOS", "SI UFAC", "+30 XP", "UFAC ♥"]);
      showArcadeToast("🎓 30 ANOS DE SISTEMAS DE INFORMAÇÃO NA UFAC!", true);
      play8BitSfx("fanfare", 19, true);
      unlockAchievement("ufac");
    }
  }
});

// INSERT COIN no rodapé: 3 fichas chamam o "player 2".
const coinBtn = $("#insert-coin");
const coinCredit = $("#coin-credit");
let credits = 0;
coinBtn?.addEventListener("click", () => {
  credits = Math.min(99, credits + 1);
  if (coinCredit) coinCredit.textContent = `CREDIT ${String(credits).padStart(2, "0")}`;
  coinBtn.classList.remove("is-coin");
  void coinBtn.offsetWidth;
  coinBtn.classList.add("is-coin");
  play8BitSfx("coin", 13, true);
  if (credits === 3) {
    showArcadeToast("🕹️ PLAYER 2 ENTROU NO JOGO! TRAGA UM AMIGO PARA A SASI.");
    unlockAchievement("coin");
  }
});

/* =========================================================
   9. CONSOLE GAME_JAM.exe
   ========================================================= */
const jamWindow = $("#jam-window");
const jamStatus = $("#jam-window-status");
const jamMain = $("#jam-window-main");
const jamMeter = $("#jam-window-meter");
if (jamWindow && jamStatus && jamMain && jamMeter) {
  const jamStates = [
    { status: "PLAYER 01 / READY", main: "PRESS<br>START", meter: "▰▰▰▱▱" },
    { status: "23 NOV · 17H · TEMA", main: "INSERT<br>COIN", meter: "▰▰▰▰▱" },
    { status: "ENVIO ATÉ 26 NOV · 15H", main: "BUILD<br>NOW!", meter: "▰▰▰▰▰" }
  ];
  let jamIdx = 0;
  jamWindow.addEventListener("click", () => {
    jamIdx = (jamIdx + 1) % jamStates.length;
    const next = jamStates[jamIdx];
    jamStatus.textContent = next.status;
    jamMain.innerHTML = next.main;
    jamMeter.textContent = next.meter;
    play8BitSfx("levelup");
    if (jamIdx === jamStates.length - 1) unlockAchievement("jam");
  });
}

/* =========================================================
   10. FAIXA (TICKER) QUE SEMPRE PREENCHE A TELA
   ========================================================= */
const TICKER_TERMS = [
  "CONHECIMENTO", "INOVAÇÃO", "COMUNIDADE", "JOGOS", "GAME JAM", "INTELIGÊNCIA ARTIFICIAL",
  "PIXEL ART", "COMPUTAÇÃO EM NUVEM", "VISÃO COMPUTACIONAL", "PESQUISA", "EMPREENDEDORISMO",
  "30 ANOS DE SI", "PALESTRAS", "MINICURSOS", "DIREITOS DIGITAIS", "SAÚDE DIGITAL", "PRESS START"
];
// Easter eggs da faixa: cada termo conta uma curiosidade, um alienígena passa
// escondido e 3 cliques seguidos ligam o modo turbo. Passar o mouse pausa.
const TICKER_FACTS = {
  "CONHECIMENTO": "📚 +10 XP! São 5 dias de palestras, mesas-redondas e minicursos.",
  "INOVAÇÃO": "💡 Na quinta (26/11), o Sebrae fala de inovação, carreira e negócios.",
  "COMUNIDADE": "🤝 CASI, LASI, IEEE e AWS Builder Group ajudam a SASI a acontecer.",
  "JOGOS": "🎮 O tema da 3ª edição é jogos e tecnologia.",
  "GAME JAM": "🕹️ Inscrições até 23/11 às 15h. Prêmios em dinheiro: R$ 400, R$ 300 e R$ 200!",
  "INTELIGÊNCIA ARTIFICIAL": "🤖 A IA aparece em 5 minicursos e oficinas da semana.",
  "PIXEL ART": "🎨 Minicurso de Pixel Art: segunda (23/11), às 14h.",
  "COMPUTAÇÃO EM NUVEM": "☁️ Dois minicursos de AWS: quarta (25/11) e sexta (27/11).",
  "VISÃO COMPUTACIONAL": "👁️ Conheça o PAVIC-Lab por dentro na sexta (27/11), às 14h.",
  "PESQUISA": "🔬 O Workshop de Pesquisa do PPGCC é na quarta (25/11).",
  "EMPREENDEDORISMO": "🚀 Oficina Da Ideia ao Pitch: segunda (23/11), às 16h.",
  "30 ANOS DE SI": "🎂 Solenidade dos 30 anos: segunda (23/11), às 8h.",
  "PALESTRAS": "🎤 A primeira palestra é na segunda (23/11), às 9h45.",
  "MINICURSOS": "🛠️ São 10 minicursos e oficinas. Veja o STAGE 04.",
  "DIREITOS DIGITAIS": "⚖️ Terça (24/11), 11h: direitos humanos e internet.",
  "SAÚDE DIGITAL": "🩺 Minicurso de Saúde Digital: quinta (26/11), às 14h.",
  "PRESS START": "▶ Ainda tem segredos escondidos nesta página..."
};
const siteTicker = $("#site-ticker");
const tickerTrack = $("#ticker-track");
let tickerWidth = 0;
let tickerClicks = [];
let factTimer = null;
let turboTimer = null;

function startTurbo() {
  const anim = tickerTrack?.getAnimations()[0];
  if (!anim || prefersReducedMotion) return;
  anim.playbackRate = 4;
  siteTicker.classList.add("is-turbo");
  clearTimeout(turboTimer);
  turboTimer = window.setTimeout(() => {
    anim.playbackRate = 1;
    siteTicker.classList.remove("is-turbo");
  }, 5000);
  play8BitSfx("levelup", 13, true);
  showArcadeToast("⚡ TURBO ×4 NA FAIXA!");
  unlockAchievement("turbo");
}

function hitInvader(el) {
  if (el.classList.contains("is-hit")) return;
  el.classList.add("is-hit");
  play8BitSfx("coin", 13, true);
  showArcadeToast("👾 INVASOR ABATIDO! +100 PONTOS");
  unlockAchievement("invader");
  window.setTimeout(() => el.classList.remove("is-hit"), 1400);
}

siteTicker?.addEventListener("click", e => {
  const invader = e.target.closest("[data-invader]");
  if (invader) {
    hitInvader(invader);
    return;
  }
  const now = performance.now();
  tickerClicks = tickerClicks.filter(t => now - t < 900);
  tickerClicks.push(now);
  clearTimeout(factTimer);
  if (tickerClicks.length >= 3) {
    tickerClicks = [];
    startTurbo();
    return;
  }
  const term = e.target.closest("[data-term]");
  if (term && TICKER_FACTS[term.dataset.term]) {
    factTimer = window.setTimeout(() => showArcadeToast(TICKER_FACTS[term.dataset.term]), 380);
  }
});

function buildTicker() {
  if (!tickerTrack) return;
  const unit = TICKER_TERMS.map(t =>
    `<span class="ticker-term" data-term="${esc(t)}">${esc(t)}</span><span class="ticker-star">✦</span>` +
    (t === "PIXEL ART" ? `<span class="ticker-invader" data-invader title="?">${pxIcon("alien")}</span><span class="ticker-star">✦</span>` : "")
  ).join("");
  tickerTrack.innerHTML = `<span class="ticker-seq">${unit}</span>`;
  // offsetWidth ignora a rotação/escala da faixa; serve só para contar as cópias.
  const seqWidth = tickerTrack.firstElementChild.offsetWidth;
  if (!seqWidth) return;
  const copies = Math.max(2, Math.ceil((window.innerWidth * 1.15) / seqWidth) + 1);
  tickerTrack.innerHTML = Array.from({ length: copies }, (_, i) => `<span class="ticker-seq"${i ? ' aria-hidden="true"' : ""}>${unit}</span>`).join("");
  // Deslocar 1/N da própria trilha mantém o loop exato, sem "pulo" no recomeço.
  // O valor vai num @keyframes concreto (sem var()) para a animação rodar na GPU.
  let tickerStyle = document.getElementById("ticker-keyframes");
  if (!tickerStyle) {
    tickerStyle = document.createElement("style");
    tickerStyle.id = "ticker-keyframes";
    document.head.appendChild(tickerStyle);
  }
  tickerStyle.textContent = `@keyframes tickerLoop{to{transform:translateX(${(-100 / copies).toFixed(4)}%)}}`;
  tickerTrack.style.setProperty("--ticker-duration", `${Math.round(seqWidth / 55)}s`);
  tickerTrack.classList.add("is-built");
  tickerWidth = window.innerWidth;
}
buildTicker();
document.fonts?.ready.then(buildTicker);
let tickerResize = null;
window.addEventListener(
  "resize",
  () => {
    clearTimeout(tickerResize);
    tickerResize = window.setTimeout(() => {
      if (Math.abs(window.innerWidth - tickerWidth) > 40) buildTicker();
    }, 250);
  },
  { passive: true }
);

/* =========================================================
   11. MAPA SOB DEMANDA, ANIMAÇÕES FORA DA TELA, REVEAL & NAV ATIVA
   ========================================================= */
const mapWrap = $("#location-map-wrap");
const mapIframe = $("#ufac-map-iframe");
const mapPlaceholder = $("#location-map-placeholder");
const loadMapBtn = $("#load-map-btn");
let mapRequested = false;
function mountUfacMap() {
  if (!mapIframe || mapRequested || !mapIframe.dataset.src) return;
  mapRequested = true;
  mapIframe.addEventListener("load", () => {
    if (mapPlaceholder) mapPlaceholder.hidden = true;
  }, { once: true });
  mapIframe.src = mapIframe.dataset.src;
}
loadMapBtn?.addEventListener("click", mountUfacMap);

const animatedZones = [logoStage, $("#site-ticker"), $(".location-pin-pulse"), $(".press-start"), $(".insert-coin"), $(".jam-prize-panel")].filter(Boolean);
const stageSections = ["#inicio", "#sobre", "#programacao", "#convidados", "#minicursos", "#gamejam", "#parceiros", "#local"]
  .map(sel => $(sel))
  .filter(Boolean);
const seenStages = new Set();

if ("IntersectionObserver" in window) {
  if (mapWrap) {
    const mapObserver = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        mountUfacMap();
        mapObserver.disconnect();
      }
    }, { rootMargin: "650px 0px" });
    mapObserver.observe(mapWrap);
  }

  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-paused", !entry.isIntersecting);
      if (entry.target === logoStage) {
        heroVisible = entry.isIntersecting;
        if (heroVisible) {
          wakeLogo();
          startXpLoop();
        } else stopXpLoop();
      }
    });
  }, { threshold: 0.05 });
  animatedZones.forEach(el => animObserver.observe(el));

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion) revealTargets.forEach(el => el.classList.add("is-revealed"));
  else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "260px 0px 260px 0px", threshold: 0 });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

  const stageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      seenStages.add(entry.target.id);
      stageObserver.unobserve(entry.target);
    });
    if (seenStages.size === stageSections.length) unlockAchievement("explorer", "todas as fases visitadas");
  }, { rootMargin: "0px 0px -35% 0px", threshold: 0 });
  stageSections.forEach(sec => stageObserver.observe(sec));

  const navLinks = Array.from(nav.querySelectorAll('a[href^="#"]:not(.nav-button)'));
  const sectionMap = new Map(navLinks.map(link => [$(link.getAttribute("href")), link]).filter(([sec]) => Boolean(sec)));
  if (sectionMap.size) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const activeLink = sectionMap.get(entry.target);
        if (activeLink) navLinks.forEach(l => l.classList.toggle("is-active", l === activeLink));
      });
    }, { rootMargin: "-30% 0px -55% 0px", threshold: 0 });
    sectionMap.forEach((_, sec) => navObserver.observe(sec));
  }
} else {
  document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-revealed"));
}

document.addEventListener("visibilitychange", () => {
  animatedZones.forEach(el => el.classList.toggle("is-paused", document.hidden));
  if (document.hidden) stopXpLoop();
  else startXpLoop();
});

syncScrollUi();
if (prefersReducedMotion) applyXpBar(19);
else {
  applyXpBar(13);
  startXpLoop();
  wakeLogo();
}
