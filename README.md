# PEY.GG

### Projeto final da disciplina IMD1130 - Bancos de dados NOSQL
Um site de estatísticas referentes a partidas competitivas de <a href="https://na.leagueoflegends.com/en-us/">League of Legends</a>, feito com MongoDB, Node.js, Express.js e React.

## Versão Online
<a href="https://pey.vercel.app">pey.vercel.app</a>

## Variaveis de Ambiente
### Backend

- ``DB_URL: URL de conexão com o mongo``

  - Cluster Atlas com todos os dados, para testes: ``mongodb+srv://fPJX61bU7Hlr9KXm:dRrYR1jtZbEQtNiT@cluster1.9prkb.mongodb.net/test_stats?retryWrites=true&w=majority``

- ``PORT: Porta utlizada pelo Express``
  - ao contrario sera ulilizado a porta: `3333`

### Frontend

- ``API_URL: URL de conexão com a API``
  - se a `PORT` não for alterada sera: `http://localhost:3333`

## Como configurar
### Backend

```bash
cd .\backend\
npm i
nodemon .\src\index.js
```
### Frontend

```bash
cd .\frontend\
npm i
npm run start
```
## Telas
### Pagina Inicial 

![image](https://user-images.githubusercontent.com/31046437/115972531-51d1a980-a525-11eb-86df-5036b2f1dc8e.png)
### Pagina de Times
![image](https://user-images.githubusercontent.com/31046437/115972561-83e30b80-a525-11eb-8a10-9984e9bd52e2.png)
