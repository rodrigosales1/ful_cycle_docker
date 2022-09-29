const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

function conexao() {
    const mysql = require('mysql')
    return mysql.createConnection(config);
}
insertNome();
function insertNome() {
    const sql = `INSERT INTO people(name) values('Rodrigo sales')`;
    const connection = conexao();
    connection.query(sql);
    connection.end();
}


app.get('/', async (req, res) => {
    const connection = conexao();
    connection.query(`select * from people`, (err, rows) => {
        if (err) throw err

        var retorno = "<h1>Full Cycle Rocks!</h1>";
        retorno += "<p> - Lista de nomes cadastrada no banco de dados.</p>";
        rows.forEach(element => {
            retorno += `<li>` + element.name + `</li>`;
        });

        res.send(retorno);
    });

})


app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})