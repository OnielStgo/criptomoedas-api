const criptomoedasSelect = document.querySelector('#criptomonedas');

document.addEventListener('DOMContentLoaded', () => {
  consultarCriptomoedas();
});

function consultarCriptomoedas(){
  const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => selectCriptomoedas(resultado.Data))
}

function selectCriptomoedas(criptomoedas){
  criptomoedas.forEach(cripto => {
    const { Name, FullName } = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;

    criptomoedasSelect.appendChild(option)
  });
  
}