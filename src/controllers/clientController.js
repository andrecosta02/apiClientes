const clientService = require("../services/clientService")

module.exports = {

    listAll: async (req, res) => {
        let qtdClients = 0
        let json = {statusCode:"", error:"", qtdTotal:"", client:[]}
        let client = await clientService.listAll()
        
        for(let i in client) {
            res.statusCode = 200
            json.client.push({
                clientId: client[i].client_id,
                clientName: client[i].name,
                clientEmail: client[i].email,
                clientaddress: client[i].address,
                clientCpf: client[i].cpf,
                clientDate: client[i].creation_date
            })
            qtdClients++
        }
        json.qtdTotal = qtdClients
        res.json(json)
        console.log(req.connection.remoteAddress)
        console.log("}  \n")
        // console.log("")


    },

    listOne: async (req, res) => {
        let json = {error:"", result:[]}

        let idClient = req.params.idClient
        let client = await clientService.listOne(idClient)


        if(client) {
            json.result = client
        }

        res.json(json)
    },


    register: async (req, res) => {
        
    }

}