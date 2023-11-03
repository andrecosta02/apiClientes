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

            consoleResult(query)
        })
    },



    listOne: (clientId) => {
        return new Promise((aceito, rejeitado) => {
            query = `SELECT * FROM client WHERE client_id = ${clientId}`

            db.query(query, (error, results)=>{
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            })
            
            consoleResult(query)
        })
    },



    filter: (clientId, clientName) => {
        return new Promise((aceito, rejeitado) => {
            query = `SELECT * FROM client`
            if(clientId || clientName){query += ` WHERE`}
            if(clientId){query += ` client_id = "${clientId}"`}
            if(clientId && clientName){query += ` OR`}
            if(clientName){query += ` name LIKE "%${clientName}%"`}


            db.query(query, (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results)
            })
            
            consoleResult(query)
        })
    },
    


    register: (clientName, clientEmail, clientAddress, clientCpf, clientDate) => {
        return new Promise((aceito, rejeitado) => {
            query = `INSERT INTO client (name, email, address, cpf, creation_date) VALUES ("${clientName}", "${clientEmail}", "${clientAddress}", "${clientCpf}", "${clientDate}")`
            
            db.query(query,(error, results) => {
                if(error) { rejeitado(error); return; }
                aceito(results.insertCodigo)
            })

            consoleResult(query)
        })
    },



    update: (clientName, clientEmail, clientAddress) => {
        return new Promise((aceito, rejeitado) => {
            // query = `SELECT * FROM client`
            // if(clientId || clientName){query += ` WHERE`}
            // if(clientId){query += ` client_id = "${clientId}"`}
            // if(clientId && clientName){query += ` OR`}
            // if(clientName){query += ` name LIKE "%${clientName}%"`}
            

            //name, email, address
            query = `UPDATE client SET `
            if(clientId){query += `name="${clientId}" `}
            if(clientId){query += `name="${clientId}" `}
            if(clientId){query += `name="${clientId}" `}
            query += `WHERE client_id = "${clientId}"`

            db.query(query, (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results)
            })
            
            consoleResult(query)
        })
    },



    delete: (clientId) =>{
        return new Promise((aceito, rejeitado) => {
            query = `DELETE FROM client WHERE client_id = ${clientId}`

            db.query(query,(error, results) => {
                if(error) { rejeitado(error); return; }
                aceito(results)
            })

            consoleResult(query)
        })
    },
    

   
    
}


function consoleResult(query) {
    console.log(`Consulta Rest às ${hour} - ${fullDate} {`)
    console.log(query)

}