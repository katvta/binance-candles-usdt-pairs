// Importa o Axios para chamadas HTTP e a biblioteca ws para WebSocket
const axios = require("axios");
const WebSocket = require("ws");

// Função assíncrona para obter os dados de Exchange Info da Binance e filtrar os símbolos com USDT
async function getSymbols() {
  // Faz uma requisição GET à API Exchange Info da Binance
  const { data } = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
  // Filtra os símbolos cujo quoteAsset é "USDT" e os converte para minúsculas (necessário para a stream)
  const symbols = data.symbols
    .filter(s => s.quoteAsset === "USDT")
    .map(s => s.symbol.toLowerCase());
  return symbols;
}

// Função principal que conecta aos WebSockets e processa as informações de velas
async function start() {
  // Obtém o array de símbolos negociados com USDT
  const symbols = await getSymbols();
  
  // Cria a string dos streams no formato "symbol@kline_1m" separados por '/'
  const streams = symbols.map(s => `${s}@kline_1m`).join("/");
  
  // Cria a URL de conexão para a stream combinada da Binance
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
  
  // Define o evento de recebimento de mensagens
  ws.onmessage = (event) => {
    // Converte o payload recebido para objeto
    const obj = JSON.parse(event.data);
    
    // Verifica se a vela (candlestick) está fechada, usando a propriedade 'x'
    if (obj.data.k.x) {
      // Extrai as informações relevantes da vela
      const symbol = obj.data.k.s;      // Símbolo do par
      const open = obj.data.k.o;        // Preço de abertura
      const high = obj.data.k.h;        // Preço máximo
      const low = obj.data.k.l;         // Preço mínimo
      const close = obj.data.k.c;       // Preço de fechamento
      
      // Exibe os dados formatados no console
      console.log({ symbol, open, high, low, close });
      
      // Aqui você pode adicionar outras lógicas ou processamentos adicionais
    }
  };
  
  // Define o evento de erro do WebSocket para logar possíveis problemas
  ws.onerror = (err) => console.error(err);
}

// Inicia a função principal
start();
