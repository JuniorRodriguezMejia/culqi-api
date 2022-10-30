'use strict';

const { generateToken } = require('./../src/functions/handler');
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

test('01 - Authorization Token es requerido', async () => {
    request = require('./input/01Request.json');
    response = require('./output/01Response.json');
    resGenerateToken = await generateToken(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})

test('02 - Datos Tarjeta son requeridos', async () => {
    request = require('./input/02Request.json');
    response = require('./output/02Response.json');
    resGenerateToken = await generateToken(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})

test('03 - Número Tarjeta y año son inválidos', async () => {
    request = require('./input/03Request.json');
    response = require('./output/03Response.json');
    resGenerateToken = await generateToken(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})

test('04 - Datos Tarjeta registrada correctamente', async () => {
    request = require('./input/04Request.json');
    response = require('./output/04Response.json');
    jest.spyOn(CulqiDao, 'getCard').mockImplementation(() => {});
    jest.spyOn(CulqiDao, 'saveCard').mockImplementation(() => { return { token: 'HWYiT5tnr2Auklef' } });
    resGenerateToken = await generateToken(request);
    body = JSON.parse(resGenerateToken.body);
    expect(body).toEqual(response);
})
