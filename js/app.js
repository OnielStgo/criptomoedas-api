const moedaSelect = document.querySelector('#moeda');
const criptomoedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');

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