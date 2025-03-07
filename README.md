# Binance Candles - Monitoramento de Velas em Tempo Real

![Binance](https://img.shields.io/badge/Binance-FFB702?style=for-the-badge&logo=binance&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-000?style=for-the-badge)

Este projeto utiliza a API da Binance para descobrir os pares de moedas em negociação e se conectar às streams de dados para monitorar as velas (candlesticks) em tempo real. O bot filtra os pares cujo quote asset é USDT e exibe as informações consolidadas de cada vela (open, high, low, close) sempre que a vela for fechada.

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18.x ou superior – necessário para o suporte nativo ao método `fetch` e funcionalidades modernas do JavaScript)
- [npm](https://www.npmjs.com/) (v9.x ou superior)

---

## 🚀 Começando

Para começar a usar este projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/katvta/binance-candles-usdt-pairs.git
   cd bbinance-candles-usdt-pairs
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure seu ambiente (veja [Configuração de Ambiente](#🔧-configuração-de-ambiente)).

4. Execute o bot:
   ```bash
   npm start
   ```

---

## 📂 Estrutura do Projeto

```
binance-candles/
├── node_modules/         # Pacotes instalados pelo NPM
├── .git/                 # Diretório do Git (caso esteja versionando o código)
├── package.json          # Configurações e scripts do projeto
├── package-lock.json     # Controle das versões exatas das dependências
└── index.js              # Código principal com a lógica para buscar e monitorar velas
```

---

## 🛠️ Como Funciona

1. **Descoberta dos Pares de Moedas:**

   O bot utiliza a API REST da Binance (Exchange Info) para obter todos os pares de moedas e filtra os que utilizam USDT como moeda de cotação. Essa informação é convertida para minúsculas, pois é um requisito para a conexão via stream.

2. **Conexão às Streams de Dados:**

   Com os pares filtrados, o bot monta uma URL para uma stream combinada no formato:
   ```
   symbol1@kline_1m/symbol2@kline_1m/.../symbolN@kline_1m
   ```
   Essa URL é utilizada para se conectar ao WebSocket da Binance, permitindo receber os dados de velas a cada 2 segundos.

3. **Processamento dos Dados:**

   Sempre que uma vela é fechada (identificada pela propriedade `x` da kline), o bot extrai os valores de abertura, máximo, mínimo e fechamento, e os exibe formatados no console.

---

## 🛠️ Como Usar

1. **Inicie o projeto:**

   No terminal, dentro da pasta do projeto, execute:
   ```bash
   npm start
   ```

2. **Monitoramento das Velas:**

   Após iniciar, o bot conectará à stream da Binance e, a cada 1 minuto (quando a vela se fecha), exibirá no console um objeto com os seguintes dados:
   - **symbol:** Par de moedas
   - **open:** Preço de abertura
   - **high:** Preço máximo
   - **low:** Preço mínimo
   - **close:** Preço de fechamento

   Você poderá expandir a lógica para realizar outros processamentos ou análises conforme sua necessidade.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

**Desenvolvido por Katriel Amorim**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/katriel-amorim-a330b4322/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/katvta)
