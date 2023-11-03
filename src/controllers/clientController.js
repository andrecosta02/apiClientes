const clientService = require("../services/clientService")

const date = new Date()
const fullDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}`

module.exports = {



    listAll: async (req, res) => {
        let amount = 0
        let json = {statusCode:"", message:"", amount:"", result:[]}
        let client = await clientService.listAll()
        
        for(let i in client) {
            res.statusCode = 200

            json.result.push({
                clientId: client[i].client_id,
                clientName: client[i].name,
                clientEmail: client[i].email,
                clientAddress: client[i].address,
                clientCpf: client[i].cpf,
                clientDate: client[i].creation_date
            })
            amount++
        }
        json.amount = amount
        res.json(json)
        console.log(req.connection.remoteAddress + "} \n")

    },



    listOne: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.params.clientId
        let client = await clientService.listOne(clientId)

        if(client) { 
            json.result.push({
                clientId: client.client_id,
                clientName: client.name,
                clientEmail: client.email,
                clientAddress: client.address,
                clientCpf: client.cpf,
                clientDate: client.creation_date
            })
         }

        res.json(json)
    },



    filter: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.query.clientId
        let clientName = req.query.clientName
        let client = await clientService.filter(clientId, clientName)


        if(client) {

            json.result = client
        } else {
            json.message = "Não foram encontrados clientes com esse ID"
        }

        res.json(json)
        console.log(req.connection.remoteAddress + "} \n")

    },



    register: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let name = req.body.clientName
        let email = req.body.clientEmail
        let address = req.body.clientAddress
        let cpf = req.body.clientCpf
        let creationDate = fullDate

        if(name && email && address && cpf) {
            res.statusCode = 201

            let clientId = await clientService.register(name, email, address, cpf, creationDate)
            json.result = {
                clientId: clientId,
                clientName: name,
                clientEmail: email,
                clientAddress: address,
                clientCpf: address,
                clientDate: creationDate
            }

        } else {
            json.message = "Campos não enviados"
        }

        res.json(json)
        console.log(req.connection.remoteAddress + "} \n")
    },



    update: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.params.clientId
        let name = req.body.clientName
        let email = req.body.clientEmail
        let address = req.body.clientAddress

        if(clientId && name || email || address){
            await clientService.update(clientId, name, email, address);
            json.result = {
                clientId: clientId,
                clientName: name,
                clientEmail: email,
                clientAddress: address,
                clientCpf: address,
                clientDate: creationDate
            }
        } else {
            json.message = "Campos não enviados"
        }

        res.json(json);
    },



    delete: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.params.clientId;

        await clientService.delete(clientId);
        // json.result = {
        //     clientId
        // }

        res.json(json);
    },

}

// {
//     "clientName": "Andre teste",
//     "clientEmail": "fhruhr@vih.com",
//     "clientAddress": "Rua tralalala",
//     "clientCpf": "18949"  
// }