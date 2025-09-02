const frutas = [{
                        "id":1,
                        "nome":"banana",
                        "imagem":"./imagens/banana_nanica.jpg",
                        "valor":7,
                        "descricao":"Banana nanica",
                        "categoria":1},
                        {"id":2,
                        "nome":"maca",
                        "imagem":"./imagens/macas.webp",
                        "valor":7,
                        "descricao":"Maçã fuji",
                        "categoria":1},
                    {
                        "id":1,
                        "nome":"banana",
                        "imagem":"./imagens/banana_nanica.jpg",
                        "valor":7,
                        "descricao":"Banana nanica",
                        "categoria":1},
                        {"id":2,
                        "nome":"maca",
                        "imagem":"./imagens/macas.webp",
                        "valor":7,
                        "descricao":"Maçã fuji",
                        "categoria":1},
                    {
                        "id":1,
                        "nome":"banana",
                        "imagem":"./imagens/banana_nanica.jpg",
                        "valor":7,
                        "descricao":"Banana nanica",
                        "categoria":1},
                        {"id":2,
                        "nome":"maca",
                        "imagem":"./imagens/macas.webp",
                        "valor":7,
                        "descricao":"Maçã fuji",
                        "categoria":1},
                    {
                        "id":1,
                        "nome":"banana",
                        "imagem":"./imagens/banana_nanica.jpg",
                        "valor":7,
                        "descricao":"Banana nanica",
                        "categoria":1},
                        {"id":2,
                        "nome":"maca",
                        "imagem":"./imagens/macas.webp",
                        "valor":7,
                        "descricao":"Maçã fuji",
                        "categoria":1},
                    {
                        "id":1,
                        "nome":"banana",
                        "imagem":"./imagens/banana_nanica.jpg",
                        "valor":7,
                        "descricao":"Banana nanica",
                        "categoria":1},
                        {"id":2,
                        "nome":"maca",
                        "imagem":"./imagens/macas.webp",
                        "valor":7,
                        "descricao":"Maçã fuji",
                        "categoria":1}]

const hortaliças = [
                        {"id":3,
                        "nome":"alface",
                        "imagem":"alface.jpg",
                        "valor":7,
                        "descricao":"Alface crespa",
                        "categoria":3},
                        {"id":4,
                        "nome":"agriao",
                        "imagem":"agriao.jpg",
                        "valor":7,
                        "descricao":"Agrião",
                        "categoria":3},
                        {"id":5,
                        "nome":"alface",
                        "imagem":"alface.jpg",
                        "valor":7,
                        "descricao":"Alface lisa",
                        "categoria":3}]

                        
function gerarCards(idDiv,lista){
card = '';

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


function carrossel(idSec){
    
}
gerarCards("cards_frutas", frutas)
gerarCards("cards_hortalicas", hortaliças)

    