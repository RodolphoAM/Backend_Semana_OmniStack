const Tweet = require('../models/Tweet.js');

//essa função está exportando um objeto com as funções abaixo
module.exports = {
	async index(req,res) {
		//essa constante armazena objetos da classe tweet ordenados pela data de criação em ordem descendente
		const tweets = await Tweet.find({}).sort('-createdAt');
	
		//essa função retorna os tweets como objetos json(Javascript Object Notation)
		return res.json(tweets);
	},
	async store(req,res) {
		//essa função pega o "corpo" da requisição, no caso o tweet com os devidos dados
		const tweet = await Tweet.create(req.body);
	
		//esse comando cria um evento para cada atualização do servidor
		//assim quem estiver conectado à aplicação receberá um objeto chamado tweet
		//com os dados do novo tuíte na base de dados
		req.io.emit('Tweet', tweet)

		return res.json(tweet);
	}
};