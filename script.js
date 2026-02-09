document.getElementById('formBuzon').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        tipo: document.getElementById('tipo').value,
        contenido: document.getElementById('contenido').value,
        actuacion: document.getElementById('actuacion').value
    };

    try {
        const response = await fetch('https://cuestionario-angeles-d1.onrender.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Mensaje enviado de forma anónima. Gracias por confiar.');
            document.getElementById('formBuzon').reset();
        } else {
            alert('Error al enviar. Intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo conectar con el servidor.');
    }

});


