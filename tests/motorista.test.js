const request      = require('supertest');
const app          = require('../app');
const middleware   = require('../middleware/mongoMiddleware');

afterAll(() => middleware.disconnect());

describe('Criar, listar, editar e deletar motorista ', function() {
    it('Criar motorista', function(done){
      request(app)
        .post('/motorista')
        .send({
          "nome": "João"
        })
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    });

    it('Listar pelo nome, alterar e deletar', function(done){
      request(app)
        .get('/motorista')
        .query({ nome: 'João'})
        .expect(200)
        .then(listResponse => {
          request(app)
          .post('/motorista/upsert')
          .send({ id : listResponse.body._id , nome: 'Jorge'})
          .expect(200)
          .then( updateResponse => {
            request(app)
            .delete('/motorista/'+updateResponse.body._id)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });
          });
      })
      .catch(err => done(err))
    })
      
});

describe('List all automoveis', function() {
  it('respond with json', function(done){
    request(app)
      .get('/motorista')
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});

