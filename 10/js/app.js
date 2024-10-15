let ts = Date.now();
let publicKey = "fcb7f027d29425ac61ba7be496e59f66";
let privateKey = "5a4d835d5c4734087e9a816f4304ca9b0d631e73";
let hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const baseURL = 'https://gateway.marvel.com/v1/public';

// Función para crear las cards
function createCard(character) {
    return `
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}" class="w-full h-64 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2">${character.name}</h2>
                <p class="text-gray-700">${character.description || 'No description available.'}</p>
            </div>
        </div>
    `;
}

// Función para mostrar personajes en el DOM
function displayCharacters(characters) {
    const container = document.getElementById('cards-container');
    container.innerHTML = characters.map(character => createCard(character)).join('');
}

// Fetch usando async/await para el primer endpoint
async function fetchCharacters() {
    const response = await fetch(`${baseURL}/characters?ts=${ts}&apikey=${pubkey}&hash=${hash}`);
    const data = await response.json();
    displayCharacters(data.data.results);
}

// Fetch usando async/await para el segundo endpoint (comics por ejemplo)
async function fetchComics() {
    const response = await fetch(`${baseURL}/comics?ts=${ts}&apikey=${pubkey}&hash=${hash}`);
    const data = await response.json();
    console.log(data.data.results); // Puedes mostrar comics de la misma forma
}

// Ejecutar las funciones
fetchCharacters();
fetchComics();
// const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
// const cardsContainer = document.getElementById('cardsContainer');

// // Función para crear la URL con los parámetros requeridos
// function createMarvelUrl(endpoint) {
//     return `${endpoint}?ts=${ts}&apikey=${pubkey}&hash=${hash}`;
// }

// // Función para obtener datos de la API de Marvel
// async function fetchMarvelData() {
//     try {
//         const response = await fetch(createMarvelUrl(baseUrl));
//         const data = await response.json();
//         console.log(data);
//         displayCharacters(data.data.results);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// // Función para mostrar los personajes en tarjetas
// function displayCharacters(characters) {
//     characters.forEach(character => {
//         const card = document.createElement('div');
//         card.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'p-4');

//         card.innerHTML = `
//             <img class="w-full h-48 object-cover mb-4" src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
//             <h2 class="text-lg font-bold mb-2">${character.name}</h2>
//             <p class="text-gray-700">${character.description || 'No description available.'}</p>
//         `;

//         cardsContainer.appendChild(card);
//     });
// }

// // Llamada inicial para obtener y mostrar los personajes
// fetchMarvelData();