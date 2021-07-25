const request      = require('supertest');
const app          = require('../app');
const middleware   = require('../middleware/mongoMiddleware');

afterAll(() => middleware.disconnect());

describe('Criar, listar, editar e deletar utilizacao ', function() {
    it('Criar utilizacao', function(done){
      request(app)
        .post('/utilizacao/iniciar')
        .send({
          "automovel":       "AAA1111",
          "motorista":       "Motorista Teste 1",
          "motivo":          "Motivo Teste 1"
        })
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    });

    it('Listar pelo motorista e placa, alterar e deletar', function(done){
      request(app)
        .get('/utilizacao')
        .query({ motorista: 'Motorista Teste 1', automovel: 'AAA1111'})
        .expect(200)
        .then(listResponse => {
          request(app)
          .post('/utilizacao/finalizar')
          .send({motorista: 'Motorista Teste 1'})
          .expect(200)
          .then( updateResponse => {
            request(app)
            .delete('/utilizacao/'+updateResponse.body._id)
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
      .get('/utilizacao')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        done()
      });
  })
});

