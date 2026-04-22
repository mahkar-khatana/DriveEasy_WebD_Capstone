// ===================== HISTORY =====================

let histFilter = 'all';

function renderHistory() {
  let all = getBookings();
  if (histFilter !== 'all') all = all.filter(b => b.car === histFilter);

  const c = document.getElementById('histCards');
  if (!all.length) {
    c.innerHTML = `
      <div class="empty-hist">
        <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>
        <p>No bookings found.</p>
      </div>`;
    return;
  }

  c.innerHTML = all.map(b => `
    <div class="hist-card">
      <div class="hist-card-img"><img src="${b.img}" alt="${b.car}"></div>
      <div class="hist-card-body">
        <div>
          <div class="hist-car-name">${b.car}</div>
          <div class="hist-meta">${b.cat} · Ref: ${b.id}</div>
          <div style="margin-top:8px"><span class="status-pill s-confirmed">${b.status}</span></div>
        </div>
        <div class="hist-details">
          <div class="hist-detail"><div class="hd-lbl">Guest</div><div class="hd-val">${b.name}</div></div>
          <div class="hist-detail"><div class="hd-lbl">Duration</div><div class="hd-val">${b.days} day${b.days > 1 ? 's' : ''}</div></div>
          <div class="hist-detail"><div class="hd-lbl">Pickup</div><div class="hd-val">${fmtDate(b.start)}</div></div>
          <div class="hist-detail"><div class="hd-lbl">Return</div><div class="hd-val">${fmtDate(b.end)}</div></div>
          <div class="hist-detail"><div class="hd-lbl">City</div><div class="hd-val">${b.city || '—'}</div></div>
          <div class="hist-detail"><div class="hd-lbl">Booked on</div><div class="hd-val">${b.bookedOn}</div></div>
        </div>
      </div>
      <div class="hist-card-right">
        <div>
          <div class="hist-amount">₹${b.total.toLocaleString()}</div>
          <div class="hist-sub-amt">₹${b.rate.toLocaleString()}/day</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterHist(val, btn) {
  histFilter = val;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderHistory();
}

function clearHistory() {
  if (!confirm('Clear all booking history?')) return;
  saveBookings([]);
  updateNavBadge();
  updateDashboard();
  renderHistory();
}
