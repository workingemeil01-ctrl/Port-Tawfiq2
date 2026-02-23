(() => {
  const topbar = document.getElementById("topbar");

  // ===== sticky header style on scroll =====
  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle("is-scrolled", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ===== drawer =====
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // close drawer when clicking a link
  document.querySelectorAll(".drawer-link").forEach(a => {
    a.addEventListener("click", () => closeDrawer());
  });

  // ===== carousel dots =====
  const carousel = document.getElementById("carousel");
  const dots = Array.from(document.querySelectorAll(".dot"));

  const setDot = (idx) => {
    dots.forEach((d, i) => d.classList.toggle("is-on", i === idx));
  };

  if (carousel && dots.length) {
    const cards = Array.from(carousel.querySelectorAll(".chalet-card"));
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const idx = cards.indexOf(visible.target);
      if (idx >= 0) setDot(idx);
    }, { root: carousel, threshold: [0.55, 0.7, 0.85] });

    cards.forEach(c => obs.observe(c));
  }

  // ===== WhatsApp link placeholder (هتغيره بعدين) =====
  // ضع رقمك هنا لاحقًا: https://wa.me/2XXXXXXXXXXX
  const waFab = document.getElementById("waFab");
  const quickWa = document.getElementById("quickWa");
  // مثال جاهز (غير الرقم):
  // const waLink = "https://wa.me/201064800205";
  const waLink = "#";

  if (waFab) waFab.href = waLink;
  if (quickWa) quickWa.href = waLink;
})();
