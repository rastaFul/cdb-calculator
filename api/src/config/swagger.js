module.exports.swaggerDocument = {
    swagger: '2.0',
    info: {
        description: 'Seja bem vindo a API de cálculo de investimento CDB.'
            + 'Com essa API é possível realizar a importação das taxas CDI diárias '
            + 'e o cálculo de rendimento de investimentos CDB pós fixado atrelados a CDI',
        version: '0.1.0',
        title: 'Calculadora de investimentos - CDB',
    },
    basePath: '/api/v1',
    schemes: ['http'],
    paths: {
        '/cdb/calculate': {
            get: {
                tags: [
                    'CDB',
                ],
                description: 'Buscar o rendimento de uma aplicação CDB',
                produces: [
                    'application/json',
                ],
                parameters: [
                    {
                        in: 'query',
                        name: 'investmentDate',
                        description: 'Data inicial da aplicação. A data deve ser informado no formato: "yyyy-mm-dd"',
                        required: true,
                        schema: {
                            type: 'string',
                            format: 'date'
                        },
                    },
                    {
                        in: 'query',
                        name: 'cdbRate',
                        description: 'Taxa do CDB',
                        required: true,
                        schema: {
                            type: 'number',
                        },
                    },
                    {
                        in: 'query',
                        name: 'currentDate',
                        description: 'Data final da aplicação. A data deve ser informado no formato: "yyyy-mm-dd"',
                        required: true,
                        schema: {
                            type: 'string',
                            format: 'date'
                        },
                    },
                ],
                responses: {
                    200: {
                        description: 'Lista de preços unitário do CDB entre a data inicial do investimento e a data atual',
                        schema: {
                            type: 'array',
                            items: {
                                allOf: [
                                    {
                                        type: 'object',
                                        properties: {
                                            date: {
                                                type: 'string',
                                            },
                                            unitPrice: {
                                                type: 'number',
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
        '/cdi/load/tax': {
            put: {
                tags: [
                    'CDI',
                ],
                description: 'Ler arquivo .CSV com os dados da taxa diária de CDI',
                responses: {
                    200: {
                        description: '',
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    },
};