/* viewer.js — fetches CookingDocs .md files, parses their tables, and renders
   them in the Broadsheet style. Markdown stays the source of truth; this is
   only a render layer. Exposes a global `CD`. */
(function () {
  'use strict';

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // escape, then render inline `code` and **bold**
  function inlineMd(s) {
    return escapeHtml(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  async function fetchMd(path) {
    var r = await fetch(path, { cache: 'no-cache' });
    if (!r.ok) throw new Error(path + ' → HTTP ' + r.status);
    return r.text();
  }

  // Parse every GFM pipe-table in a markdown string.
  // Returns [{ headers:[...], rows:[[...], ...] }]
  function parseTables(md) {
    var lines = md.split('\n');
    var tables = [], cur = null;
    var isRow = function (ln) { return /^\s*\|.*\|\s*$/.test(ln); };
    var cells = function (ln) { return ln.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(function (s) { return s.trim(); }); };
    var isSep = function (cs) { return cs.length && cs.every(function (c) { return /^:?-{1,}:?$/.test(c.replace(/\s/g, '')); }); };
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (isRow(ln)) {
        var cs = cells(ln);
        if (isSep(cs)) continue;                 // separator row — skip
        if (!cur) { cur = { headers: cs, rows: [] }; tables.push(cur); }
        else cur.rows.push(cs);
      } else { cur = null; }
    }
    return tables;
  }

  // header lookups (case-insensitive prefix match)
  function colIdx(headers, name) {
    name = name.toLowerCase();
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].toLowerCase().indexOf(name) === 0) return i;
    }
    return -1;
  }
  function cell(row, headers, name) { var i = colIdx(headers, name); return i >= 0 ? (row[i] || '') : ''; }

  function getTitle(md) { var m = md.match(/^#\s+(.+)$/m); return m ? m[1].trim() : ''; }
  function getSubtitle(md) { var m = md.match(/^\*([^*].*?)\*\s*$/m); return m ? m[1].trim() : ''; }
  function getShoppingList(md) { var m = md.match(/\*\*Shopping list\*\*\s*[—:-]\s*(.+)/i); return m ? m[1].trim() : ''; }

  var KIDWORD = { '✓': 'kid: yes', '~': 'kid: maybe', '✕': 'kid: no' };
  function kidWord(g) { g = (g || '').trim(); return KIDWORD[g] || (g ? 'kid: ' + g : ''); }

  function shopHtml(val) {
    val = (val || '').trim();
    if (val === '' || val === '—' || val === '-') return '<span class="pantry">pantry-only</span>';
    return '<span class="shop">' + escapeHtml(val) + '</span>';
  }

  // ── nav ──
  function nav(active) {
    var items = [['menu.html', 'Current Menu', 'menu'], ['menus.html', 'Menus', 'menus'], ['staples.html', 'Staples', 'staples'], ['index.html', 'Index', 'index']];
    var html = '<div class="nav-inner"><a class="nav-brand" href="index.html">Cooking<span>Docs</span></a>' +
      items.map(function (it) {
        return '<a class="link' + (it[2] === active ? ' active' : '') + '" href="' + it[0] + '">' + it[1] + '</a>';
      }).join('') + '</div>';
    var el = document.querySelector('.nav');
    if (el) el.innerHTML = html;
  }

  function header(main, eyebrow, title, subtitle) {
    var h = '<div class="doc-eyebrow">' + escapeHtml(eyebrow) + '</div>';
    h += '<h1 class="doc-title">' + escapeHtml(title) + '</h1>';
    if (subtitle) h += '<div class="doc-rule"><span>' + inlineMd(subtitle) + '</span></div>';
    return h;
  }

  function showError(main, e, path) {
    main.innerHTML = '<div class="status err">Couldn\'t load <code>' + escapeHtml(path) + '</code>\n' +
      escapeHtml(e.message || String(e)) + '\n\nIf you opened this file directly (file://), browsers block reading sibling files. ' +
      'Serve the repo over HTTP — e.g. <code>python3 -m http.server</code> from the repo root, then open <code>/docs/</code>, ' +
      'or deploy via GitHub Pages (see SETUP.md).</div>';
  }

  // ── renderers ──
  async function loadIndex(path) {
    var main = document.getElementById('doc');
    try {
      var md = await fetchMd(path);
      var t = (parseTables(md)[0]) || { headers: [], rows: [] };
      var H = t.headers;
      var html = header(main, 'recipes / index.md', getTitle(md) || 'Recipe Index', getSubtitle(md));
      html += '<div class="cols">';
      t.rows.forEach(function (r) {
        var meta = [cell(r, H, 'Cuisine'), cell(r, H, 'Protein'), (cell(r, H, 'Min') ? cell(r, H, 'Min') + ' min' : ''), kidWord(cell(r, H, 'Kid'))].filter(Boolean).join(' · ');
        html += '<article class="bentry"><h3 class="bt">' + escapeHtml(cell(r, H, 'Dish')) + '</h3>' +
          '<div class="bmeta">' + escapeHtml(meta) + '</div>' +
          '<div class="bshop">' + shopHtml(cell(r, H, 'Shop')) + '</div></article>';
      });
      html += '</div>';
      main.innerHTML = html;
      document.title = 'Recipe Index · CookingDocs';
    } catch (e) { showError(main, e, path); }
  }

  async function loadMenu(path) {
    var main = document.getElementById('doc');
    try {
      var md = await fetchMd(path);
      var t = (parseTables(md)[0]) || { headers: [], rows: [] };
      var H = t.headers;
      var html = header(main, 'menus / ' + path.split('/').pop(), getTitle(md) || 'Dinner Menu', getSubtitle(md));
      html += '<div class="timeline">';
      t.rows.forEach(function (r) {
        var dish = cell(r, H, 'Dish');
        var sides = cell(r, H, 'Sides');
        var meta = cell(r, H, 'Cuisine');
        html += '<div class="tl-row"><div class="tl-day">' + escapeHtml(cell(r, H, 'Day')) + '</div>' +
          '<div class="tl-body"><div class="tl-dish">' + escapeHtml(dish) + '</div>' +
          (sides ? '<div class="tl-sides">' + escapeHtml(sides) + '</div>' : '') +
          '</div>' +
          (meta ? '<div class="tl-meta-right">' + escapeHtml(meta) + '</div>' : '') +
          '</div>';
      });
      html += '</div>';
      var list = getShoppingList(md);
      if (list) html += '<div class="shoproll"><span class="shoproll-h">Shopping list</span>' + escapeHtml(list) + '</div>';
      main.innerHTML = html;
      document.title = (getTitle(md) || 'Menu') + ' · CookingDocs';
    } catch (e) { showError(main, e, path); }
  }

  async function loadStaples(path) {
    var main = document.getElementById('doc');
    try {
      var md = await fetchMd(path);
      var t = (parseTables(md)[0]) || { headers: [], rows: [] };
      var H = t.headers;
      var html = header(main, 'dinnerStaples.md', getTitle(md) || 'Dinner Staples', getSubtitle(md));
      html += '<div class="staples">';
      t.rows.forEach(function (r) {
        var tags = (cell(r, H, 'Tag') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        html += '<article class="st-entry"><h3 class="st-name">' + escapeHtml(cell(r, H, 'Dish') || cell(r, H, 'Name')) + '</h3>';
        if (tags.length) html += '<div class="st-tags">' + tags.map(function (x) { return '<span class="chip">' + escapeHtml(x) + '</span>'; }).join('') + '</div>';
        var note = cell(r, H, 'Note');
        if (note) html += '<div class="st-note">' + escapeHtml(note) + '</div>';
        html += '</article>';
      });
      html += '</div>';
      main.innerHTML = html;
      document.title = 'Dinner Staples · CookingDocs';
    } catch (e) { showError(main, e, path); }
  }

  async function loadLatestMenu(indexPath) {
    var main = document.getElementById('doc');
    try {
      var md = await fetchMd(indexPath);
      var m = /-\s*\[([^\]]+)\]\(([^)]+)\)/.exec(md);
      if (!m) throw new Error('No menu entries found in ' + indexPath);
      var base = indexPath.replace(/\/[^/]+$/, '/');
      await loadMenu(base + m[2].trim());
    } catch (e) { showError(main, e, indexPath); }
  }

  async function loadArchive(path) {
    var main = document.getElementById('doc');
    try {
      var md = await fetchMd(path);
      var html = header(main, 'menus / index.md', getTitle(md) || 'Menus', getSubtitle(md) || 'Past and current weekly menus');
      var items = [];
      var re = /-\s*\[([^\]]+)\]\(([^)]+)\)/g, m;
      while ((m = re.exec(md))) items.push({ label: m[1].trim(), file: m[2].trim() });
      html += '<div class="archive">';
      items.forEach(function (it) {
        var file = it.file.replace(/^\.?\//, '');
        html += '<a class="arch-row" href="menu.html?file=menus/' + encodeURIComponent(file) + '">' +
          '<span class="arch-label">' + escapeHtml(it.label) + '</span>' +
          '<span class="arch-file">' + escapeHtml(file) + '</span>' +
          '<span class="arch-go">view →</span></a>';
      });
      if (!items.length) html += '<div class="status">No menus listed yet.</div>';
      html += '</div>';
      main.innerHTML = html;
      document.title = 'Menus · CookingDocs';
    } catch (e) { showError(main, e, path); }
  }

  window.CD = {
    nav: nav,
    loadIndex: loadIndex,
    loadMenu: loadMenu,
    loadLatestMenu: loadLatestMenu,
    loadStaples: loadStaples,
    loadArchive: loadArchive,
    parseTables: parseTables,
    getParam: function (k) { return new URLSearchParams(location.search).get(k); },
  };
})();
