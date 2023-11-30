const clientService = require("../services/clientService")
const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');

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
        IpPublicQuery(req)
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
        IpPublicQuery(req)
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
        IpPublicQuery(req)
    },


    register: async (req, res) => {
        let teste
        let messageJson
        const json = { statusCode: "", message: "", result: [] }
    
        const name = req.body.clientName;
        const email = req.body.clientEmail;
        const address = req.body.clientAddress;
        const cpf = req.body.clientCpf;
        const creationDate = fullDate;
    
        const registerValidation = [
            body('clientName').notEmpty().withMessage('clientName cannot be empty').isString().withMessage('clientName must be a string').isLength({ min: 3, max: 60 }).withMessage('clientName must be between 3 and 60 characters'),
            body('clientEmail').notEmpty().withMessage('clientEmail cannot be empty').isEmail().withMessage('clientEmail must be a valid email address').isLength({ min: 3, max: 60 }).withMessage('clientEmail must be between 3 and 60 characters'),
            body('clientAddress').notEmpty().withMessage('clientAddress cannot be empty').isString().withMessage('clientAddress must be a string').isLength({ min: 3, max: 60 }).withMessage('clientAddress must be between 3 and 60 characters'),
            body('clientCpf').notEmpty().withMessage('clientCpf cannot be empty').isString().withMessage('clientCpf must be a string').isLength({ min: 11, max: 11 }).withMessage('clientCpf must be 11 characters'),
        ];
    
        await Promise.all(registerValidation.map(validation => validation.run(req)))
    
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res.status(422).json({ statusCode: 400, message: 'Erro de validação', errors: errors.array() })
        }
    
        const result = await clientService.register(name, email, address, cpf, creationDate)
        messageJson = messageJson
        if (typeof(result) === 'string') {
            res.status(422)
            json.statusCode = 422
            json.message = result
            json.result = ""

        } else {
            json.result = {
                clientId: result,
                clientName: name,
                clientEmail: email,
                clientAddress: address,
                clientCpf: cpf,
                clientDate: creationDate
            }
        }
        
        res.json(json);
        IpPublicQuery(req);
    },



    update: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}

        let clientId = req.params.clientId
        const name = req.body.clientName;
        const email = req.body.clientEmail;
        const address = req.body.clientAddress;

        const registerValidation = [
            body('clientName').isString().optional().withMessage('clientName cannot be empty').isLength({ min: 3, max: 60 }).withMessage('clientName must be between 3 and 60 characters'),
            body('clientEmail').isEmail().optional().withMessage('clientEmail must be a valid email address').isLength({ min: 3, max: 60 }).withMessage('clientEmail must be between 3 and 60 characters'),
            body('clientAddress').isString().optional().withMessage('clientAddress must be a string').isLength({ min: 3, max: 60 }).withMessage('clientAddress must be between 3 and 60 characters'),
        ];
    
        await Promise.all(registerValidation.map(validation => validation.run(req)))
    
        const errors = validationResult(req)
    
        if (!errors.isEmpty()) {
            return res.status(422).json({ statusCode: 400, message: 'Erro de validação', errors: errors.array() })
        }

    
        if(clientId && name || email || address){
            await clientService.update(clientId, name, email, address);
            json.result = {
                clientId: clientId,
                clientName: name,
                clientEmail: email,
                clientAddress: address,
            }
        } else {
            json.message = "Campos não enviados"
        }

    
        res.json(json)
        IpPublicQuery(req)
    },



    delete: async (req, res) => {
        let json = {statusCode:"", message:"", result:[]}
        let clientId = req.params.clientId;
        await clientService.delete(clientId);
        messageJson = messageJson

        
        json.message = messageJson
        
        res.json(json)
        IpPublicQuery(req)
    },


}

function IpPublicQuery(req) { 
    console.log(` - ${req.method}`)
    console.log(` - ${req.connection.remoteAddress} } \n`) 
}

