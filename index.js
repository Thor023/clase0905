const express = require ("express");
const expressFileUpload = require('express-fileupload')
const app = express();
// SETTIINGs

const port = 3000;

app.use(expressFileUpload({
    limits: { fileSize: 8000000},
    abortOnLimit: true,
    responseOnLimit: "El peso del archivo es demasiado grande"

}));

//START SERVER
app.listen(port,()=>{
    console.log(`SERVER ON port: ${port}`);
});


app.get("/", (req,res)=>{
    res.send(`
        <form method = "POST" enctype = "multipart/form-data">
        <input type="file" name="foto1" required>
        <button> Upload </button>
        </form>
        `);
});

app.post("/", (req,res)=>{
    const {foto} = req.files;

    foto.mv(`${__dirname}/archivos/${foto.name}`, (err)=>{
        if (err){
            console.log(err);
            res.status(500).send("Algo salio mmal");
        }
        res.send("Archivo subido con exito");
    })
})