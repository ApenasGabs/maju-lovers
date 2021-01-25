const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session')
const app = express();
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static('src/app/views'));
app.set('views', path.join(__dirname, '../app/views'));
app.set('view engine', 'ejs');




/* configuração da sessão com o banco de dados */

let MySQLStore = require('express-mysql-session')(session);
var options = {
    host: '',
    port: '', /* USAR O MESMO USUÁRIO DO BANCO DE DADOS PRINCIPAL */
    user: '',       /* A SESSÃO CRIARÁ UMA TABELA AUTOMATICAMENTE PARA OS IDS DA SESSÃO*/
    password: '',
    database: '',
    schema: {
        tableName: 'custom_session_table_name',
        columnNames: {
            session_id: 'custom_session_id',
            expires: 'custom_expires_column_name',
            data: 'custom_data_column_name'
        }
    }
}
let connection = mysql.createPool(options);
let sessionStore = new MySQLStore({}, connection);
app.use(session({
    key: 'sessão',
    secret: 'sessão_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    auth: false,
    email: '',
    nome: '',

    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

const routes = require('../app/routes/routes');
routes(app);

module.exports = app;