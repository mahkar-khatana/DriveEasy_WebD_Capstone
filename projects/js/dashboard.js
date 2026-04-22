// ===================== DASHBOARD =====================

function buildFleet() {
  const c = document.getElementById('fleetList');
  c.innerHTML = CARS.map(car => `
    <div class="fleet-item" onclick="goBook(${car.id})">
      <div class="fleet-img"><img src="${car.img}" alt="${car.model}"></div>
      <div class="fleet-info">
        <div class="fleet-name">${car.model}</div>
        <div class="fleet-sub">${car.cat}</div>
        <div class="fleet-badges">
          ${car.feats.map((f, i) => `<span class="tag ${['tag-teal','tag-blue','tag-gold'][i]}">${f}</span>`).join('')}
          <span class="tag tag-teal"><span class="avail-dot green"></span>Available</span>
        </div>
      </div>
      <div class="fleet-price">
        <div class="price">₹${car.price.toLocaleString()}</div>
        <div class="per">/day</div>
      </div>
    </div>
  `).join('');
}

function updateDashboard() {
  const all   = getBookings();
  const total = all.reduce((s, b) => s + b.total, 0);
  const days  = all.reduce((s, b) => s + b.days,  0);

  document.getElementById('statBookings').textContent = all.length;
  document.getElementById('statRevenue').textContent  = total > 0 ? '₹' + formatK(total) : '₹0';
  document.getElementById('statDays').textContent     = days;
  document.getElementById('statBookChange').textContent = all.length ? '↑ ' + all.length + ' total' : 'No bookings yet';
  document.getElementById('statRevChange').textContent  = total ? '↑ ₹' + formatK(total) + ' earned' : '—';
  document.getElementById('statDayChange').textContent  = days ? '↑ ' + days + ' days' : '—';

  // Recent bookings table
  const tbody = document.getElementById('recentTable');
  if (!all.length) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text3);padding:24px">No bookings yet</td></tr>';
  } else {
    tbody.innerHTML = all.slice(0, 6).map(b => `
      <tr>
        <td>${b.name}</td>
        <td>${b.car}</td>
        <td>${b.days}d</td>
        <td style="color:var(--accent)">₹${b.total.toLocaleString()}</td>
        <td><span class="status-pill s-confirmed">${b.status}</span></td>
      </tr>
    `).join('');
  }

  // Revenue chart
  const revenuePerCar = CARS.map(c => ({
    name: c.model.split(' ')[1] || c.model.split(' ')[0],
    rev:  all.filter(b => b.carId === c.id).reduce((s, b) => s + b.total, 0)
  }));
  const max = Math.max(...revenuePerCar.map(r => r.rev), 1);

  document.getElementById('revenueChart').innerHTML = revenuePerCar.map(r => `
    <div class="bar-wrap">
      <div class="bar"
           style="height:${Math.max(4, Math.round((r.rev / max) * 72))}px;background:${r.rev > 0 ? 'var(--accent)' : 'var(--surface2)'};"
           title="${r.name}: ₹${r.rev.toLocaleString()}"></div>
    </div>
  `).join('');

  document.getElementById('chartLabels').innerHTML = revenuePerCar.map(r =>
    `<div style="flex:1;text-align:center;font-size:9px;color:var(--text3)">${r.name}</div>`
  ).join('');

  // Activity feed
  const feed = document.getElementById('activityFeed');
  if (!all.length) {
    feed.innerHTML = '<div style="font-size:12px;color:var(--text3);text-align:center;padding:16px 0">No activity yet</div>';
    return;
  }
  const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  feed.innerHTML = all.slice(0, 5).map(b => `
    <div class="feed-item">
      <div class="feed-avatar">${initials(b.name)}</div>
      <div class="feed-body">
        <strong>${b.name}</strong>
        <span>Booked ${b.car} · ${b.days}d · ₹${b.total.toLocaleString()}</span>
      </div>
      <div class="feed-time">${b.bookedOn}</div>
    </div>
  `).join('');
}
