const revealItems = document.querySelectorAll(
  ".section-heading, .hero-main, .stat-card, .skill-group, .project-row, .info-card, .contact-panel"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${index * 70}ms`;
  observer.observe(item);
});

const timelineWrap = document.querySelector(".timeline-wrap");
const timelineRailColumn = document.querySelector(".timeline-rail-column");
const timelineProgress = document.querySelector(".timeline-rail-progress");
const timelineGlow = document.querySelector(".timeline-rail-glow");
const timelineItems = document.querySelectorAll(".timeline-item");

const updateTimelineRail = () => {
  if (!timelineWrap || !timelineRailColumn || !timelineProgress || !timelineGlow || timelineItems.length === 0) {
    return;
  }

  const wrapRect = timelineWrap.getBoundingClientRect();
  const railHeight = timelineRailColumn.offsetHeight;
  const viewportCenter = window.innerHeight * 0.5;
  const progressRaw = viewportCenter - wrapRect.top;
  const progress = Math.max(0, Math.min(progressRaw, railHeight));

  timelineProgress.style.height = `${progress}px`;
  timelineGlow.style.top = `${progress}px`;

  let activeItem = null;
  let closestDistance = Infinity;

  timelineItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(itemCenter - viewportCenter);
    const revealPoint = window.innerHeight * 0.88;

    item.classList.remove("is-active");

    if (rect.top < revealPoint) {
      item.classList.add("visible");
    }

    if (distance < closestDistance) {
      closestDistance = distance;
      activeItem = item;
    }
  });

  if (activeItem) {
    activeItem.classList.add("is-active");
  }
};

timelineItems.forEach((item, index) => {
  item.classList.add("visible");
  item.style.transitionDelay = `${index * 120}ms`;
});

updateTimelineRail();
window.addEventListener("scroll", updateTimelineRail, { passive: true });
window.addEventListener("resize", updateTimelineRail);
