document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const galleryGrid = document.getElementById('gallery-grid');
  const breedInfoSection = document.getElementById('breed-info-section');
  const breedInfoCard = document.getElementById('breed-info-card');

  let localBreedsData = {};

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

  breedSelect.addEventListener('change', (event) => {
    const selectedBreed = event.target.value;
    if (!selectedBreed) return;

    displayBreedInfo(selectedBreed);
    fetchImages(selectedBreed);
  });

  function displayBreedInfo(breed) {
    const info = localBreedsData[breed];
    const breedName = breed.charAt(0).toUpperCase() + breed.slice(1);

    if (info) {
      breedInfoCard.innerHTML = `
        <h3 class="info-name">${breedName}</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Origen</span>
            <span class="info-value">${info.origen}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Tamaño</span>
            <span class="info-value">${info.tamaño}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Temperamento</span>
            <span class="info-value">${info.temperamento}</span>
          </div>
        </div>
      `;
    } else {
      breedInfoCard.innerHTML = `
        <h3 class="info-name">${breedName}</h3>
        <p class="info-empty">Todavía no tenemos información detallada para esta raza.</p>
      `;
    }

    breedInfoSection.style.display = 'block';
  }

  function fetchImages(breed) {
    galleryGrid.innerHTML = '<p class="placeholder">Cargando fotos...</p>';

    fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching images');
        }
        return response.json();
      })
      .then((data) => {
        const images = data.message;
        galleryGrid.innerHTML = '';

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
