import fs from 'fs/promises';
const animeFile = 'anime.json';
export const obtenerAnimes = async () => {
    try {
        const data = await fs.readFile(animeFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        console.error(`Error al leer el archivo de tareas: ${error.message}`);
        return [];
    }
};
export const buscarAnimePorId = async (id) => {
    try {
        const data = await fs.readFile(animeFile, 'utf-8');
        const animes = JSON.parse(data);

        return animes[id] || null; // Retorna el anime si existe o null
    } catch (error) {
        console.error(`Error al buscar por ID: ${error.message}`);
        throw new Error('No se pudo buscar el anime');
    }
};


export const buscarAnimePorNombreConId = async (nombre) => {
    try {
        const data = await fs.readFile(animeFile, 'utf-8');
        const animes = JSON.parse(data);

        const idEncontrado = Object.keys(animes).find(
            (id) => animes[id].nombre.toLowerCase() === nombre.toLowerCase()
        );

        if (idEncontrado) {
            return { id: idEncontrado, ...animes[idEncontrado] };
        }

        return null;
    } catch (error) {
        console.error(`Error al buscar el anime: ${error.message}`);
        throw new Error('No se pudo buscar el anime');
    }
};


export const guardarAnime = async (nuevoAnime) => {
    try {
        const data = await fs.readFile(animeFile, 'utf-8');
        const animes = JSON.parse(data);
        const nuevoId = String(Math.max(...Object.keys(animes).map(Number)) + 1);
        animes[nuevoId] = nuevoAnime;
        await fs.writeFile(animeFile, JSON.stringify(animes, null, 2), 'utf-8');
        return { id: nuevoId, ...nuevoAnime };
    } catch (error) {
        console.error(`Error al guardar el anime: ${error.message}`);
        throw new Error('No se pudo guardar el anime');
    }
};
export const actualizarAnime = async (id, datos) => {
    const animes = await obtenerAnimes();
    if (animes[id]) {
        animes[id] = datos
        await fs.writeFile(animeFile, JSON.stringify(animes, null, 2), 'utf-8');
        return { id: id, ...datos };
    } else {
        console.log(`El anime id:${id} no existe`);
        return null;
    }
};
export const eliminarAnime = async (id) => {
    try {
        const data = await fs.readFile(animeFile, 'utf-8');
        const animes = JSON.parse(data);
        if (!animes[id]) {
            return null;
        }
        delete animes[id];
        await fs.writeFile(animeFile, JSON.stringify(animes, null, 2), 'utf-8');
        return true; // Indicar que el anime fue eliminado con éxito
    } catch (error) {
        console.error(`Error al eliminar el anime: ${error.message}`);
        throw new Error('No se pudo eliminar el anime');
    }
};