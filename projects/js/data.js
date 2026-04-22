// ===================== CAR DATA =====================
const CARS = [
  {
    id: 1,
    model: "Hyundai Creta",
    cat: "Compact SUV",
    price: 2200,
    img: "Hyundai Creta",cat:"Compact SUV",price:2200,img:"https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1755765115423/front-left-side-47.jpg?tr=w-230",
    feats: ["5-Seater", "Automatic", "Sunroof"],
    available: true
  },
  {
    id: 2,
    model: "Toyota Fortuner",
    cat: "Premium SUV",
    price: 4000,
    img: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg",
    feats: ["7-Seater", "4x4 Drive", "Leather Seats"],
    available: true
  },
  {
    id: 3,
    model: "Maruti Swift",
    cat: "Hatchback",
    price: 1200,
    img: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/159099/swift-exterior-right-front-three-quarter.jpeg",
    feats: ["5-Seater", "Manual", "Fuel Efficient"],
    available: true
  },
  {
    id: 4,
    model: "Mahindra Thar",
    cat: "Off-road 4x4",
    price: 3000,
    img: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/40087/thar-exterior-right-front-three-quarter-11.jpeg",
    feats: ["4-Seater", "Manual", "Adventure"],
    available: true
  }
];

// ===================== STORAGE UTILITIES =====================
function getBookings() {
  try {
    return JSON.parse(localStorage.getItem('de_v2')) || [];
  } catch (e) {
    return [];
  }
}

function saveBookings(b) {
  try {
    localStorage.setItem('de_v2', JSON.stringify(b));
  } catch (e) {}
}
