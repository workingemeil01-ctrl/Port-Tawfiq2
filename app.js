(() => {
  const topbar = document.getElementById("topbar");

  // sticky header effect
  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // drawer
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");
  const openBtn = document.getElementById("openDrawer");
  const closeBtn = document.getElementById("closeDrawer");

  const openDrawer = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openBtn?.addEventListener("click", openDrawer);
  closeBtn?.addEventListener("click", closeDrawer);
  overlay?.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  document.querySelectorAll(".drawer-link").forEach(a => {
    a.addEventListener("click", () => closeDrawer());
  });

  // carousel dots
  const carousel = document.getElementById("carousel");
  const dots = Array.from(document.querySelectorAll(".dot"));
  const setDot = (idx) => dots.forEach((d, i) => d.classList.toggle("is-on", i === idx));

  if (carousel && dots.length) {
    const cards = Array.from(carousel.querySelectorAll(".chalet-card"));
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const idx = cards.indexOf(visible.target);
      if (idx >= 0) setDot(idx);
    }, { root: carousel, threshold: [0.55, 0.7, 0.85] });

    cards.forEach(c => obs.observe(c));
  }

  // WhatsApp link placeholder
  // حط الرقم بعدين:
  // const waLink = "https://wa.me/2010XXXXXXXX";
  const waLink = "#";
  const waFab = document.getElementById("waFab");
  const quickWa = document.getElementById("quickWa");
  if (waFab) waFab.href = waLink;
  if (quickWa) quickWa.href = waLink;

  // ---- HERO image loader (bck1.*) ----
  const heroMedia = document.getElementById("heroMedia");
  function tryBg(el, baseName, exts) {
    let i = 0;
    const probe = new Image();
    const next = () => {
      if (i >= exts.length) return;
      const url = `${baseName}${exts[i++]}`;
      probe.onload = () => { el.style.backgroundImage = `url("${url}")`; };
      probe.onerror = next;
      probe.src = url;
    };
    next();
  }
  if (heroMedia) {
    tryBg(heroMedia, "bck1", [".jpg",".jpeg",".png",".webp"]);
  }

  // ---- Experience circles images (exp1/exp2/exp3.*) ----
  const exps = [
    { id: "exp1", base: "exp1" },
    { id: "exp2", base: "exp2" },
    { id: "exp3", base: "exp3" },
  ];

  exps.forEach(item => {
    const el = document.getElementById(item.id);
    if (!el) return;
    tryBg(el, item.base, [".jpg",".jpeg",".png",".webp"]);
  });
})();
