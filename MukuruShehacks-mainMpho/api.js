const BASE_URL = 'https://api-ubt.mukuru.com/taurus/v1/resources';

async function fetchPayoutPartners(country) {
    const response = await fetch(`${BASE_URL}/pay-out-partners?country=${country}&page_size=10&page=1`);
    const data = await response.json();
    return data.partners;
}

async function fetchPayoutLocations(partnerGuid) {
    const response = await fetch(`${BASE_URL}/pay-out-partners/${partnerGuid}/locations?page_size=10&page=1`);
    const data = await response.json();
    return data.locations;
}
