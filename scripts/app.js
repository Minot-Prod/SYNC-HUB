// JS de base SYNC-HUB

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('dashboard-root');

  if (root) {
    root.innerHTML = 
      <section class="card">
        <h2>SYNC-HUB</h2>
        <p>Point d'entrée du Hub IA (Assistant, Prospection, Messages, Analyste, Zoé, Training).</p>
      </section>
    ;
  }
});
