const API_URL = 'https://api-ubt.mukuru.com/taurus/v1/resources/pay-out-partners';

function searchPayoutPartners() {
    const country = document.getElementById('country').value;
    const pageSize = document.getElementById('pageSize').value;
    const page = document.getElementById('page').value;

    if (!country) {
        showError('Please select a country.');
        return;
    }

    const apiUrl = `${API_URL}?country=${encodeURIComponent(country)}&page_size=${encodeURIComponent(pageSize)}&page=${encodeURIComponent(page)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.results) {
                displayResults(data.results);
            } else {
                showError('No payout partners found.');
            }
        })
        .catch(error => showError(`Error: ${error.message}`));
}

function displayResults(partners) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    partners.forEach(partner => {
        const partnerDiv = document.createElement('div');
        partnerDiv.className = 'partner';
        partnerDiv.innerHTML = `
            <h3>${partner.name}</h3>
            <p>${partner.address}</p>
            <p>${partner.contact}</p>
        `;
        resultsDiv.appendChild(partnerDiv);
    });
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

document.getElementById('country').addEventListener('change', clearError);
document.getElementById('pageSize').addEventListener('change', clearError);
document.getElementById('page').addEventListener('change', clearError);
