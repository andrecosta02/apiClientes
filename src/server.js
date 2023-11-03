require("dotenv").config({path:"../variable.env"})
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const request = require("request")
const http = require('http');

const routes = require("./routes")
const server = express()

server.use(bodyParser.json())
server.use(cors())
// server.use(bodyParser.urlencoded({extende: false}))
server.use("/clients", routes)


let publicIP
request('https://api64.ipify.org?format=json', (error, response, body) => {
  if (!error && response.statusCode === 200) {
    // Analisa a resposta JSON
    const data = JSON.parse(body);

    // Extrai o endereço IP público
    publicIP = data.ip;

    startServer()
  } else {
    console.error('Erro ao obter o endereço IP público:', error);
    publicIP = undefined
    startServer()
  }
});

function startServer(){
server.listen(process.env.PORT, () => {

    const date = new Date()
    const hour = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}h`
    const fullDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`


    console.log(`Serviço iniciado em http://${publicIP}:${process.env.PORT}/clients, as ${hour} - ${fullDate} \n`)
    
    
})
}
