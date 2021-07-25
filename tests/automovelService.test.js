const automovelService = require('./../services/automovelService');
const request = require('supertest');
const express = require('express');

const app = express();

// test('Criar automovel', () => {
//     const result = automovelService.save();
//     // expect(result).toEqual(5);
// })

describe('GET /automovel', function(){
    it('respond with json', function(done){
      request(app)
        .get('/automovel')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });