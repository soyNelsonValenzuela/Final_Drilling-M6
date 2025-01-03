import { createServer } from 'node:http';
import { obtenerAnimes, guardarAnime, actualizarAnime, eliminarAnime, buscarAnimePorId,buscarAnimePorNombreConId } from './script.js';
export const PORT = 3001;
export const server = createServer(async (req, res) => {
    try {
        const { method, url } = req;
        const id = url.split('/')[2]
        switch (method) {
            case 'POST':
                if (url === '/agregar') {
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        try {
                            const nuevoAnime = JSON.parse(body);
                            if (!nuevoAnime.nombre || !nuevoAnime.genero || !nuevoAnime.anio || !nuevoAnime.autor) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end('Faltan campos obligatorios (nombre, genero, anio, autor)');
                                return;
                            }
                            const animeGuardado = await guardarAnime(nuevoAnime);
                            res.writeHead(201, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(animeGuardado));
                        } catch (error) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Error al guardar el anime');
                        }
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Ruta no encontrada');
                }
                break;
            case 'GET':
                if (url === '/') {
                    res.writeHead(200, { 'Content-Type': 'text-plain' })
                    res.end(`Bienvenid@ a nuestra api de animes. \n Para visualizar la lista de animes accede a: http://localhost:${PORT}/anime`)
                } else if (url === '/animes') {
                    const animes = await obtenerAnimes();
                    if (Object.keys(animes).length > 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json' })
                        res.end(JSON.stringify(animes));
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text-plain' })
                        res.end('No existen animes en la lista')
                    }
                } else if (url.startsWith('/animes')) {
                    const queryParams = new URL(`http://localhost:3001${url}`).searchParams;
                    const id = queryParams.get('id'); // Obtener el parámetro 'id'
                    const nombre = queryParams.get('nombre'); // Obtener el parámetro 'nombre'

                    try {
                        if (id) {
                            const anime = await buscarAnimePorId(id);
                            if (anime) {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ id, ...anime }));
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/plain' });
                                res.end(`Anime con ID "${id}" no encontrado`);
                            }
                        } else if (nombre) {
                            // Buscar anime por nombre
                            const anime = await buscarAnimePorNombreConId(nombre);
                            if (anime) {
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(anime));
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/plain' });
                                res.end(`Anime con nombre "${nombre}" no encontrado`);
                            }
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/plain' });
                            res.end('Debe proporcionar un parámetro de búsqueda (id o nombre)');
                        }
                    } catch (error) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error interno del servidor');
                    }
                } else {
                    res.writeHead(404, { 'Content-Type': 'text-plain' })
                    res.end('Anime no encontrado')
                }

                break;
            case 'PUT':
                if (url.startsWith('/actualizar')) {
                    let body = '';
                    req.on('data', (chunk) => {
                        body += chunk;
                    });
                    req.on('end', async () => {
                        const datosAActualizar = JSON.parse(body);
                        const animeActualizado = await actualizarAnime(id, datosAActualizar);
                        if (animeActualizado) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({"mensaje":"Anime actualizado exitosamente"}))
                        } else {
                            res.writeHead(404, { 'Content-Type': 'text-plain' });
                            res.end(JSON.stringify(`Anime con ID ${id} no encontrado`));
                        }
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'text-plain' })
                    res.end(`Anime con ID ${id} no encontrado`)
                }
                break;
            case 'DELETE':
                if (url.startsWith('/eliminar/')) {
                    try {
                        const eliminado = await eliminarAnime(id);
                        if (eliminado) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({"mensaje":"Anime eliminado exitosamente"}))
                        } else {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end(`Anime con ID ${id} no encontrado`);
                        }
                    } catch (error) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error al eliminar el anime');
                    }
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Ruta no encontrada');
                }
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 'mensaje': 'No se encontró la ruta' }));
        }
    } catch (error) {
        res.writeHead(500);
        res.end('error interno en el servidor');
    }

})

server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))