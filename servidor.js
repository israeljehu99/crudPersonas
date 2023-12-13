const datos = require('./configuracion');
const express = require('express');
const app = express();
const archivo = require('fs');
const puerto = 3000;

app.use(express.json());
app.use(express.static('html'));
app.use(express.static('css'));

app.get('/', (req, res) => {
    archivo.readFile('./html/index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'error al cargar pagina' });
        } else {
            res.setHeader("Content-Type", "text/html");
            res.send(data);
        }
    });
});

app.get('/registrar', (req, res) => {
    archivo.readFile('./html/registar.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'ocurrio un error al cargar la pagina' });
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });

});

app.get('/modificar', (req, res) => {
    archivo.readFile('./html/actualizar.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'error al cargar la pagina' });
        } else {
            res.setHeader('ContentType', 'text/html');
            res.send(data);
        }
    });

});

app.get('/eliminar', (req, res) => {
    archivo.readFile('./html/eliminar.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'error al cargar la pagina' });
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.get('/mostrar', (req, res) => {
    archivo.readFile('./html/mostrar.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'error al cargar la pagina' });
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});


app.get('/mostrarTodos', async (req, res) => {
    try {
        datos.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({ error: 'ocurrio un error' });
            } else {
                connection.query('select * from persona', (error, results) => {
                    connection.release();
                    if (error) {
                        res.status(500).json({ error: 'ERROR EN LA CONSULTA' });
                    } else {
                        res.json(results);
                    }
                });
            }
        });
    } catch (error) {
        res.json({ error: 'ocurrio un error' });
    }
});

app.get('/mostrarUno/:dni', (req, res) => {
    try {
        const dni = req.params.dni;
        datos.getConnection((error, connection) => {
            if (error) {
                res.status(500).json({ error: 'error al conectar DDBB' });
            } else {
                connection.query('select * from persona where dni = ?', [dni], (error, results) => {
                    connection.release();
                    if (error) {
                        res.json({ error: 'error en la consulta' });
                    } else {
                        res.json(results);
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({error:'ocurrio un error'});
    }

});

app.post('/ingresa',(req,res)=>{
    try {
        const {dni, nombre,apellido} = req.body;
        datos.getConnection((error,connection)=>{
            if(error){
                res.status(500).json({error:'ocurrio un error DDBB'});
            }
            else{
                connection.query('insert into persona values(?,?,?)',[dni,nombre,apellido],(error,results)=>{
                   connection.release();
                    if (error) {
                        res.status(500).json({error:'error en la consulta'});
                    } else {
                        res.status(201).json({respuesta:'ingresado corretamente'});
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({error:'erroren la funcion ingresa'});
    }
});

app.put('/modi/:dni',(req,res)=>{
    try {
        const dni = req.params.dni;
        const {nombre,apellido} = req.body;
        datos.getConnection((error,connection)=>{
            if (error) {
                res.json({error:'error al conectar DDBB'});
            } else {
                connection.query('update persona set nombre = ?, apellido = ? where dni = ?',[nombre,apellido,dni],(error,results)=>{
                    connection.release();
                    if (error) {
                        res.status(500).json({error:'error en la consulta'});
                    } else {
                        res.status(201).json({respuesta:'modificado correctamente'});
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({error:'error en la consulta general'});
    }
});

app.delete('/eli/:dni',(req,res)=>{
    try {
        const dni = req.params.dni;
        datos.getConnection((error,connection)=>{
            if (error) {
                res.status(500).json({error:'error al conectar DDBB'});
            } else {
                connection.query('delete from persona where dni = ?',[dni],(error,results)=>{
                    connection.release();
                    if (error) {
                        res.status(500).json({error:'error en la consulta preparada'});
                    } else {
                        res.status(201).json({respuesta:'eliminado'});
                    }
                });
                
            }
        });
    } catch (error) {
        res.status(500).json({error:'ocurrio un error en la consulta'});
    }
});

app.listen(puerto, () => { console.log(`conectado en el puerto ${puerto}`) });