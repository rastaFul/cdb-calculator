# Calculadora de investimentos CDB

Projeto desenvolvido para realizar o cálculo de rentabilidade de uma aplicação CDB, com base na taxa e o intervalo entre a aplicação e retirada do investimento.

Este projeto já possui toda a stack necessária para a sua execução, baseada em containers docker e gestão dos container pelo docker-compose.

<b>Referências: </b>
- [Docker](https://docs.docker.com/engine/)
- [Docker Compose](https://docs.docker.com/compose/)

### Stack

- NodeJs (Api)
- Next (Frontend)
- Mongo (Banco de dados)


## Configurações

As configurações necessárias para o projeto dependem apenas dos seguintes passos: 

- Para realizar o cálculo de rentabilidade, é necessário primeiro importar as taxas CDI's diárias.
Para isto, basta inserir um arquivo csv com duas colunas(dtDate, dLastTradePrice) na pasta /files do projeto.

    `Observação: O repositório já possui um arquivo modelo com as taxas de CDI's com o período de 2010 à 2019, conforme recebido como modelo, não necessitando de alterações caso não queira importar um arquivo diferente`.
    `O arquivo será lido na primeira inicialização da API, e será ignorado nas demais inicialização. Para realizar a re-importação do arquivo, verifique a documentação com os endpoints da API`.

- Após a inclusão do arquivo, deverá salvar o arquivo de variáveis de ambiente que será utilizado pela API e docker-compose, salvando o arquivo `.env.sample` como `.env` (Poderá renomear as variáveis conforme a necessidade, apesar do arquivo de exemplo já possuir as variáveis preenchidas corretamente para o seu funcionamento).

## Execução

Para construir e executar o projeto, foi desenvolvimento um script shell que facilitará na execução dos comandos necessários, com isto, após realizar as [configurações necessárias](#Configurações), basta iniciar o projeto com o seguinte comando:
```bash
    sh deploy.sh
```

`Observação: Caso deseje realizar a atualização de apenas um dos serviços da stack, basta informar o nome do serviço como parâmetro do script bash`

## Utilização da API

Acessar a documentação com interface gráfica com todas as informações das rotas implementadas e seus respectivos usos através do endpoint:

> /api/v1/docs

### Mais informações

Dentro de cada serviço, há a documentação para tarefas/recursos especificos, caso necessário.

- [API](./api/README.md) 

`Contém informações dos testes unitários`