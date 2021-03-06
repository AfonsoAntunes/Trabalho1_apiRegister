//Import Bio Model
Bio = require('./registerModel');

//Para index
exports.index = function (req, res) {
    Bio.get(function (err, bio) {
        if (err)
            res.json({
                status: "Erro!!",
                message: err
            });
        res.json({
            status: "OK",
            message: "Obtidas Registos com Sucesso!",
            data: bio       
        });
    });
};

//Criar nova BIO
exports.add = function (req, res) {
    var bio = new Bio();
    bio.nome = req.body.nome? req.body.nome: bio.nome;
    bio.email = req.body.email;
    bio.telef = req.body.telef;
    bio.morada = req.body.morada;

    //Guardar e verificar erros
    bio.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "Novo Registo Adicionado!",
            data: bio
        });
    });
};

// Ver Bio
exports.view = function (req, res) {
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        res.json({
            message: 'Detalhes do Registo',
            data: bio
        });
    });
};

// Atualizar Bio
exports.update = function (req, res) {
    Bio.findById(req.params.bio_id, function (err, bio) {
        if (err)
            res.send(err);
        bio.nome = req.body.nome ? req.body.nome : bio.nome;
        bio.email = req.body.email;
        bio.telef = req.body.telef;
        bio.morada = req.body.morada;

        //Guardar e verificar erros
        bio.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Registo Atualizado com sucesso!",
                data: bio
            });
        });
    });
};

// Apagar Bio
exports.delete = function (req, res) {
    Bio.deleteOne({
        _id: req.params.bio_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "OK",
            message: 'Bio Eliminada!'
        });
    });
};