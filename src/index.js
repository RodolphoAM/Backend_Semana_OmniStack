const express = require('express'); //estou criando uma variável com as funções do pacote express
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); //estou criando uma instanciação da classe express

//esses dois comandos servem para iniciar uma comunicação em tempo real com o servidor
//assim há atualização da página em tempo real
const server = require('http').Server(app);
const io = require('socket.io')(server);

//esse código conecta a aplicação à base de dados
mongoose.connect('mongodb://Rodolpho:R0d0lph097@ds121455.mlab.com:21455/semana_omnistack', {
	useNewUrlParser: true
});

//esse comando inicia a atualização em tempo real
app.use((req,res, next) => {
	req.io = io;

	return next();
});

//essa função é invocada quando a aplicação é acessada na página inicial,
//por isso o a barra sozinha
//a variável req representa a requisição feita ao servidor e os dados na requisição
//a variável res terá os dados da resposta do servidor

app.get('/', (req,res) => {
	return res.send("Bem-vindo à página inicial!");
});

app.use(cors());

//essa função substitui a de cima; ele importa o arquivo de rotas
//onde são processadas as requisições
app.use(require('./routes'));
app.use(express.json());

//essa função faz com que o app responda a uma requisição feita na porta 3000
//se eu acessar o endereço 127.0.0.1:3000, o Hello World aparecerá ali
//enquanto a mensagem na função aparecerá no prompt de comando
server.listen(3000, () => {
	console.log('Server started on port 3000');
});