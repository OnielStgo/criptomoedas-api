const moedaSelect = document.querySelector('#moeda');
const criptomoedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {
  moeda: "",
  criptomoeda: ""
}

document.addEventListener('DOMContentLoaded', () => {

  consultarCriptomoedas();
  
  formulario.addEventListener('submit', submitFormulario);

  moedaSelect.addEventListener('change', lerValor);
  criptomoedasSelect.addEventListener('change', lerValor);

});

function consultarCriptomoedas(){
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => selectCriptomoedas(resultado.Data))
}

function selectCriptomoedas(criptomoedas){
  console.log(criptomoedas)
  criptomoedas.forEach(cripto => {
    const { Name, FullName } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;

    criptomoedasSelect.appendChild(option)
  });
  
}

function lerValor(e){
  objBusqueda[e.target.name] = e.target.value;
  console.log(objBusqueda)
}

function submitFormulario(e){
  e.preventDefault();

  //validar o formulario
  const { moeda, criptomoeda } = objBusqueda;

  if(moeda === "" || criptomoeda === ""){
    mostrarAlerta('Os dois campos são obrigatórios');
    return;
  }

  //consultar a API com os resultados
  consultarAPI();
}

function mostrarAlerta(mensagem){
  
  const existeErro = document.querySelector('.error');

  if(!existeErro){
    const divMensagem = document.createElement('p');
    divMensagem.classList.add('error');
    divMensagem.textContent = mensagem;

    formulario.appendChild(divMensagem);

    setTimeout(() => {
      divMensagem.remove(); 
    }, 2500);
  }
}

function consultarAPI(){
  const { moeda, criptomoeda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoeda}&tsyms=${moeda}`;

  mostrarSpinner();

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => mostrarCotizacaoHTML(resultado.DISPLAY[criptomoeda][moeda]))
}

function mostrarCotizacaoHTML(cotizacao){
  console.log(cotizacao);

  limparHTML();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacao;

  const preco = document.createElement('p');
  preco.classList.add('precio');
  preco.innerHTML = `O preço é: <span>${PRICE}</span>`;

  const precoAlto = document.createElement('p');
  precoAlto.innerHTML = `O preço mais alto do dia é: <span>${HIGHDAY}</span>`;

  const precoBaixo = document.createElement('p');
  precoBaixo.innerHTML = `O preço mais baixo do dia é: <span>${LOWDAY}</span>`;

  const ultimasHoras = document.createElement('p');
  ultimasHoras.innerHTML = `Variaçõa últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

  const ultimaAtualizacao = document.createElement('p');
  ultimaAtualizacao.innerHTML = `Variaçõa últimas 24 horas: <span>${LASTUPDATE}</span>`;



  resultado.appendChild(preco);
  resultado.appendChild(precoAlto);
  resultado.appendChild(precoBaixo);
  resultado.appendChild(ultimasHoras);
  resultado.appendChild(ultimaAtualizacao);
}

function limparHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner(){

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');

  spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  `;

  resultado.appendChild(spinner);
}