// docs/js/app.js

// Mock data: 50 restaurants along the route from Fundadores to Center
const mockBusinesses = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Restaurante ${i + 1}`,
    category: i % 3 === 0 ? 'Restaurante' : (i % 3 === 1 ? 'Cafetería' : 'Bar'),
    address: `Calle ${10 + i}, Centro`,
    lat: 6.2442 + (i * 0.0005), // Approximate coordinates
    lng: -75.5709 + (i * 0.0005),
    visited: false
}));

let currentFilter = 'Todos';
let visitsCount = 0;
const GOAL = 20;

// Initialize the app
function initApp() {
    renderFilters();
    renderBusinessList(mockBusinesses);
    updateProgress();
    initMap();
}

function renderFilters() {
    const categories = ['Todos', 'Restaurante', 'Cafetería', 'Bar'];
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
        ? mockBusinesses
        : mockBusinesses.filter(b => b.category === currentFilter);
    renderBusinessList(filtered);
}

function renderBusinessList(businesses) {
    const listContainer = document.querySelector('.business-list');
    listContainer.innerHTML = businesses.map(b => `
        <div class="business-card ${b.visited ? 'visited' : ''}" id="business-${b.id}">
            <div class="business-info">
                <h3>${b.name}</h3>
                <p>${b.category} • ${b.address}</p>
            </div>
            <button class="visit-btn" ${b.visited ? 'disabled' : ''} onclick="openVisitModal(${b.id})">
                ${b.visited ? 'Visitado' : 'Registrar'}
            </button>
        </div>
    `).join('');
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-bar-fill');
    const progressText = document.querySelector('.progress-text');

    const percentage = Math.min((visitsCount / GOAL) * 100, 100);
    progressFill.style.width = `${percentage}%`;
    progressText.innerText = `${visitsCount} / ${GOAL} locales`;
}

// Modal logic
let selectedBusinessId = null;

function openVisitModal(id) {
    selectedBusinessId = id;
    const business = mockBusinesses.find(b => b.id === id);
    document.getElementById('modal-business-name').innerText = business.name;
    document.querySelector('.modal-overlay').classList.add('active');
}

function closeVisitModal() {
    document.querySelector('.modal-overlay').classList.remove('active');
    document.getElementById('visit-form').reset();
    selectedBusinessId = null;
}

// Handle visit registration
async function handleVisitSubmit(event) {
    event.preventDefault();
    const notes = document.getElementById('visit-notes').value;
    const photoFile = document.getElementById('visit-photo').files[0];

    if (!selectedBusinessId) return;

    // Show loading state (could be improved)
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.innerText = 'Guardando...';
    submitBtn.disabled = true;

    try {
        let imageUrl = '';
        if (photoFile) {
            const uploadResult = await uploadToCloudinary(photoFile);
            imageUrl = uploadResult.secure_url;
        }

        const visitData = {
            businessId: selectedBusinessId,
            notes: notes,
            imageUrl: imageUrl,
            timestamp: new Date().toISOString()
        };

        await saveVisitToSupabase(visitData);

        // Update local state
        const business = mockBusinesses.find(b => b.id === selectedBusinessId);
        if (business && !business.visited) {
            business.visited = true;
            visitsCount++;
            updateProgress();
            renderBusinessList(currentFilter === 'Todos' ? mockBusinesses : mockBusinesses.filter(b => b.category === currentFilter));
        }

        closeVisitModal();
    } catch (error) {
        console.error('Error registering visit:', error);
        alert('Hubo un error al registrar la visita.');
    } finally {
        submitBtn.innerText = 'Registrar Visita';
        submitBtn.disabled = false;
    }
}

// Map initialization (Leaflet placeholder)
let map;
function initMap() {
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.log('Leaflet not loaded yet, map container ready.');
        return;
    }

    map = L.map('map').setView([6.2442, -75.5709], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mockBusinesses.forEach(b => {
        L.marker([b.lat, b.lng])
            .addTo(map)
            .bindPopup(`<b>${b.name}</b><br>${b.category}`);
    });
}

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initApp);
document.getElementById('visit-form')?.addEventListener('submit', handleVisitSubmit);
