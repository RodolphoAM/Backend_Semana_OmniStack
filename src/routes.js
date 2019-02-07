const express = require('express');

const routes = express.Router();

//essa linha importa o arquivo TweetController para importar as funções nele
const TweetController = require('./controllers/TweetController.js');

const LikeController = require('./controllers/LikeController.js');

//essa função retorna as requisições da página inicial
/*
routes.get('/', (req,res) => {
	return res.send('Hello World! Again!');
})
*/

routes.get('/tweets', TweetController.index);
routes.post('/tweets', TweetController.store);

routes.post('/likes/:id',LikeController.store)

module.exports = routes;