function formatAddress(location) {
    return `${location.name}, ${location.address}`;
}

function isValidCountryCode(code) {
    return ['ZW', 'MW', 'ZM', 'ZA'].includes(code);
}
