const { v4: uuidv4 } = require('uuid');
const randomstring = require('randomstring');
const CulqiDao = require('../dao/CulqiDao');
const CulqiException = require('../exception/CulqiException');

module.exports = {
	async generateToken(request) {
		const reqCard = {
			email: request.email,
			card_number: request.card_number,
			cvv: request.cvv,
			expiration_year: request.expiration_year,
			expiration_month: request.expiration_month
		};
		let card = await CulqiDao.getCard(reqCard);
		if (!card) {
			reqCard.card_id = uuidv4();
			reqCard.token = randomstring.generate(16);
			reqCard.ttl = Math.floor(Date.now() / 1000) + 900;
			card = await CulqiDao.saveCard(reqCard);
		}
		const response = { token: card.token };
		return response;
	},

	async getCard(request) {
		const card = await CulqiDao.getCardByToken(request);
		if (!card) {
			throw new CulqiException({ code: 404, message: 'Tarjeta no encontrada' });
		}
		delete card.cvv;
		return card;
	}
};
