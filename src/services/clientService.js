const db = require("../db")
const clientController = require("../controllers/clientController")
let query = ""
let values = ""

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
            

            db.query(query, (error, results)=>{
                if(error) {reject(error); return}
                resolve(results)
            })
            
            consoleResult(query)
        })
    },
    


    register: (clientName, clientEmail, clientAddress, clientCpf, clientDate) => {
        return new Promise((resolve, reject) => {
            let querySelect = `SELECT * FROM client WHERE cpf = ?`
            let valueSelect = [clientCpf]
            // let messageJson = false

            db.query(querySelect, valueSelect ,(error, results) => {
               
                if(results.length == 0){
                    query = `INSERT INTO client (name, email, address, cpf, creation_date) VALUES (?, ?, ?, ?, ?)`
                    values = [clientName, clientEmail, clientAddress, clientCpf, clientDate]
                    
                    db.query(query, values,(error, results) => {
                        if(error) { reject(error); return; }
                        resolve(results.insertId)
                    })

                    // resolve(messageJson)
                    consoleResult(query, values)
                } else {
                    teste = `There is already a client with a CPF = ${clientCpf}`
                    resolve(teste)
                    consoleResult(teste)
                }
            
            })
        })
    },



    update: (clientId, clientName, clientEmail, clientAddress) => {
        return new Promise((resolve, reject) => {
            let query = 'UPDATE client SET ';
    
            const updateFields = [];
    
            if (clientName) { updateFields.push(`name="${clientName}"`) }
    
            if (clientEmail) { updateFields.push(`email="${clientEmail}"`) }
    
            if (clientAddress) { updateFields.push(`address="${clientAddress}"`) }
    
            if (updateFields.length === 0) {
                reject(new Error('Nenhum campo válido para atualização fornecido.'));
                return;
            }
    
            query += updateFields.join(', ');
            query += ` WHERE client_id = "${clientId}"`;
    
            db.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
    
                resolve(results);
            });
            consoleResult(query)
        });


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

                    // messageJson = `Deleted client with client_id = ${clientId}`
                    // resolve(messageJson)
                    resolve(query)
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
    let date = new Date()
    let hour = `${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}h`
    const fullDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2,'0')}/${date.getDate().toString().padStart(2,'0')}`

    console.log(`Consult {`)
    console.log(` - ${fullDate} - ${hour}`)
    console.log(" - " + query, values)
    
}