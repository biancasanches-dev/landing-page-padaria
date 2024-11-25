import { depoimentos } from './data.js';
import { produtos } from './data.js';

// Menu mobile
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menuContent');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Scroll suave
document.querySelectorAll('.menu-links').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); 
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Exibir produtos
const paesButton = document.getElementById('btnPaes');
const bolosButton = document.getElementById('btnBolos');
const docesButton = document.getElementById('btnDoces');
const loadMoreButton = document.getElementById('loadMore');

const paesContainer = document.getElementById('paes');
const bolosContainer = document.getElementById('bolos');
const docesContainer = document.getElementById('doces');

const createCard = (produto) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
        <img src="${produto.imagem}" alt="Imagem de ${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>${produto.preco}</p>
        <button>Comprar</button>
    `;

    return card;
};

let selectedCategory = 'paes';
let displayedProducts = 6;

const displayProducts = (produtos, categoria) => {
    const filteredProducts = produtos.filter(produto => produto.categoria === categoria);
    
    paesContainer.innerHTML = '';
    bolosContainer.innerHTML = '';
    docesContainer.innerHTML = '';

    filteredProducts.slice(0, displayedProducts).forEach((produto) => {
        const card = createCard(produto);

        if (produto.categoria === 'paes') {
            paesContainer.appendChild(card);
        } else if (produto.categoria === 'bolos') {
            bolosContainer.appendChild(card);
        } else {
            docesContainer.appendChild(card);
        }
    });

    if (produtos.length > displayedProducts) {
        loadMoreButton.style.display = 'flex';
    } else {
        loadMoreButton.style.display = 'none';
    }
};

const updateButtonSelection = (selectedButton, categoria) => {
    paesButton.classList.remove('active');
    bolosButton.classList.remove('active');
    docesButton.classList.remove('active');
    selectedButton.classList.add('active');
    selectedCategory = categoria;
};

paesButton.addEventListener('click', () => {
    updateButtonSelection(paesButton, 'paes');
    displayedProducts = 6; // Reset the displayed products count
    displayProducts(produtos, 'paes');
});

bolosButton.addEventListener('click', () => {
    updateButtonSelection(bolosButton, 'bolos');
    displayedProducts = 6; // Reset the displayed products count
    displayProducts(produtos, 'bolos');
});

docesButton.addEventListener('click', () => {
    updateButtonSelection(docesButton, 'doces');
    displayedProducts = 6; // Reset the displayed products count
    displayProducts(produtos, 'doces');
});

loadMoreButton.addEventListener('click', () => {
    displayedProducts += 6;
    displayProducts(produtos, selectedCategory);
});

// Inicializar com a categoria 'paes' selecionada
updateButtonSelection(paesButton, 'paes');
displayProducts(produtos, 'paes');

// Slide de depoimentos
const reviewContainer = document.getElementById("reviewContainer");

depoimentos.forEach((depoimento, index) => {
  const card = document.createElement("div");
  card.classList.add("review-card");
  card.setAttribute("data-index", index);

  card.innerHTML = `
    <img src="${depoimento.foto}" alt="Foto de ${depoimento.nome}">
    <h3>${depoimento.nome}</h3>
    <p>${depoimento.texto}</p>
  `;

  reviewContainer.appendChild(card);
});

// Lógica do slider
let currentIndex = 0;

const updateSlide = () => {
  const offset = -currentIndex * 100;
  reviewContainer.style.transform = `translateX(${offset}%)`;
};

document.getElementById("prevReview").addEventListener("click", () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
  updateSlide();
});

document.getElementById("nextReview").addEventListener("click", () => {
  const totalSlides = depoimentos.length;
  currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : totalSlides - 1;
  updateSlide();
});

// Enviar contato
document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    
    console.log(name, email, phone, message);
    
    alert("Mensagem enviada com sucesso!");

    event.target.reset();
});