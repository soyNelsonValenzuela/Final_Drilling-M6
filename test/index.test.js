import chai from 'chai'; // Opción corregida
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import { PORT } from '../index.js';

chai.use(chaiHttp); // Esto habilita chai-http
const { expect, request } = chai;
const baseUrl = `http://localhost:${PORT}`;
describe('API de Animes', () => {
    let idAnimeCreado;
    it('Debería mostrar un mensaje de bienvenida en la raiz (GET /)', (done) => {
        request(baseUrl)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            });
    });
    it('Debería listar todos los animes (GET /animes)', (done) => {
        request(baseUrl)
            .get('/animes')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    // Test para buscar un anime por ID
    it('Debería obtener un anime por ID (GET /animes?id=1)', (done) => {
        chai.request(baseUrl)
            .get('/animes?id=1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    // Test para buscar un anime por nombre
    it('Debería obtener un anime por nombre (GET /animes?nombre=Dragon%20Ball)', (done) => {
        chai.request(baseUrl)
            .get('/animes?nombre=Dragon%20Ball')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

    // Test para crear un nuevo anime
    it('Debería crear un nuevo anime (POST /agregar)', (done) => {
        const nuevoAnime = {
            "nombre": "One Piece",
            "genero": "Shonen",
            "anio": 1999,
            "autor": "Eiichiro Oda"
          };

        chai.request(baseUrl)
            .post('/agregar')
            .send(nuevoAnime)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                idAnimeCreado = res.body.id; // Guardamos el ID para pruebas posteriores
                done();
            });
    });

    // Test para actualizar un anime existente
    it('Debería actualizar un anime existente (PUT /actualizar/:id)', (done) => {
        const actualizacion = {
            "nombre": "One Piece (Actualizado)",
            "genero": "Shonen",
            "anio": 1999,
            "autor": "Eiichiro Oda"
          };

        chai.request(baseUrl)
            .put('/actualizar/1')
            .send(actualizacion)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("mensaje","Anime actualizado exitosamente");
                done();
            });
    });

     // Test para eliminar un anime existente
     it('Debería eliminar un anime existente (DELETE /eliminar/:id)', (done) => {
        chai.request(baseUrl)
            .delete(`/eliminar/${idAnimeCreado}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("mensaje", "Anime eliminado exitosamente");
                done();
            });
    });
  
});