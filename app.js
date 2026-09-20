const revealTargets = document.querySelectorAll(
  '.section-label, .definition-grid, .concrete-example, .primitive-grid, .quote-card, .comparison-matrix, .deep-flow, .ownership-grid, .playground-card, .anatomy-grid, .threshold-lab, .workflow-map, .underhood-grid, .published-numbers, .fit-grid, .limits-grid, .faq-list'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach((target) => {
  target.classList.add('reveal');
  revealObserver.observe(target);
});

const thresholdRange = document.querySelector('#thresholdRange');
const thresholdValue = document.querySelector('#thresholdValue');
const thresholdMarker = document.querySelector('#thresholdMarker');
const labResult = document.querySelector('#labResult');
const labIcon = document.querySelector('#labIcon');
const labTitle = document.querySelector('#labTitle');
const labText = document.querySelector('#labText');
const decisionConfidence = 0.88;

function updateThreshold() {
  if (!thresholdRange) return;
  const threshold = Number(thresholdRange.value) / 100;
  const shouldAct = decisionConfidence >= threshold;
  thresholdValue.value = threshold.toFixed(2);
  thresholdMarker.style.left = `${thresholdRange.value}%`;
  labResult.classList.toggle('review', !shouldAct);
  labIcon.textContent = shouldAct ? '✓' : '↗';
  labTitle.textContent = shouldAct ? 'Act automatically' : 'Send to human review';
  labText.textContent = `0.88 ${shouldAct ? 'clears' : 'does not clear'} the ${threshold.toFixed(2)} threshold.`;
}

thresholdRange?.addEventListener('input', updateThreshold);
updateThreshold();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
