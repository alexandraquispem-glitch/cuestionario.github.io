// 1. Cargamos las librerías que instalaste
require('dotenv').config();
const express = require('express');
const { Client } = require('@notionhq/client');
const cors = require('cors');

// 2. AQUÍ DEFINIMOS "app" (Esto es lo que te faltaba)
const app = express();

// 3. Configuramos cómo va a trabajar el servidor
app.use(cors());
app.use(express.json());

// 4. Conectamos con Notion usando tu llave secreta del archivo .env
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// 5. La ruta que recibe los datos de tu formulario
app.post('/submit', async (req, res) => {
    const { tipo, contenido, actuacion } = req.body;

    try {
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                "ID / Asunto": { 
                    title: [{ text: { content: `Reporte: ${tipo}` } }] 
                },
                "Tipo de Incidente": { 
                    select: { name: tipo } 
                },
                "Detalles del reporte": { 
                    rich_text: [{ text: { content: contenido } }] 
                },
                "Acción solicitada": { 
                    select: { name: actuacion } 
                },
                "Estado": { 
                    status: { name: "Sin empezar" } 
                }
            }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        // Esto nos dirá el motivo exacto en la terminal negra
        console.error("DETALLE DEL ERROR:", error.body); 
        res.status(500).json({ error: error.message });
    }
});

// 6. Encendemos el servidor en el puerto 3000
app.listen(3000, () => console.log("¡Puente encendido en http://localhost:3000!"));