const Joi = require('joi');
const messagesValidation = require('./MessagesValidation');
const CulqiException = require('../exception/CulqiException');

const validNumberCard = (value, helper) => {
	let sum = 0;
	let alt = false;
	let i = value.length - 1;
	let num;
	while (i >= 0) {
		num = parseInt(value.charAt(i), 10);
		if (alt) {
			num *= 2;
			if (num > 9) {
				num = (num % 10) + 1;
			}
		}
		alt = !alt;
		sum += num;
		i--;
	}
	if (sum % 10 === 0 && sum !== 0) {
		return true;
	}
	return helper.message('{{#label}} es una tarjeta inválida');
};

const validYearCard = (value, helper) => {
	const yearCard = parseInt(value, 10);
	const year = new Date().getFullYear();
	if (yearCard >= year && yearCard <= year + 5) {
		return true;
	}
	return helper.message(`{{#label}} es una año de tarjeta inválido. Debe ser mayor o igual que ${year} y menor o igual que ${year + 5}`);
};

// const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// const validMonthCard = (value, helper) => {
// 	const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// 	const yearCard = parseInt(value, 10);
// 	const year = new Date().getFullYear();
// 	if (yearCard >= year && yearCard <= year + 5) {
// 		return true;
// 	}
// 	return helper.message(`{{#label}} es una año de tarjeta inválido. Debe ser mayor o igual que ${year} y menor o igual que ${year + 5}`);
// }

const validate = (schema, payload, code = 400) => {
	const validation = schema.validate(payload,
		{
			allowUnknown: true,
			abortEarly: false,
			convert: false,
			errors: { language: 'spanish' },
			messages: messagesValidation
		});
	if (validation.error) {
		const messages = validation.error.details.map(({ message }) => message);
		throw new CulqiException({ code, message: messages });
	}
};

module.exports = {
	async validateAuthorizationToken(payload) {
		const schema = Joi.object({
			authorizationToken: Joi.string().pattern(new RegExp(/^Bearer\spk_test_[A-Za-z]{16}$/)).required()
		});
		validate(schema, payload, 401);
	},

	async generateToken(payload) {
		const schema = Joi.object({
			email: Joi.string().min(5).max(100).email({ minDomainSegments: 2 })
				.pattern(new RegExp(/\w+([-+.]\w+)*@(gmail\.com|hotmail\.com|yahoo\.es)$/))
				.required(),
			card_number: Joi.string().min(13).max(16).pattern(new RegExp(/^[0-9]*$/))
				.custom(validNumberCard)
				.required(),
			cvv: Joi.string().min(3).max(4).pattern(new RegExp(/^[0-9]*$/))
				.required(),
			expiration_year: Joi.string().length(4).pattern(new RegExp(/^[0-9]*$/)).custom(validYearCard)
				.required(),
			expiration_month: Joi.string().length(2).valid('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12').required()
		});
		validate(schema, payload);
	},

	async getCard(payload) {
		const schema = Joi.object({
			token: Joi.string().length(16).pattern(new RegExp(/^[0-9a-zA-Z]*$/)).required()
		});
		validate(schema, payload);
	}
};
