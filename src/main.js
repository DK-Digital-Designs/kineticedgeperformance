const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* Header elevate on scroll */
const header = $(".site-header");
const setHeader = () => {
    const elevated = window.scrollY > 6;
    header?.setAttribute("data-elevated", elevated ? "true" : "false");
};
setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

/* Mobile nav */
const toggle = $("[data-nav-toggle]");
const drawer = $("[data-drawer]");
const links = $$("[data-nav-link]");

const setNavOpen = (open) => {
    if (!toggle || !drawer) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.classList.toggle("open", open);
};

toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
});

links.forEach((a) =>
    a.addEventListener("click", () => {
        setNavOpen(false);
    })
);

/* Reveal on scroll */
const io = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
        });
    },
    { threshold: 0.12 }
);

$$(".reveal").forEach((el) => io.observe(el));

/* Mailto form (static-site friendly) */
const form = $("[data-mailto-form]");
form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const sport = String(fd.get("sport") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = encodeURIComponent(`Kinetic Edge Performance — Interest (${sport || "General"})`);
    const body = encodeURIComponent(
        `Name: ${name}\nSport/Team: ${sport}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:kineticedgeperformance1@gmail.com?subject=${subject}&body=${body}`;
});
