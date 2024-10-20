let ts = Date.now();
let pubKey = "fcb7f027d29425ac61ba7be496e59f66";
let priKey = "5a4d835d5c4734087e9a816f4304ca9b0d631e73";
let hash = CryptoJS.MD5(ts + priKey + pubKey).toString();

const baseURL = 'https://gateway.marvel.com/v1/public';

const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
const cardsContainer = document.getElementById('cardsContainer');

function createMarvelUrl(endpoint) {
    return `${endpoint}?ts=${ts}&apikey=${pubKey}&hash=${hash}`;
}

async function fetchMarvelData() {
    try {
        const response = await fetch(createMarvelUrl(baseUrl));
        const data = await response.json();
        console.log(data);
        displayCharacters(data.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCharacters(characters) {
    characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'p-4');

        card.innerHTML = `
            <img class="w-full h-48 object-cover mb-4" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name || 'No hay foto disponible'}">
            <h2 class="text-lg font-bold mb-2">${character.name || 'No hay nombre disponible'}</h2>
            <p class="text-gray-700">${character.description || 'No hay descripción'}</p>
        `;

        cardsContainer.appendChild(card);
    });
}

fetchMarvelData();