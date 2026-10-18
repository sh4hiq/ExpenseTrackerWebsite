// Landing page: hero demo replay and the app-screen tabs.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero demo: play once on load, replay on request.
  var demo = document.getElementById('demo');
  var replay = document.getElementById('replay');
  if (demo && replay && !reduce) {
    var play = function () {
      demo.classList.remove('play');
      void demo.offsetWidth; // restart the CSS animations
      demo.classList.add('play');
    };
    play();
    replay.hidden = false;
    replay.addEventListener('click', play);
  }

  // App tour tabs.
  var captions = {
    'p-over':
      'The overview opens with one sentence: how much you spent this month. A ribbon and a table break it down by category, with a 12-month trend and your latest transactions below.',
    'p-mov':
      'Every transaction, with filters for month, category, type and status. Open one to correct the merchant or category and read the cleaned email it came from. Amount, date and time always stay as the bank sent them.',
    'p-rev':
      'Uncertain emails and unconfirmed categories wait here, grouped by merchant so one decision can settle many transactions at once.',
    'p-cat':
      'Rename, reorder or archive categories, and add merchant rules. Rules always apply before the model ever gets a say.',
    'p-his':
      'Each sync run is listed with how many emails it read, saved, excluded or sent to review, and why a failed run stopped.',
    'p-set':
      'Check Gmail, LM Studio, the model and the database at a glance. Connect Gmail or start LM Studio and load the model from here, without a terminal.',
  };

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab[role="tab"]'));
  var caption = document.getElementById('tour-caption');
  var rails = document.querySelectorAll('[data-rail]');

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    var id = tab.getAttribute('aria-controls');
    rails.forEach(function (r) {
      r.classList.toggle('on', r.getAttribute('data-rail') === id);
    });
    if (caption) caption.textContent = captions[id];
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () {
      select(tab, false);
    });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) {
        e.preventDefault();
        select(next, true);
      }
    });
  });
})();
