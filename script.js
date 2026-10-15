document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const galleryGrid = document.getElementById('gallery-grid');

  // 1. Fetch breeds list
  fetch('https://dog.ceo/api/breeds/list/all')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fetching breeds');
      }
      return response.json();
    })
    .then((data) => {
      const breeds = Object.keys(data.message);
      
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
      console.error('Error fetching dog breeds:', error);
      breedSelect.innerHTML = '<option value="" disabled selected>Error cargando razas</option>';
    });

  // 2. Event listener for selection
  breedSelect.addEventListener('change', (event) => {
    const selectedBreed = event.target.value;
    if (!selectedBreed) return;

    fetchImages(selectedBreed);
  });

  // 3. Fetch images for the selected breed
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
