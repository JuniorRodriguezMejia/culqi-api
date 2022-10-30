const CulqiService = require('../service/CulqiService');
const Helper = require('../util/Helper');
const RequestValidation = require('../validation/RequestValidation');

// module.exports.authorizer = async (event) => {
//     if (event.authorizationToken) {
//         const regex = /^Bearer\spk_test_[A-Za-z]{16}$/;
// 		if (regex.test(event.authorizationToken)) {
//             return {
//                 principalId: 'anonymous',
//                 policyDocument: {
//                     Version: '2012-10-17',
//                     Statement: [{ Action: 'execute-api:Invoke', Effect: 'Allow', Resource: event.methodArn }],
//                 },
//             };
//         }
//         throw new Error(`No Autorizado - Token Inválido, no coincide para el patrón ${regex}`);
//     }
//     throw new Error('No Autorizado - Token Requerido');
// };

module.exports.generateToken = async (event) => {
	try {
		const authorizationToken = Helper.getAuthorization(event);
		const payload = Helper.getPayload(event);
		await RequestValidation.validateAuthorizationToken({ authorizationToken });
		await RequestValidation.generateToken(payload);
		const token = await CulqiService.generateToken(payload);
		return Helper.buildSuccessResponse(token);
	} catch (error) {
		return Helper.buildErrorResponse(error);
	}
};

module.exports.getCard = async (event) => {
	try {
		const payload = Helper.getPayload(event);
		const authorizationToken = Helper.getAuthorization(event);
		await RequestValidation.validateAuthorizationToken({ authorizationToken });
		await RequestValidation.getCard(payload);
		const card = await CulqiService.getCard(payload);
		return Helper.buildSuccessResponse(card);
	} catch (error) {
		return Helper.buildErrorResponse(error);
	}
};
