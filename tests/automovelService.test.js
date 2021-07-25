var automovelRoute = require('./../routes/automovelRoute');
const request      = require('supertest');
const app          = require('./../app');
const middleware   = require('./../middleware/mongoMiddleware');
const Automovel    = require('./../model/automovel');

afterAll(() => middleware.disconnect());

describe('Criar, listar, editar e deletar automovel ', function() {
    it('Criar automovel', function(done){
      request(app)
        .post('/automovel')
        .send({
          "placa": "AAA1111",
          "cor"  : "Preto",
          "marca": "Fiat"
        })
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    });

    it('Listar pela placa e cor, alterar e deletar', function(done){
      request(app)
        .get('/automovel')
        .query({ placa: 'AAA1111' , cor: 'Preto'})
        .expect(200)
        .then(listResponse => {
          console.log(listResponse.body);
          request(app)
          .post('/automovel/upsert')
          .send({ id : listResponse.body._id , placa: 'BBB2222' , cor: 'Branco', marca: 'nissan'})
          .expect(200)
          .then( updateResponse => {
            console.log(JSON.stringify(updateResponse));
            request(app)
            .delete('/automovel/'+updateResponse.body._id)
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
      .get('/automovel')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});

