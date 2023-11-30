const express = require("express")
const router = express.Router()
const showdown = require("showdown");

const converter = new showdown.Converter();

const clientController = require("./controllers/clientController")


router.get("/list", clientController.listAll)
router.get("/list/:clientId", clientController.listOne)
router.get("/filter/", clientController.filter)
router.post("/register", clientController.register)
router.put("/update/:clientId", clientController.update)
router.delete("/delete/:clientId", clientController.delete)


// router.get("/", (req, res) => {
//     // Envie o arquivo HTML quando alguém acessar a rota /clients.
//     res.sendFile(__dirname + "/index.html");
//   })

router.get("/", (req, res) => {
  const fs = require("fs");
  const file = "/../README.md"
  fs.readFile(__dirname + file, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Erro ao ler o arquivo Markdown.");
      return;
    }


    const html = converter.makeHtml(data);
    res.send(html);
  });
});

module.exports = router