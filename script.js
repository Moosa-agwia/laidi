/* =========================================================
   المؤسسة الليبية الإفريقية لتكنولوجيا والابتكار — السلوك
   ========================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------
     ١) بيانات قابلة للتعديل: البرامج والمبادرات
     أضف عنصراً هنا لعرضه مباشرة في قسم "البرامج والمبادرات"
     مثال:
     { tag: "برنامج تدريبي", title: "معسكر الذكاء الاصطناعي", text: "وصف مختصر للبرنامج." }
  ----------------------------------------------------- */
  const PROGRAMS = [
    // أضف برامجك هنا
  ];

  /* -----------------------------------------------------
     ٢) بيانات قابلة للتعديل: الشراكات والتعاون
     أضف عنصراً هنا لعرضه مباشرة في قسم "الشراكات"
     مثال:
     { tag: "شريك دولي", title: "اسم الجهة الشريكة", text: "وصف مختصر لمجال الشراكة." }
  ----------------------------------------------------- */
  const PARTNERS = [
    // أضف شركاءك هنا
  ];

  /* -----------------------------------------------------
     بناء البطاقات أو حالة "القسم الفارغ" تلقائياً
  ----------------------------------------------------- */
  function renderCollection(containerId, items, emptyTitle, emptyText) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="8" stroke="currentColor" stroke-width="2.3" stroke-dasharray="4 5"/><path d="M24 17v14M17 24h14" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/></svg>
          </span>
          <h3>${emptyTitle}</h3>
          <p>${emptyText}</p>
        </div>`;
      return;
    }

    grid.innerHTML = items.map(item => `
      <article class="item-card">
        ${item.tag ? `<span class="item-tag">${item.tag}</span>` : ""}
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
  }

  renderCollection(
    "programs-grid",
    PROGRAMS,
    "لا توجد برامج معلنة حالياً",
    "هذه المساحة مخصّصة لعرض برامج ومبادرات المؤسسة أولاً بأول. تابعونا لمعرفة كل جديد."
  );

  renderCollection(
    "partners-grid",
    PARTNERS,
    "قريباً: شركاؤنا الأفارقة والدوليون",
    "هذه المساحة مخصّصة لعرض الجهات الشريكة محلياً وأفريقياً ودولياً فور الإعلان عنها."
  );

  /* -----------------------------------------------------
     السنة الحالية في التذييل
  ----------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------------
     شريط التنقل: ظل عند التمرير + قائمة الجوال
  ----------------------------------------------------- */
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------
     تمييز الرابط النشط في التنقل حسب القسم الظاهر
  ----------------------------------------------------- */
  const sections = Array.from(document.querySelectorAll("main section[id], header .hero[id]"))
    .concat(Array.from(document.querySelectorAll("section[id]")))
    .filter((el, i, arr) => arr.indexOf(el) === i);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(section => spy.observe(section));
  }

  /* -----------------------------------------------------
     ظهور تدريجي خفيف لعناوين الأقسام عند التمرير
  ----------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".section-head, .membership-copy, .steps");
  revealTargets.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }

  /* -----------------------------------------------------
     زر العودة إلى الأعلى
  ----------------------------------------------------- */
  const toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("is-visible", window.scrollY > 480);
    }, { passive: true });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
