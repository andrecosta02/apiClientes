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
            console.log(db.query(query).sql)
    
        })
    },

    listOne: (idClient) => {
        return new Promise((aceito, rejeitado) => {
            query = `SELECT * FROM client WHERE client_id = ${idClient}`

            db.query(query, (error, results) => {
                if(error){ rejeitado(error); return}
                if(results.length > 0) {
                    aceito(results[0])
                } else {
                    aceito(false)
                }
            })
            console.log(db.query(query).sql)
        })
    }



}