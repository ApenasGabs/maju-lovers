const usersController = require('../controllers/users_controller.js');
const userCont = new usersController();
const allMessagesController = require('../controllers/allMessages_controller.js');
const amCont = new allMessagesController();
const approvedMessagesController = require('../controllers/approvedMessages_controller.js');
const apmCont = new approvedMessagesController();
const twitter = require('../../config/twitter')
const twitter2 = require('../../config/twitter2')

const md5 = require('md5');
const redirectLogin = require('./middlewares/redirectLogin')
const redirectHome = require('./middlewares/redirectHome')

module.exports = (app) => {


    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', "http://localhost");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        if ((req.headers["x-forwarded-proto"] || "").endsWith("http")){
            res.redirect(`https://${req.headers.host}${req.url}`); 
            next(); 
        }

        if(res.statusCode == 404){
            res.redirect('/')
            next();
        }
       
        next();
    });

    app.get('/', (req, res) => {

        apmCont.selectAllApprovedMessages().then((resolved) => {
            res.render('index', {
                messages: resolved,
                auth: req.session.auth
            })

        }, (rejected) => {
            res.render('index', {
                messages: null,
                auth: req.session.auth
            })
        }).catch(((err) => res.send(err)));
    })

    app.get('/login', redirectHome, (req, res) => {
        res.render('login', {
            callback: null,
            auth: req.session.auth
        });
    })

    app.post('/login', redirectHome, (req, res) => {
        let md5pass = md5(req.body.password);
        userCont.authenticate(req.body.email, md5pass).then((resolved) => {
            req.session.auth = true;
            req.session.email = req.body.email;
        
            res.redirect('/pendentes');
        }, (rejected) => {
            res.render('login', {
                callback: rejected,
                auth: req.session.auth
            })
        })
    })

    app.get('/enviar', (req, res) => {
        res.render('send', {
            callback: null,
            auth: req.session.auth
        });
    })

    app.post('/enviar', (req, res) => {
        amCont.sendMessage(req.body.msg).then((resolved) => {
            res.render('send', {
                callback: resolved,
                auth: req.session.auth
            })
        }, (rejected) => {
            res.render('send', {
                callback: rejected,
                auth: req.session.auth
            })
        })
    })
    app.get('/criar', redirectLogin, (req, res) => {
        res.render('createUser', {
            callback: null,
            auth: req.session.auth
        });
    })
    app.post('/criar', redirectLogin, (req, res) => {
        let md5pass = md5(req.body.password);
        userCont.createUser(req.body.nome, req.body.email, md5pass).then((resolved) => {
            res.render('createUser', {
                callback: resolved,
                auth: req.session.auth
            })
        }, (rejected) => {
            res.render('createUser', {
                callback: rejected,
                auth: req.session.auth
            })
        })
    })

    app.get('/pendentes', redirectLogin, (req, res) => {
        amCont.selectAllMessages().then((resolved) => {
            res.render('adm', {
                messages: resolved,
                auth: req.session.auth
            })

        }, (rejected) => {
            res.render('adm', {
                messages: null,
                auth: req.session.auth
            })
        })
    })

    app.get('/deslogar', redirectLogin, (req, res) => {
        req.session.regenerate((err) => {
            console.log(err)
        })
        req.session.auth = false;
        res.redirect('/login')
    })
    
    app.post('/home/delete/:id', redirectLogin, (req, res) => {
        let id = req.params.id;

        apmCont.selectMessage(id).then((resolved) => {
            console.log(resolved)
            let idStr = resolved[0].idStr;
            console.log(`idStr: ${idStr}`);
            twitter2.post('statuses/destroy/:id', { id:`${idStr}` }, function (err, data, response) {
                if(!err){
                    apmCont.deleteMessage(id).then((resolved) => {
                        res.redirect('/');
                    }, (err) => {
                        res.send(err);
                    })
                }else{
                    res.send('Ocorreu um erro ao deletar a mensagem!');
                }
            })
        })



    })

    app.post('/delete/:id', redirectLogin, (req, res) => {
        let id = req.params.id;

        amCont.deleteMessage(id).then((resolved) => {
            res.redirect('/pendentes');
        }, (err) => {
            res.send(err);
        });
    })

    app.get('/alterarsenha', redirectLogin, (req, res) => {
        res.render('changePass', {
            callback: null,
            auth: req.session.auth
        })
    })

    app.post('/alterarsenha', redirectLogin, (req, res) => {
        let ap = md5(req.body.ap);
        let p1 = req.body.p1;
        let p2 = req.body.p2;
        let email = req.session.email;

        userCont.selectPass(req.session.email).then((pass) => {
            if(pass[0].password == ap){

                if(p1 == p2){

                    let pf = md5(p1);
        
                    userCont.changePass(pf, req.session.email).then((resolved) => {
                        res.render('changePass', { 
                            callback: resolved,
                            auth: req.session.auth
                        })
                    }, (rejected) => {
                        res.render('changePass', { 
                            callback: rejected,
                            auth: req.session.auth
                        })
                    })
                }else{
        
                    res.render('changePass', { 
                        callback: 'As senhas não coincidem!',
                        auth: req.session.auth
                    })
                }
            }else {
                res.render('changePass', { 
                    callback: 'Sua senha atual está errada!',
                    auth: req.session.auth
                })
            }

            
        })

        
        
    })


    app.post('/approve/:id', redirectLogin, (req, res) => {
        let id = req.params.id;

        amCont.selectMessage(id, 1).then((resolved) => {
            let message = resolved[0].message;
            let sentTime = resolved[0].date;
            

            twitter.post('statuses/update', {status: `${message}`}, function(error, tweet, response) {
                if (!error) {
                  console.log(tweet);
                }

                let idStr = tweet.id_str;

                apmCont.approveMessage(message, sentTime, idStr).then((resolved) => {
                    amCont.deleteMessage(id).then((resolved2) => {
                        res.redirect('/pendentes')
                    })
                }, (rejected) => {
                    res.send(rejected)
                })
            }, (rejected) => {
                res.send(rejected)
            }) 
            });
            
           
    })

    app.get('/deletar-aprovadas', redirectLogin, (req, res) => {

        apmCont.deleteAllApprovedMessages().then((resolved) => {
            res.send(resolved)
        }, (rejected) => {
            res.send(rejected);
        })
    })

    
}