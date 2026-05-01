// ===================== SHARED UTILITIES =====================

function fmtDate(d) {
  if (!d) return '—';
  const [y, m, dd] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return dd + ' ' + months[+m - 1] + ' ' + y;
}

function formatK(n) {
  return n >= 100000 ? (n / 100000).toFixed(1) + 'L'
       : n >= 1000   ? (n / 1000).toFixed(1) + 'K'
       : n;
}

function toast(msg, type = 'ok') {
  const t    = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  document.getElementById('toastMsg').textContent = msg;
  t.className = 'toast show' + (type === 'err' ? ' err-toast' : '');
  icon.className = 'toast-icon ' + (type === 'err' ? 'er' : 'ok');
  icon.textContent = type === 'err' ? '✕' : '✓';
  setTimeout(() => t.classList.remove('show'), 3500);
}

async function updateNavBadge() {
  try {
    const res = await fetch('http://127.0.0.1:5000/bookings');
    const data = await res.json();

    document.getElementById('navBadge').textContent =
      data.length + ' Booking' + (data.length !== 1 ? 's' : '');
  } catch (e) {
    console.error("Nav badge error:", e);
  }
}
