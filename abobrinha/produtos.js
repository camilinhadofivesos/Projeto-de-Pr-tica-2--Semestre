async function API(){
    const url = 'http://localhost:8080/produtos.html#/:categoria&:titulo'
    let categpria =
    await fetch(url + categoria)
        .then(results => results.json())
        .then(dados => {
            if(dados.length < 1){
                document.getElementById('container').innerHTML = 'Produtos não encontrados.'
            }
            else{
                console.log('aqui foi')
                estrutura(titulo, dados)
            }
        })
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
    let container = document.getElementById('container');
    container.innerHTML =   `<div id = 'caixa'>
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