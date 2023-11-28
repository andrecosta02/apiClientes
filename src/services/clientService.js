const db = require("../db")
const clientController = require("../controllers/clientController")
let query = ""
let values = ""

const date = new Date()
const hour = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}h`
const fullDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`

module.exports = {

    listAll: () => {
        return new Promise((resolve, reject)=>{
            query = "SELECT * FROM client ORDER BY client_id"

            db.query(query, (error, results)=>{
                if(error) {reject(error); return}
                resolve(results)
            })

            consoleResult(query)
        })
    },



    listOne: (clientId) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM client WHERE client_id = ?`
            values = [clientId]

            db.query(query, values, (error, results)=>{
                if(error) { reject(error); return; }
                if(results.length > 0){
                    resolve(results[0]);
                }else {
                    resolve(false);
                }
            })
            
            consoleResult(query, values)
        })
    },



    filter: (clientId, clientName) => {
        return new Promise((resolve, reject) => {
            query = `SELECT * FROM client`
            if(clientId || clientName){query += ` WHERE`}
            if(clientId){query += ` client_id = "${clientId}"`}
            if(clientId && clientName){query += ` AND`}
            if(clientName){query += ` name LIKE "%${clientName}%"`}
            values

            db.query(query, (error, results)=>{
                if(error) {reject(error); return}
                resolve(results)
            })
            
            consoleResult(query)
        })
    },
    


    register: (clientName, clientEmail, clientAddress, clientCpf, clientDate) => {
        return new Promise((resolve, reject) => {
            // query = `INSERT INTO client (name, email, address, cpf, creation_date) VALUES ("${clientName}", "${clientEmail}", "${clientAddress}", "${clientCpf}", "${clientDate}")`
            query = `INSERT INTO client (name, email, address, cpf, creation_date) VALUES (?, ?, ?, ?, ?)`
            values = [clientName, clientEmail, clientAddress, clientCpf, clientDate]
            
            db.query(query, values,(error, results) => {
                if(error) { reject(error); return; }
                // console.log(results)
                resolve(results.insertCod)
            })

            consoleResult(query)

        })
    },



    update: (clientName, clientEmail, clientAddress) => {
        return new Promise((resolve, reject) => {

            query = `UPDATE client SET `

            if(clientName){query += `name="${clientName}" `}
            if(clientName && clientEmail){query += `, `}
            if(clientName && clientAddress){query += `, `}

            if(clientEmail){query += `email="${clientEmail}" `}
            if(clientEmail && clientAddress){query += `, `}

            if(clientAddress){query += `address="${clientAddress}" `}

            query += `WHERE client_id = "${clientId}"`

            db.query(query, (error, results)=>{
                if(error) {reject(error); return}
                resolve(results)
            })
            
            consoleResult(query)
        })
    },



    delete: (clientId) =>{
        return new Promise((resolve, reject) => {

            // let querySelect = `SELECT * FROM client WHERE client_id = ${clientId}`
            let querySelect = `SELECT * FROM client WHERE client_id = ?`
            let values = [clientId]
            db.query(querySelect, values ,(error, results) => {
                resolve(results)

                if(results != 0){
                    // query = `DELETE FROM client WHERE client_id = ${clientId}`
                    query = `DELETE FROM client WHERE client_id = ${clientId}`

                    db.query(query,(error, results) => {
                        if(error) { reject(error); return; }
                        resolve(results)
                    })

                    messageJson = `Deleted client with client_id = ${clientId}`
                    resolve(messageJson)
                    consoleResult(query)
                } else {
                    messageJson = `No client found with client_id = ${clientId}`
                    reject(messageJson)
                    consoleResult(messageJson)
                }
            })

        })
    },
    

   
    
}


function consoleResult(query) {
    console.log(`Consult {`)
    console.log(` - ${fullDate} - ${hour}`)
    console.log(query, values)
    
}