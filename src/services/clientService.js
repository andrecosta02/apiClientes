const db = require("../db")
let query = ""

const date = new Date()
const hour = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}h`
const fullDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`

module.exports = {

    listAll: () => {
        return new Promise((aceito, rejeitado)=>{
            query = "SELECT * FROM client ORDER BY client_id"

            db.query(query, (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results)
            })
            console.log(`Consulta Rest às ${hour} - ${fullDate} {`)
            console.log(query)
    
        })
    },

    listOne: (idClient, clientName) => {
        return new Promise((aceito, rejeitado) => {
            query = `SELECT * FROM client WHERE`
            if(idClient){query += ` client_id = "${idClient}"`}
            if(clientName){query += ` or name = "${clientName}"`}

            // db.query(query, (error, results) => {
            //     if(error){ rejeitado(error); return}
            //     if(results.length > 0) {
            //         aceito(results[0])
            //     } else {
            //         aceito(false)
            //     }
            // })

            db.query(query, (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results)
            })
            
            console.log(`Consulta Rest às ${hour} - ${fullDate} {`)
            console.log(query)

        })
    },
    
    register: (clientName, clientEmail, clientAddress, clientCpf, clientDate) => {
        return new Promise((aceito, rejeitado) => {
            query = `INSERT INTO client (name, email, address, cpf, creation_date) VALUES ("${clientName}", "${clientEmail}", "${clientAddress}", "${clientCpf}", "${clientDate}")`
            
            db.query(query,(error, results) => {
                if(error) { rejeitado(error); return; }
                aceito(results.insertCodigo)
            })
            console.log(`Consulta Rest às ${hour} - ${fullDate} {`)
            console.log(query)
        })
    }
    
        // clientId: client[i].client_id,
        // clientName: client[i].name,
        // clientEmail: client[i].email,
        // clientAddress: client[i].address,
        // clientCpf: client[i].cpf,
        // clientDate: client[i].creation_date
    
    
    
}