import express from 'express';

const app = express()

app.use(express.json())

app.use('/',(req, res)=>{
    return res.json("Olá")
})

app.get('usuarios', async (req, res) => {
    try{
        const usuarios = await Prisma.post.fundMany();
        return res.json(usuarios)
    }
    catch (e){
        console.log(e)
    }
}
)

app.listen(3000, ()=> console.log("Api Rodando"))