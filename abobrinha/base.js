let cabecalho = document.getElementById('cab');
        let rodape = document.getElementById('rod')
        fetch('cabec.html')
            .then(resp => {
                return resp.text();
            })
            .then ( arq => {
                cabecalho.innerHTML = arq;
            })
        
            fetch('rodape.html')
            .then( resp => {
                return resp.text()
            })
            .then( arquivo => {
                rodape.innerHTML = arquivo;
            })

function buscar(){
    let input = document.getElementById('campoBusca');

    //mostrar a ferramenta de busca
    input.style.display = 'block'
    
}