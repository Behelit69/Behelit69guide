(function () {
  'use strict';
  var key = 'prime-guide-progress-v1';
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.done-check input'));
  var links = Array.prototype.slice.call(document.querySelectorAll('aside nav a'));
  var saved = [];
  try { var value = JSON.parse(localStorage.getItem(key) || '[]'); if (Array.isArray(value)) saved = value; } catch (e) {}
  document.querySelector('.progress-panel').hidden = false;
  function update() {
    var state = boxes.map(function (box, i) { links[i].classList.toggle('completed', box.checked); return box.checked; });
    var count = state.filter(Boolean).length;
    document.getElementById('progress-count').textContent = count + ' / 6';
    document.getElementById('guide-progress').value = count;
    try { localStorage.setItem(key, JSON.stringify(state)); } catch (e) {}
  }
  boxes.forEach(function (box, i) {
    box.parentElement.hidden = false;
    box.checked = saved[i] === true;
    box.setAttribute('aria-label', 'Шаг ' + (i + 1) + ' выполнен');
    box.addEventListener('change', update);
  });
  update();
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'step'); else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-5% 0px -60% 0px', threshold: 0});
    document.querySelectorAll('article').forEach(function (article) { observer.observe(article); });
  }
}());
