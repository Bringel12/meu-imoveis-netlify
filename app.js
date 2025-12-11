const API_LISTINGS = "/.netlify/functions/listings";
const API_CONTACT = "/.netlify/functions/contact";

let allListings = [];

async function carregarImoveis() {
  try {
    const res = await fetch(API_LISTINGS);
    if (!res.ok) throw new Error("Falha ao carregar imóveis");
    const data = await res.json();
    allListings = data;
    renderizarImoveis(data);
  } catch (err) {
    console.error(err);
    const container = document.getElementById("listings-container");
    container.innerHTML = "<p>Erro ao carregar imóveis.</p>";
  }
}

function renderizarImoveis(listings) {
  const container = document.getElementById("listings-container");
  if (!listings.length) {
    container.innerHTML = "<p>Nenhum imóvel encontrado com esses filtros.</p>";
    return;
  }

  container.innerHTML = "";
  listings.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title">${item.titulo}</div>
        <div class="card-location">${item.cidade} - ${item.bairro}</div>
      </div>
      <div class="card-body">
        <p>${item.descricao}</p>
        <p><strong>${item.quartos}</strong> quartos • <strong>${item.banheiros}</strong> banheiros • <strong>${item.vaga_garagem ? "1 vaga" : "Sem vaga"}</strong></p>
        <p>Tipo: <strong>${item.tipo}</strong></p>
      </div>
      <div class="card-footer">
        <span class="card-price">R$ ${item.preco.toLocaleString("pt-BR")}</span>
        <button data-id="${item.id}">Tenho interesse</button>
      </div>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => abrirModalContato(item));

    container.appendChild(card);
  });
}

function aplicarFiltros() {
  const cidade = document.getElementById("cidade").value.trim().toLowerCase();
  const tipo = document.getElementById("tipo").value;
  const precoMax = document.getElementById("preco-max").value;

  let filtrados = [...allListings];

  if (cidade) {
    filtrados = filtrados.filter((x) =>
      x.cidade.toLowerCase().includes(cidade)
    );
  }

  if (tipo) {
    filtrados = filtrados.filter((x) => x.tipo === tipo);
  }

  if (precoMax) {
    const max = Number(precoMax);
    filtrados = filtrados.filter((x) => x.preco <= max);
  }

  renderizarImoveis(filtrados);
}

function limparFiltros() {
  document.getElementById("cidade").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("preco-max").value = "";
  renderizarImoveis(allListings);
}

/* Modal de contato */

const modal = document.getElementById("contact-modal");
const modalClose = document.getElementById("modal-close");
const modalInfo = document.getElementById("modal-imovel-info");
const inputImovelId = document.getElementById("imovel-id");
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

function abrirModalContato(imovel) {
  modalInfo.textContent = `${imovel.titulo} - ${imovel.cidade}/${imovel.bairro} - R$ ${imovel.preco.toLocaleString(
    "pt-BR"
  )}`;
  inputImovelId.value = imovel.id;
  contactStatus.textContent = "";
  modal.classList.remove("hidden");
}

function fecharModalContato() {
  modal.classList.add("hidden");
}

modalClose.addEventListener("click", fecharModalContato);
modal.addEventListener("click", (e) => {
  if (e.target === modal) fecharModalContato();
});

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  contactStatus.textContent = "Enviando...";
  try {
    const payload = {
      imovel_id: inputImovelId.value,
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      mensagem: document.getElementById("mensagem").value.trim(),
    };

    const res = await fetch(API_CONTACT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Falha ao enviar contato");
    contactStatus.textContent = "Contato enviado com sucesso!";
    contactForm.reset();
  } catch (err) {
    console.error(err);
    contactStatus.textContent = "Erro ao enviar. Tente novamente.";
  }
});

/* Eventos dos filtros */

document.getElementById("btn-filtrar").addEventListener("click", aplicarFiltros);
document.getElementById("btn-limpar").addEventListener("click", limparFiltros);

/* Inicialização */

carregarImoveis();
