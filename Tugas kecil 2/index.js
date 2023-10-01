import { dog_env } from './env.js';

const savedPetList = localStorage.getItem('petList');
const petList = JSON.parse(savedPetList) || [];

const searchParams = new URLSearchParams(window.location.search);
const currentPage = parseInt(searchParams.get('page')) || 1;

const getBreedsImage = async (sortBy) => {
  try {
    const response = await fetch(`${dog_env.endpoint}v1/images/search?include_categories=true&include_breeds=true&has_breeds=true&page=${currentPage}&limit=10&order=${sortBy}`, {
      method: 'GET',
      headers: {
        'x-api-key': dog_env.API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }

    const data = await response.json();

    if (sortBy === 'desc') {
      data.reverse();
    }

    return data;
  } catch (error) {
    console.error('Error fetching pet data:', error);
    return [];
  }
};

const fetchImage = (sortBy) => {
  getBreedsImage(sortBy)
    .then((data) => {
      localStorage.setItem('petList', JSON.stringify(data));
      renderComponent(data);
    })
    .catch((error) => {
      console.error('Error fetching pet data:', error);
    });
};

const dropdownElement = document.querySelector('.dropdownMenu');
const formElement = document.querySelector('.searchForm');
const searchInputElement = document.querySelector('.searchInput');

const prevPage = document.querySelector('.prevPagination');
const pageOne = document.querySelector('.pageOne');
const pageTwo = document.querySelector('.pageTwo');
const pageThree = document.querySelector('.pageThree');
const nextPage = document.querySelector('.nextPagination');

const PetCardComponent = (pet) => {
  const breed = pet.breeds && pet.breeds.length > 0 ? pet.breeds[0].name : 'Unknown Breed';
  const description = pet.description || 'No description available';
  const lifeSpan = pet.breeds && pet.breeds.length > 0 && pet.breeds[0].life_span ? `Life Span: ${pet.breeds[0].life_span}` : 'Unknown';
  const temperament = pet.breeds && pet.breeds.length > 0 && pet.breeds[0].temperament ? `Temperament: ${pet.breeds[0].temperament}` : 'Unknown';
  const weight = pet.weight && pet.weight.metric ? `Weight: ${pet.weight.metric} kg` : 'Unknown Weight';
  const height = pet.height && pet.height.metric ? `Height: ${pet.height.metric} cm` : 'Unknown Height';

  return `<div class="card my-3 mx-2" style="width: 20%">
    <img height="300" style="object-fit: cover" class="card-img-top" src="${pet.url}" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title d-inline">${breed}</h5>
      <p class="card-text">${description}</p>
      <p>${lifeSpan}</p>
      <span class="badge badge-pill badge-info">${temperament}</span>
      <span class="badge badge-pill badge-warning">${weight}</span>
      <span class="badge badge-pill badge-danger">${height}</span>
    </div>
  </div>`;
};



const renderComponent = (filteredPet) => {
  document.querySelector('.petInfo').innerHTML = filteredPet
    .map((pet) => PetCardComponent(pet))
    .join('');
};

const sortPetById = (key) => {
  if (key === 'ascending') {
    fetchImage('asc');
  } else if (key === 'descending') {
    fetchImage('desc');
  }
};

const searchPetByKey = (key) => {
  return petList.filter((pet) => pet.breeds[0].name.toLowerCase().includes(key.toLowerCase()));
};

dropdownElement.addEventListener('change', (event) => {
  event.preventDefault();
  const value = event.target.value;
  sortPetById(value);
});

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = searchInputElement.value;
  const filteredPet = searchPetByKey(value);
  renderComponent(filteredPet.length > 0 ? filteredPet : petList);
});

const redirectTo = (page) => {
  searchParams.set('page', page);
  window.location.search = searchParams.toString();
};

prevPage.addEventListener('click', (event) => {
  event.preventDefault();
  if (currentPage > 1) {
    redirectTo(currentPage - 1);
  } else {
    redirectTo(1);
  }
});

pageOne.addEventListener('click', (event) => {
  event.preventDefault();
  redirectTo(1);
});

pageTwo.addEventListener('click', (event) => {
  event.preventDefault();
  redirectTo(2);
});

pageThree.addEventListener('click', (event) => {
  event.preventDefault();
  redirectTo(3);
});

nextPage.addEventListener('click', (event) => {
  event.preventDefault();
  redirectTo(currentPage + 1);
});

// Initial fetch on page load
fetchImage('asc');