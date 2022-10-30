const { DynamoDB } = require('aws-sdk');

const documentClient = new DynamoDB.DocumentClient({ region: process.env.REGION });

module.exports = {
	async saveCard(reqCard) {
		await documentClient.put({ TableName: process.env.DYNAMODB_TABLE_CARD, Item: reqCard }).promise();
		return reqCard;
	},

	async getCard(reqCard) {
		const filterExp = `email = :email and card_number = :card_number and cvv = :cvv and 
                           expiration_year = :expiration_year and expiration_month = :expiration_month`;
		const expAtrVal = {
		    ':email': reqCard.email,
		    ':card_number': reqCard.card_number,
		    ':cvv': reqCard.cvv,
		    ':expiration_year': reqCard.expiration_year,
		    ':expiration_month': reqCard.expiration_month
		};
		const cards = await documentClient.scan({
		    TableName: process.env.DYNAMODB_TABLE_CARD,
		    FilterExpression: filterExp,
		    ExpressionAttributeValues: expAtrVal
		}).promise();
		const card = cards.Items.length > 0 ? cards.Items[0] : null;
		return card;
	},

	async getCardByToken(reqCard) {
		const filterExp = '#token_id = :token';
		const expAtrVal = { ':token': reqCard.token };
		const expAtrNam = { '#token_id': 'token' };
		const cards = await documentClient.scan({
		    TableName: process.env.DYNAMODB_TABLE_CARD,
		    FilterExpression: filterExp,
		    ExpressionAttributeValues: expAtrVal,
		    ExpressionAttributeNames: expAtrNam
		}).promise();
		const card = cards.Items.length > 0 ? cards.Items[0] : null;
		return card;
	}
};
