document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const galleryGrid = document.getElementById('gallery-grid');
  const breedInfoSection = document.getElementById('breed-info-section');
  const breedInfoCard = document.getElementById('breed-info-card');

  let localBreedsData = {};

  // 1. Fetch data/breeds.json and breeds list from Dog API concurrently
  Promise.all([
    fetch('data/breeds.json').then((res) => (res.ok ? res.json() : {})).catch(() => ({})),
    fetch('https://dog.ceo/api/breeds/list/all').then((res) => {
      if (!res.ok) throw new Error('Error fetching breeds');
      return res.json();
    })
  ])
    .then(([localData, apiData]) => {
      localBreedsData = localData;
      const breeds = Object.keys(apiData.message);
      
      // Clear default loading option
      breedSelect.innerHTML = '<option value="" disabled selected>Elegí una raza...</option>';
      
      breeds.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error('Error inicializando:', error);
      breedSelect.innerHTML = '<option value="" disabled selected>Error cargando razas</option>';
    });

  // 2. Event listener for selection
  breedSelect.addEventListener('change', (event) => {
    const selectedBreed = event.target.value;
    if (!selectedBreed) return;

    displayBreedInfo(selectedBreed);
    fetchImages(selectedBreed);
  });

  // 3. Display breed info from local JSON
  function displayBreedInfo(breed) {
    const info = localBreedsData[breed];
    
    if (info) {
      breedInfoCard.innerHTML = `
        <p><strong>Origen:</strong> ${info.origen}</p>
        <p><strong>Tamaño:</strong> ${info.tamaño}</p>
        <p><strong>Temperamento:</strong> ${info.temperamento}</p>
      `;
    } else {
      breedInfoCard.innerHTML = `
        <p><em>No contamos con información detallada para esta raza todavía.</em></p>
      `;
    }
    
    breedInfoSection.style.display = 'block';
  }

  // 4. Fetch images for the selected breed
  function fetchImages(breed) {
    galleryGrid.innerHTML = '<p class="placeholder">Cargando fotos...</p>';

    // Fetch 4 random images of the selected breed
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching images');
        }
        return response.json();
      })
      .then((data) => {
        const images = data.message;
        galleryGrid.innerHTML = ''; // Clear placeholder

        if (images.length === 0) {
          galleryGrid.innerHTML = '<p class="placeholder">No hay fotos disponibles para esta raza.</p>';
          return;
        }

        images.forEach((imgUrl) => {
          const card = document.createElement('div');
          card.className = 'breed-card';
          
          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = `Foto de un ${breed}`;
          img.loading = 'lazy';

          card.appendChild(img);
          galleryGrid.appendChild(card);
        });
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        galleryGrid.innerHTML = '<p class="placeholder">Error cargando las fotos.</p>';
      });
  }
});
