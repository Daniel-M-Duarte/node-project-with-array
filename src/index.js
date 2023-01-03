const app = require('express')();
const bodyParser = require('body-parser');
const { response, request } = require('express');

app.use(bodyParser.json());

let clients = [
    {id: 3, nome: 'Daniel Duarte', telefone: '5199323691'},
    {id: 1, nome: 'Karim da Silva', telefone: '51997659868'},
    {id: 2, nome: 'Leo Quevedo', telefone: '5199323656'},
    {id: 4, nome: 'Someoneelse', telefone: '5199327491'},
    {id: 0, nome: 'Romario', telefone: '51993790001'}
];

function log (request, response, next){
    const {url, method} = request;
    console.log(`${method} - ${url} at ${new Date()}`);
    return next();
}

app.use(log);

app.get('/clients', (request, response)=>{
    response.status(200).json(clients);
})

app.get('/clients/:id', (request, response)=>{
    const {id} = request.params;
    const client = clients.find(value=> value.id == id);
    if (client === undefined){
        response.status(400).json({error: "Bad request"});
    }else{
        response.status(200).json(client);
    }
})

app.post('/clients', (request, response)=>{
    const client = request.body;
    clients.push(client);
    response.status(201).json(clients);
})

app.put('/clients/:id', (request, response) =>{
    const id = request.params.id;
    const nome = request.body.nome;
    const client = clients.find(value => value.id == id);
    if (client === undefined){
        response.status(400).send();
    }else{
        client.nome = nome;
        response.status(201).json(client);
    }
})

app.delete('/clients/:id', (request, response)=>{
    const {id} = request.params;
    const index = clients.findIndex(value => value.id == id);
    if (index === -1){
        response.status(400).send();
    }else{
        clients.splice(index, 1);
        response.status(204).send();
    }
})

app.listen(3000);