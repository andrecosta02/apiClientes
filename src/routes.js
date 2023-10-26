const express = require("express")
const router = express.Router()
const showdown = require('showdown');
const converter = new showdown.Converter();

const clientController = require("./controllers/clientController")

router.get("/list", clientController.listAll)
router.get("/list/:idClient", clientController.listOne)
// router.post("/register", clientController.register)
// router.put("/update:idClient", clientController.update)
// router.delete("delete/:idClient", clientController.delete)

// router.get('/', (req, res) => {
//     // Envie o arquivo HTML quando alguém acessar a rota /clients.
//     res.sendFile(__dirname + '/index.html');
//   })

router.get('/', (req, res) => {
  // Leia o arquivo Markdown (readme.md) e o converta em HTML.
  const fs = require('fs');
  const file = "/../README.md"
  fs.readFile(__dirname + file, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Erro ao ler o arquivo Markdown.');
      return;
    }


    // Converta o Markdown em HTML usando o showdown.
    const html = converter.makeHtml(data);

    // Envie o HTML resultante como resposta.
    res.send(html);
  });
});



/*
get:        /client/list
get one:    /client/list/:idClient
post:       /client/register
put:        /client/update:idClient
delete:     /client/delete:idClient
*/

module.exports = router