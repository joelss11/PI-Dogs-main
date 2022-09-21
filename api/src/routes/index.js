const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require('axios');
const {Raza, Temperamento} = require("../db")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async ()=>{
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=%20live_4aUjTu6Kn7Z6fe9AVuAlvEjUgBOsKmBkv0wACo2EUDISsSJLRDI2NIaOUT7VmxHq")
    const apiInfo = await apiUrl.data.map(resp=>{
        return{
            id:resp.id,
            nombre:resp.name,
          pesoMin:resp.weight.metric.slice(0, 2).trim(),
          pesoMax:resp.weight.metric.slice(4).trim(),
          alturaMin:resp.height.metric.slice(0, 2).trim(),
          alturaMax:resp.height.metric.slice(4).trim(),
            añosDeVida:resp.life_span,
            imagen:resp.image.url,
            temperament:resp.temperament
        }
    })
    return apiInfo;
}

const getDbIfo = async ()=>{
    return await Raza.findAll({
        include:{
            model:Temperamento,
            attributes:["nombre"],
            through:{
                attributes:[],
            }
        }
    })
}
   
const getAllRazas = async()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbIfo();
    const InfoTotal = apiInfo.concat(dbInfo);
    return InfoTotal;
}
const getTemperament = async () => {
    let api = await axios.get("https://api.thedogapi.com/v1/breeds?api_key=%20live_4aUjTu6Kn7Z6fe9AVuAlvEjUgBOsKmBkv0wACo2EUDISsSJLRDI2NIaOUT7VmxHq");
    let allTemperament = await api.data
      .map((temp) => {
        return temp.temperament;
      })
      .join()
      .split(",");
  
    let temps = [];
  
    allTemperament.map((c) => {
      if (!temps.includes(c.trim()) && c) {
        temps.push(c.trim());
      }
    });
  
    temps.map(async (d) => {
      await Temperamento.findOrCreate({
        where: {
          nombre: d,
        },
      });
    });
  };


router.get("/dogs", async (req, res)=>{
   const nombre = req.query.nombre
   let DogsTotal = await getAllRazas();
   
   if(nombre){
    let dogName = await DogsTotal.filter(dog => dog.nombre.toLowerCase().includes(nombre.toLowerCase()))
    dogName.length ? 
    res.status(200).send(dogName):
    res.status(404).send("No se pudo encontrar el Dog que quisistes buscar, intenta con otro");
   }
   else{
    res.status(200).send(DogsTotal);
   }
})
 
router.get('/dogs/:idRaza', async (req, res) => {

   try {
       const { idRaza } = req.params;
       const allDogs = await getAllRazas();
       if (!idRaza) {
           res.status(404).json("No se pudo encontrar el perrito en la base de datos")
       } else {
           const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
           res.status(200).json(dog)
       }
   } catch (error) {
       res.status(404).send(error)
   }
})

router.post("/dogs", async (req, res) => {

   let {nombre, alturaMin,alturaMax, pesoMin,pesoMax, añosDeVida, imagen,createdInDb, Temperamentos} = req.body;
    
     let DogCreated = await Raza.create({
        nombre,
        alturaMin,
        alturaMax,
        pesoMin,
        pesoMax,
        añosDeVida,
        imagen,
        createdInDb,
    
     })

     let temperamentoDb = await Temperamento.findAll({
        where:{nombre:Temperamentos}
     })

     DogCreated.addTemperamento(temperamentoDb)
     res.send("Personaje creado correctamente")

     
   
  });


router.get("/temperaments", async (req, res) => {
    await getTemperament();
  
    const allTemperaments = await Temperamento.findAll();
    const filteredTemperaments = await allTemperaments.map((obj) => obj.nombre);
    res.status(200).send(filteredTemperaments);
  });









module.exports = router;
