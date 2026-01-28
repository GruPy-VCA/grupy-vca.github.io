// Estado da galeria
let galleryState = {
    photos: [],
    folder: '',
    currentIndex: 0
};

async function loadEvents() {
    const container = document.getElementById('events-container');
    
    try {
        const response = await fetch('events_summary.json');
        const events = await response.json();

        // Remove aria-busy quando terminar de carregar
        container.setAttribute('aria-busy', 'false');

        if (events.length === 0) {
            container.innerHTML = '<p class="text-center col-span-full">Nenhum evento encontrado.</p>';
            return;
        }

        container.innerHTML = ''; // Limpa o carregando

        events.forEach(event => {
            const eventCard = `
                <article class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition hover:shadow-lg">
                    <img src="${event.folder_path}/${event.images.cover}" alt="Foto de capa do evento ${event.title}" class="w-full h-48 object-cover">
                    <div class="p-5">
                        <span class="text-xs font-bold text-blue-600 uppercase">${new Date(event.date_start).toLocaleDateString('pt-BR')}</span>
                        <h3 class="text-xl font-bold mt-1 mb-2">${event.title}</h3>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-3">${event.description}</p>
                        <div class="flex justify-between items-center">
                            <button onclick="openGallery('${event.folder_path}', ${JSON.stringify(event.images.gallery).replace(/"/g, '&quot;')})" 
                                    class="text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                                    aria-label="Ver fotos do evento ${event.title}">
                                <i class="fas fa-camera mr-1" aria-hidden="true"></i> Ver fotos
                            </button>
                            <a href="${event.link}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400">Detalhes</a>
                        </div>
                    </div>
                </article>
            `;
            container.innerHTML += eventCard;
        });

    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        container.setAttribute('aria-busy', 'false');
        container.innerHTML = '<p class="text-center col-span-full text-red-500">Erro ao carregar os eventos.</p>';
    }
}

// Lógica de Modal com navegação
function openGallery(folder, photos) {
    const modal = document.getElementById('gallery-modal');
    
    // Salva o estado da galeria
    galleryState.photos = photos;
    galleryState.folder = folder;
    galleryState.currentIndex = 0;
    
    modal.classList.remove('hidden');
    
    // Exibe a primeira foto
    showPhoto(0);
    
    // Adiciona listener de teclado
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Foca no modal para acessibilidade
    modal.focus();
}

function showPhoto(index) {
    const modalImg = document.getElementById('modal-img');
    const thumbsContainer = document.getElementById('modal-thumbs');
    const counter = document.getElementById('photo-counter');
    
    // Garante que o índice está dentro dos limites
    if (index < 0) index = galleryState.photos.length - 1;
    if (index >= galleryState.photos.length) index = 0;
    
    galleryState.currentIndex = index;
    
    // Atualiza a imagem principal
    const photoPath = `${galleryState.folder}/fotos/${galleryState.photos[index]}`;
    modalImg.src = photoPath;
    modalImg.alt = `Foto ${index + 1} de ${galleryState.photos.length} do evento GruPy-VCA`;
    
    // Atualiza o contador
    if (counter) {
        counter.textContent = `${index + 1} / ${galleryState.photos.length}`;
    }
    
    // Atualiza as thumbnails
    thumbsContainer.innerHTML = '';
    galleryState.photos.forEach((photo, i) => {
        const thumb = document.createElement('img');
        thumb.src = `${galleryState.folder}/fotos/${photo}`;
        thumb.alt = `Miniatura da foto ${i + 1}`;
        thumb.className = `h-16 w-16 object-cover cursor-pointer rounded border-2 transition ${i === index ? 'border-blue-500 ring-2 ring-blue-300' : 'border-transparent hover:border-blue-500'}`;
        thumb.setAttribute('role', 'listitem');
        thumb.onclick = () => showPhoto(i);
        thumbsContainer.appendChild(thumb);
    });
    
    // Scroll para a thumbnail ativa
    const activeThumbnail = thumbsContainer.children[index];
    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function nextPhoto() {
    showPhoto(galleryState.currentIndex + 1);
}

function prevPhoto() {
    showPhoto(galleryState.currentIndex - 1);
}

function handleKeyNavigation(e) {
    const modal = document.getElementById('gallery-modal');
    
    // Só processa se o modal estiver visível
    if (modal.classList.contains('hidden')) return;
    
    switch(e.key) {
        case 'ArrowRight':
            e.preventDefault();
            nextPhoto();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            prevPhoto();
            break;
        case 'Escape':
            e.preventDefault();
            closeModal();
            break;
    }
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    
    // Remove listener de teclado
    document.removeEventListener('keydown', handleKeyNavigation);
    
    // Limpa o estado
    galleryState = { photos: [], folder: '', currentIndex: 0 };
}

// Inicia o carregamento
loadEvents();