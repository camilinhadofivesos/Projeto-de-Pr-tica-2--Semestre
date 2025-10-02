/*function handleCategoriaClick(event, categoria, titulo) {
    event.preventDefault();  // Impede a navegação do link

    // Chama a API e espera a resposta
    API(categoria, titulo).then(() => {
        // Depois que a API terminar, você pode navegar
        window.location.href = './produtos.html';
    });
}

*/

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("categoria");
    const titulo = params.get("titulo");

    if (categoria && titulo) {
        API(categoria, titulo);
    }
    else{
        console.log('Erro. Verifique se há parâmetros.')
    }
});


async function API(categoria, titulo){
    const url = `http://localhost:8080/produtos/${categoria}`;
    
    try {
        const response = await fetch(url);
       
         if (!response.ok) {
            throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }
        console.log(response)
        const dados = await response.json();

        if (dados.length < 1) {
            document.getElementById('container').innerHTML = 'Produtos não encontrados.'
        } else {
            console.log('aqui foi')
            estrutura(titulo, dados)
        }
    } catch (erro) {
        console.log("Erro ao realizar a requisição:", erro);
    }
}


function carrossel(direcao, nomeDaClasse){
    let caixa = document.querySelector(nomeDaClasse)
    let largura = 1300;
    
    if (direcao === 'esq'){
        caixa.scrollLeft -= largura;
    }
    else{
        if(direcao === 'dir'){
            caixa.scrollLeft += largura;
        }
    }
}

function estrutura(title,lista){
    console.log("entrou na estrutura")
    let container = document.getElementById('container');
    console.log(container);
    container.innerHTML = `<div id = 'caixa'>
                        <div id = 'titulo'><h1>${title}</h1></div>
                    <div>
                        <div id = 'cards_container'></div>
                    </div>`;
    console.log('aqui foi 2')
    gerarCards('cards_container', lista)
}

function gerarCards(idDiv, lista){
let card = '';
    console.log('aqui foi 3')
    for (let i = 0; i<lista.length; i++){
        card += `<div class = 'card'>`
        card += `<img src = '${lista[i].imagem}'>`
        card += `<div>`
        card += `<h2>${lista[i].descricao}</h2>`
        card += `<span>R$${lista[i].valor}</span>`
        card += `<button>Adicionar à sacola</button>`
        card += `</div>`
        card += `</div>`
    }
    document.getElementById(idDiv).innerHTML = card;
}

function buscar(){
    let input = document.getElementById('campoBusca');
    
    //mostrar a ferramenta de busca
    input.style.display = 'block'

    input.addEventListener('keydown', function(event){
        if (event.key === 'Enter'){
            document.addEventListener('DOMContentLoaded', function(){
                let valorDigitado = input.value;
                fetch(`http://localhost:8080/produtosBusca/${valorDigitado}`)
                .then(resp => resp.json())
                .then(dados => {
                    estrutura('Produtos encontrados', dados)
                })
            })
        }
    })
}