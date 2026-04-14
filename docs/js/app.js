// docs/js/app.js

// Real Tijuana Businesses along Blvd. Fundadores to Zona Centro
const realBusinesses = [
    // Blvd. Fundadores area
    { id: 1, name: 'Subway Fundadores', category: 'Restaurante', address: 'Blvd. Fundadores 8431', lat: 32.5195, lng: -117.0345, visited: false },
    { id: 2, name: 'Los Chilaquiles', category: 'Restaurante', address: 'Blvd. Fundadores 2040', lat: 32.5185, lng: -117.0335, visited: false },
    { id: 3, name: 'Tacos El Paisa', category: 'Restaurante', address: 'Blvd. Fundadores', lat: 32.5210, lng: -117.0360, visited: false },
    { id: 4, name: 'Little Caesars Fundadores', category: 'Restaurante', address: 'Blvd. Fundadores', lat: 32.5175, lng: -117.0325, visited: false },
    { id: 5, name: 'OXXO Fundadores', category: 'Tienda', address: 'Blvd. Fundadores', lat: 32.5200, lng: -117.0350, visited: false },
    { id: 6, name: 'Farmacia Roma Fundadores', category: 'Tienda', address: 'Blvd. Fundadores', lat: 32.5190, lng: -117.0340, visited: false },

    // Transition to Centro
    { id: 7, name: 'Tacos El Franc', category: 'Restaurante', address: 'Blvd. Sanchez Taboada', lat: 32.5285, lng: -117.0255, visited: false },

    // Zona Centro / Av. Revolución
    { id: 8, name: 'Caesar\'s Restaurant', category: 'Restaurante', address: 'Av. Revolución 8190', lat: 32.5332, lng: -117.0385, visited: false },
    { id: 9, name: 'La Justina', category: 'Restaurante', address: 'Av. Revolución 930', lat: 32.5315, lng: -117.0375, visited: false },
    { id: 10, name: 'Cine Tonalá', category: 'Bar', address: 'Av. Revolución 1106', lat: 32.5305, lng: -117.0370, visited: false },
    { id: 11, name: 'Giuseppis Revolución', category: 'Restaurante', address: 'Av. Revolución 892', lat: 32.5325, lng: -117.0380, visited: false },
    { id: 12, name: 'Burger King Revolución', category: 'Restaurante', address: 'Av. Revolución 898', lat: 32.5320, lng: -117.0380, visited: false },
    { id: 13, name: 'Mamut Brewing Co.', category: 'Bar', address: 'Pasaje Rodríguez', lat: 32.5330, lng: -117.0375, visited: false },
    { id: 14, name: 'Teorema/Lúdica Co-taproom', category: 'Bar', address: 'Av. Revolución', lat: 32.5310, lng: -117.0370, visited: false },
    { id: 15, name: 'El Dandy del Sur', category: 'Bar', address: 'Calle 6ta 2030', lat: 32.5308, lng: -117.0360, visited: false },
    { id: 16, name: 'La Mezcalera', category: 'Bar', address: 'Calle 6ta 8267', lat: 32.5307, lng: -117.0355, visited: false },
    { id: 17, name: 'Praga Café', category: 'Cafetería', address: 'Av. Revolución', lat: 32.5340, lng: -117.0390, visited: false },
    { id: 18, name: 'Container Coffee', category: 'Cafetería', address: 'Av. Revolución', lat: 32.5295, lng: -117.0365, visited: false },
    { id: 19, name: 'Dandy del Sur', category: 'Bar', address: 'Calle 6ta', lat: 32.5309, lng: -117.0361, visited: false },
    { id: 20, name: 'Hotel Nelson', category: 'Hotel', address: 'Av. Revolución', lat: 32.5345, lng: -117.0395, visited: false },
    { id: 21, name: 'Pasaje Rodríguez', category: 'Tienda', address: 'Av. Revolución', lat: 32.5331, lng: -117.0374, visited: false },
    { id: 22, name: 'Sanborns Centro', category: 'Restaurante', address: 'Av. Revolución', lat: 32.5322, lng: -117.0378, visited: false },
    { id: 23, name: 'Dairy Queen Centro', category: 'Restaurante', address: 'Av. Revolución', lat: 32.5318, lng: -117.0376, visited: false },
    { id: 24, name: 'Tacos Las Quinceañeras', category: 'Restaurante', address: 'Calle 4ta', lat: 32.5342, lng: -117.0365, visited: false },
    { id: 25, name: 'Bar Nelson', category: 'Bar', address: 'Av. Revolución', lat: 32.5344, lng: -117.0394, visited: false },
    { id: 26, name: 'Dante Coffee', category: 'Cafetería', address: 'Calle 4ta', lat: 32.5340, lng: -117.0370, visited: false },
    { id: 27, name: 'Mictlan Cerveceria', category: 'Bar', address: 'Av. Revolución', lat: 32.5300, lng: -117.0368, visited: false },
    { id: 28, name: 'Sótano Suizo', category: 'Bar', address: 'Paseo de los Héroes (Near)', lat: 32.5300, lng: -117.0200, visited: false },
    { id: 29, name: 'Telefónica Gastro Park', category: 'Restaurante', address: 'Blvd. Agua Caliente', lat: 32.5260, lng: -117.0210, visited: false },
    { id: 30, name: 'Tacos El Yaqui', category: 'Restaurante', address: 'Constitución', lat: 32.5310, lng: -117.0400, visited: false }
];

