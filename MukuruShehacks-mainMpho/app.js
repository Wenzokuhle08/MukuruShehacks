document.getElementById('searchButton').addEventListener('click', () => {
    const country = document.getElementById('country').value;
    const province = document.getElementById('province').value.trim();
    const area = document.getElementById('area').value.trim();

    console.log(`Country: ${country}, Province: ${province}, Area: ${area}`);
    fetchLocations(country, province, area);
});

function fetchLocations(country, province, area) {
    fetchPayoutPartners(country)
        .then(partners => {
            if (partners && partners.length > 0) {
                console.log('Partners fetched:', partners);
                const partnerGuid = partners[0].guid; // Modify logic here if necessary
                return fetchPayoutLocations(partnerGuid);
            } else {
                throw new Error('No partners found.');
            }
        })
        .then(locations => {
            console.log('Locations fetched:', locations);
            const filteredLocations = filterLocations(locations, province, area);
            displayLocations(filteredLocations);
        })
        .catch(err => handleError(err));
}

function filterLocations(locations, province, area) {
    return locations.filter(location => {
        return location.province.includes(province) && location.area.includes(area);
    });
}

function displayLocations(locations) {
    const locationList = document.getElementById('locationList');
    locationList.innerHTML = '';
    if (locations.length === 0) {
        locationList.innerHTML = '<li>No locations found matching your criteria.</li>';
    } else {
        locations.forEach(location => {
            const li = document.createElement('li');
            li.textContent = `${location.name}, ${location.address}`;
            locationList.appendChild(li);
        });
    }
}
