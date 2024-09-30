// URL to fetch Pokémon types (categories)
const typeUrl = "https://pokeapi.co/api/v2/type";

// DOM Elements
const categorySelect = document.getElementById("Category");
const searchForm = document.querySelector('.search');
const cardContainer = document.querySelector('.card-container');

// Function to fetch and populate Pokémon types into the dropdown
async function loadCategories() {
  try {
    const response = await fetch(typeUrl);
    const data = await response.json();
    const types = data.results;

    // Clear existing options
    categorySelect.innerHTML = '';

    // Add an option for each type
    types.forEach(type => {
      const option = document.createElement("option");
      option.value = type.name;
      option.textContent = type.name ;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

// Function to fetch Pokémon by type and number of cards
async function fetchPokemonByType(type, numberOfCards) {
  try {
    const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const typeData = await typeResponse.json();
    
    console.log(" fetch done ", typeData)

    const pokemons = typeData.pokemon.slice(0, numberOfCards);  
    cardContainer.innerHTML = '';

    // Fetch each Pokémon's details and display them in cards
    for (const { pokemon } of pokemons) {
      const pokemonData = await fetchPokemonDetails(pokemon.url);
      displayPokemonCard(pokemonData);
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

// Function to fetch Pokémon details by URL
async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to create and display Pokémon cards
function displayPokemonCard(pokemon) {
  const cardHTML = `
      <div class="card">
          <div class="top">
          <img src="${pokemon.sprites.back_default}" alt="${pokemon.name}">
              <h3>${pokemon.name.toUpperCase()}</h3>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
          </div>
          <div class="middle">
              <div class="line1">
                  <h3>Basic</h3>
                  <p>Height: ${pokemon.height} | Weight: ${pokemon.weight}</p>
              </div>
              <div class="line1">
                  <h3>Moves</h3>
                  <p>${pokemon.moves.length} moves</p>
              </div>
          </div>
          <div class="last">
              <div class="box">
                  <h3>Stats :</h3>
                  <ul>
                      ${pokemon.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                  </ul>
              </div>
              <div class="box">
                  <h3>Abilities :</h3>
                  <ul>
                      ${pokemon.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
                  </ul>
              </div>
            <img src="./src/omni.png" class="omni">
          </div>
      </div>
  `;

  // Append the card to the container
  cardContainer.insertAdjacentHTML('beforeend', cardHTML);
}

// Event Listener for form submission
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent form from reloading the page

  const numberOfCards = searchForm.querySelector('input[type="number"]').value;
  const selectedType = categorySelect.value;

  // Fetch Pokémon data based on user input
  fetchPokemonByType(selectedType, numberOfCards);
});

// Load categories on page load
loadCategories();