let currentFilter = 'Todos';
let visitsCount = 0;
const GOAL = 20;
let map;
let markers = [];

// Initialize the app
function initApp() {
    renderFilters();
    renderBusinessList(realBusinesses);
    updateProgress();
    initMap();
}

function renderFilters() {
    const categories = ['Todos', 'Restaurante', 'Cafetería', 'Bar', 'Tienda'];
    const filterContainer = document.querySelector('.filters');

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === currentFilter ? 'active' : ''}" onclick="setFilter('${cat}')">
            ${cat}
        </button>
    `).join('');
}

function setFilter(category) {
    currentFilter = category;
    renderFilters();
    const filtered = currentFilter === 'Todos'
        ? realBusinesses
        : realBusinesses.filter(b => b.category === currentFilter);
    renderBusinessList(filtered);
    updateMarkers(filtered);
}

function renderBusinessList(businesses) {
    const listContainer = document.querySelector('.business-list');
    listContainer.innerHTML = businesses.map(b => `
        <div class="business-card ${b.visited ? 'visited' : ''}" id="business-${b.id}" onclick="focusBusiness(${b.id})">
            <div class="business-info">
                <h3>${b.name}</h3>
                <p><span class="badge">${b.category}</span> • ${b.address}</p>
            </div>
            <button class="visit-btn" ${b.visited ? 'disabled' : ''} onclick="event.stopPropagation(); openVisitModal(${b.id})">
                ${b.visited ? '✓' : 'Registrar'}
            </button>
        </div>
    `).join('');
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');

    const percentage = Math.min((visitsCount / GOAL) * 100, 100);
    progressFill.style.width = `${percentage}%`;
    progressText.innerText = `${visitsCount} / ${GOAL} locales (Meta del día)`;
}

// Modal logic
let selectedBusinessId = null;

function openVisitModal(id) {
    selectedBusinessId = id;
    const business = realBusinesses.find(b => b.id === id);
    document.getElementById('modal-business-name').innerText = business.name;
    document.querySelector('.modal-overlay').classList.add('active');
}

function closeVisitModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
    document.getElementById('visit-form').reset();
    selectedBusinessId = null;
}

// Focus map on business
function focusBusiness(id) {
    const business = realBusinesses.find(b => b.id === id);
    if (map && business) {
        map.setView([business.lat, business.lng], 18);
        markers.find(m => m.id === id).marker.openPopup();
    }
}

// Handle visit registration
async function handleVisitSubmit(event) {
    event.preventDefault();
    const notes = document.getElementById('visit-notes').value;
    const photoFile = document.getElementById('visit-photo').files[0];

    if (!selectedBusinessId) return;

    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'Guardando...';
    submitBtn.disabled = true;

    try {
        let imageUrl = '';
        if (photoFile && typeof uploadToCloudinary === 'function') {
            const uploadResult = await uploadToCloudinary(photoFile);
            imageUrl = uploadResult.secure_url;
        }

        const visitData = {
            businessId: selectedBusinessId,
            notes: notes,
            imageUrl: imageUrl,
            timestamp: new Date().toISOString()
        };

        if (typeof saveVisitToSupabase === 'function') {
            await saveVisitToSupabase(visitData);
        }

        // Update local state
        const business = realBusinesses.find(b => b.id === selectedBusinessId);
        if (business && !business.visited) {
            business.visited = true;
            visitsCount++;
            updateProgress();
            const filtered = currentFilter === 'Todos' ? realBusinesses : realBusinesses.filter(b => b.category === currentFilter);
            renderBusinessList(filtered);
            updateMarkers(filtered);
        }

        closeVisitModal();
    } catch (error) {
        console.error('Error registering visit:', error);
        alert('Hubo un error al registrar la visita.');
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
}

function initMap() {
    if (typeof L === 'undefined') return;

    // Center on Tijuana Centro
    map = L.map('map').setView([32.5332, -117.0385], 14);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);

    updateMarkers(realBusinesses);
}

function updateMarkers(businesses) {
    // Clear existing markers
    markers.forEach(m => map.removeLayer(m.marker));
    markers = [];

    businesses.forEach(b => {
        const markerColor = b.visited ? '#22c55e' : '#2563eb';
        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        const marker = L.marker([b.lat, b.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <strong>${b.name}</strong><br>
                    ${b.category}<br>
                    <button onclick="openVisitModal(${b.id})" ${b.visited ? 'disabled' : ''} style="margin-top: 5px; padding: 4px 8px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        ${b.visited ? 'Visitado' : 'Registrar'}
                    </button>
                </div>
            `);

        markers.push({ id: b.id, marker: marker });
    });
}

document.addEventListener('DOMContentLoaded', initApp);
document.getElementById('visit-form')?.addEventListener('submit', handleVisitSubmit);
