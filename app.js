// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 11); // Set view to Chicago

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to add markers
function addMarkers(data) {
    data.forEach(item => {
        var marker = L.marker([item.latitude, item.longitude]).addTo(map);
        
        var popupContent = `<b>Address:</b> ${item.property_address}<br>` +
                           `<b>ID:</b> ${item.id}<br>` +
                           `<b>Owner/Agent:</b> ${item.owner_management_agent_name}<br>` +
                           `<b>Phone:</b> ${item.owner_notices_agent_phone}<br>` +
                           `<b>Email:</b> ${item.owner_notices_agent_email}<br>` +
                           `<b>Owner Address:</b> ${item.owner_address}<br>` +
                           `<b>City:</b> ${item.owner_city}<br>` +
                           `<b>State:</b> ${item.owner_state}`;
        
        marker.bindPopup(popupContent);
    });
}
function toggleHeader() {
    var header = document.getElementById('header');
    var toggleArrow = document.getElementById('toggle-arrow');
    var map = document.getElementById('map');

    if (header.style.maxHeight && header.style.maxHeight !== '0px') {
        header.style.maxHeight = '0';
        toggleArrow.style.transform = 'translateX(-50%) rotate(180deg)';
        map.style.height = 'calc(100vh)'; // Expand map to full height
    } else {
        header.style.maxHeight = '200px'; // Adjust to the expanded height of your header
        toggleArrow.style.transform = 'translateX(-50%)';
       // map.style.height = 'calc(100vh - 200px)'; // Adjust map height based on header size
    }
}





// Fetch data from your API and add markers
fetch('http://127.0.0.1:5000/api/foreclosures')
    .then(response => response.json())
    .then(data => addMarkers(data));
