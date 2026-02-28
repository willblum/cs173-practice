// ─── Unit collapse/expand ────────────────────────
function toggleUnit(unit) {
  const body = document.getElementById(`body-${unit}`);
  const chevron = document.getElementById(`chevron-${unit}`);
  body.classList.toggle('collapsed');
  chevron.textContent = body.classList.contains('collapsed') ? '▾' : '▸';
}