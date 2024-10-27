let selectedBox = null;

// Valores dos ícones de 1 a 6
const iconValues = {
    "icon1.png": 22,
    "icon2.png": 21,
    "icon3.png": 20,
    "icon4.png": 11,
    "icon5.png": 10,
    "icon6.png": 0
};

// Objeto para rastrear quais ícones estão em quais boxes
const iconPositions = {};

// Função para abrir o modal e registrar a caixa que foi clicada
function openModal(box) {
    selectedBox = box; // Armazena a referência da caixa clicada
    document.getElementById("iconModal").style.display = "flex"; // Exibe o modal ao clicar na caixa
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("iconModal").style.display = "none"; // Garante que o modal seja oculto
}

// Função para fechar o modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById("iconModal");
    if (event.target === modal) {
        closeModal();
    }
}

// Função para selecionar o ícone e colocá-lo na caixa clicada
function selectIcon(icon) {
    const iconSrc = icon.src.split("/").pop(); // Obtém apenas o nome do arquivo

    // Verifica se o ícone já foi selecionado em outra caixa
    const existingBox = Object.keys(iconPositions).find(key => iconPositions[key] === iconSrc);

    if (existingBox) {
        // O ícone já está em outra caixa
        if (selectedBox.innerHTML === '') {
            // A caixa selecionada está vazia, então apenas movemos o ícone
            document.getElementById(existingBox).innerHTML = ''; // Limpa a caixa anterior
        } else {
            // A caixa selecionada já tem um ícone, então substituímos o ícone da nova caixa
            const currentIconInBox = selectedBox.querySelector("img").src.split("/").pop();
            iconPositions[existingBox] = currentIconInBox; // Atualiza a posição do ícone substituído
            document.getElementById(existingBox).innerHTML = ''; // Limpa a caixa anterior
            addIconToBox(existingBox, currentIconInBox);
        }
    }

    // Adiciona o novo ícone à caixa selecionada
    addIconToBox(selectedBox.id, iconSrc);

    // Atualiza a posição do ícone no objeto de posições
    iconPositions[selectedBox.id] = iconSrc;

    closeModal(); // Fecha o modal após selecionar o ícone
}

// Função para adicionar o ícone em uma caixa específica
function addIconToBox(boxId, iconSrc) {
    const box = document.getElementById(boxId);
    box.innerHTML = ''; // Limpa o conteúdo da caixa
    const img = document.createElement("img");
    img.src = `images/${iconSrc}`; // Define o caminho completo para o ícone
    img.classList.add("selected-icon"); // Classe para ajustar o estilo da imagem no box
    box.appendChild(img);
}

// Função para calcular e exibir o resultado das fórmulas
function calculateAndDisplayResults() {
    const box1Icon = iconPositions["box1"] ? iconValues[iconPositions["box1"]] : 0;
    const box2Icon = iconPositions["box2"] ? iconValues[iconPositions["box2"]] : 0;
    const box3Icon = iconPositions["box3"] ? iconValues[iconPositions["box3"]] : 0;

    // Fórmulas
    const result1 = (2 * box1Icon) + 11;  // Fórmula para x
    const result2 = (2 * box3Icon + box2Icon) - 5;  // Fórmula para y
    const result3 = (box2Icon + box3Icon) - box1Icon;  // Fórmula para z

    // Exibe o resultado no h1
    const resultElement = document.getElementById("result");
    resultElement.textContent = `X: ${result1} Y: ${result2} Z: ${result3}`;
    resultElement.style.display = "block"; // Exibe o h1
}

// Função para limpar as boxes e ocultar o h1
function clearBoxes() {
    // Limpa as caixas e os ícones selecionados
    document.getElementById("box1").innerHTML = '';
    document.getElementById("box2").innerHTML = '';
    document.getElementById("box3").innerHTML = '';
    
    // Reseta o objeto iconPositions
    Object.keys(iconPositions).forEach(key => delete iconPositions[key]);

    // Oculta o resultado
    document.getElementById("result").style.display = "none";
}
