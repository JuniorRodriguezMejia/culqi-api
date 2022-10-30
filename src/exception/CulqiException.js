class CulqiException extends Error {
	constructor({ code = 500, message = ['Hubo un error interno'] }) {
		super();
		this.code = code;
		this.message = Array.isArray(message) ? message : [message];
	}
}

module.exports = CulqiException;
