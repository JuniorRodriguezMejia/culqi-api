'use strict';

const { getCard } = require('./../src/functions/handler');
const CulqiDao = require('./../src/dao/CulqiDao');

let request;
let response;
let resGenerateToken;
let body;



beforeEach(() => {
    request;
    response;
    resGenerateToken;
    body;
})

afterEach(() => {
})

test('05 - Token es inválido', async () => {
    request = require('./input/05Request.json');
    response = require('./output/05Response.json');
    resGenerateToken = await getCard(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})

test('06 - Datos Tarjeta no encontrado', async () => {
    request = require('./input/06Request.json');
    response = require('./output/06Response.json');
    jest.spyOn(CulqiDao, 'getCardByToken').mockImplementation(() => {});
    resGenerateToken = await getCard(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})

test('07 - Datos Tarjeta obtenido correctamente', async () => {
    request = require('./input/07Request.json');
    response = require('./output/07Response.json');
    jest.spyOn(CulqiDao, 'getCardByToken').mockImplementation(() => { return { cvv: '123', ...response } });
    resGenerateToken = await getCard(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})
