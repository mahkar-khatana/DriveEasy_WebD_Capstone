// ===================== BOOKING =====================

let selectedCarId = 1;

function buildCarPicker() {
  const c = document.getElementById('carPicker');
  c.innerHTML = CARS.map(car => `
    <div class="car-tile ${car.id === selectedCarId ? 'selected' : ''}" onclick="selectCar(${car.id})">
      <div class="car-tile-img">
        <img src="${car.img}" alt="${car.model}">
        <div class="overlay"></div>
      </div>
      <div class="car-tile-body">
        <div class="car-tile-name">${car.model}</div>
        <div class="car-tile-sub">${car.cat} · ${car.feats.join(' · ')}</div>
        <div class="car-tile-footer">
          <div class="car-tile-price">₹${car.price.toLocaleString()} <small>/day</small></div>
          ${car.id === selectedCarId
            ? `<div class="selected-check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div>`
            : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function selectCar(id) {
  selectedCarId = id;
  buildCarPicker();
  updateSummaryPanel();
  recalc();
}

function goBook(id) {
  selectedCarId = id;
  showView('booking', document.querySelectorAll('.nav-tab')[1]);
  buildCarPicker();
  updateSummaryPanel();
}

function updateSummaryPanel() {
  const car = CARS.find(c => c.id === selectedCarId);
  document.getElementById('sumImg').src             = car.img;
  document.getElementById('sumName').textContent    = car.model;
  document.getElementById('sumCat').textContent     = car.cat;
  document.getElementById('sl-car').textContent     = car.model;
  document.getElementById('sl-rate').textContent    = '₹' + car.price.toLocaleString();
}

function recalc() {
  const s   = document.getElementById('bStart').value;
  const e   = document.getElementById('bEnd').value;
  const car = CARS.find(c => c.id === selectedCarId);

  if (!s || !e) {
    document.getElementById('sumTotal').textContent = '₹0';
    document.getElementById('sumNote').textContent  = 'Select dates to calculate';
    document.getElementById('sl-days').textContent  = '—';
    document.getElementById('sl-start').textContent = '—';
    document.getElementById('sl-end').textContent   = '—';
    document.getElementById('sl-total').textContent = '₹0';
    return;
  }

  const days  = Math.max(1, Math.round((new Date(e) - new Date(s)) / 864e5));
  const total = days * car.price;

  document.getElementById('sumTotal').textContent = '₹' + total.toLocaleString();
  document.getElementById('sumNote').textContent  = days + ' day' + (days > 1 ? 's' : '') + ' rental';
  document.getElementById('sl-days').textContent  = days + ' day' + (days > 1 ? 's' : '');
  document.getElementById('sl-start').textContent = fmtDate(s);
  document.getElementById('sl-end').textContent   = fmtDate(e);
  document.getElementById('sl-total').textContent = '₹' + total.toLocaleString();
}

function confirmBooking() {
  const fields = [
    { id: 'bName',    label: 'Full Name' },
    { id: 'bPhone',   label: 'Phone' },
    { id: 'bEmail',   label: 'Email' },
    { id: 'bStart',   label: 'Pickup Date' },
    { id: 'bEnd',     label: 'Return Date' },
    { id: 'bCity',    label: 'City' },
    { id: 'bLicense', label: 'License Number' }
  ];

  let ok = true;
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) { el.classList.add('err'); ok = false; }
    else el.classList.remove('err');
  });

  if (!ok) { toast('Please fill in all required fields.', 'err'); return; }

  const s    = document.getElementById('bStart').value;
  const e    = document.getElementById('bEnd').value;
  const days = Math.max(1, Math.round((new Date(e) - new Date(s)) / 864e5));
  const car  = CARS.find(c => c.id === selectedCarId);

  const booking = {
    id:      'BK' + Date.now(),
    name:    document.getElementById('bName').value.trim(),
    phone:   document.getElementById('bPhone').value.trim(),
    email:   document.getElementById('bEmail').value.trim(),
    city:    document.getElementById('bCity').value,
    license: document.getElementById('bLicense').value.trim(),
    car:     car.model, carId: car.id, cat: car.cat, img: car.img,
    days, rate: car.price, total: days * car.price,
    start: s, end: e,
    bookedOn: new Date().toLocaleDateString('en-IN'),
    status: 'Confirmed'
  };

  let all = getBookings();
  all.unshift(booking);
  saveBookings(all);

  toast('Booking confirmed! Ref: ' + booking.id, 'ok');
  updateNavBadge();
  updateDashboard();

  // Reset form
  ['bName','bPhone','bEmail','bStart','bEnd','bCity','bLicense'].forEach(id => {
    document.getElementById(id).value = '';
  });
  recalc();
}
