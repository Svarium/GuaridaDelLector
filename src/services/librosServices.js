const db = require('../database/models')
const literalQueryUrlImage = require('../helpers/literalQueryUrlImage')

module.exports = {
    getAllLibros: async (req, {withPagination = "false", page= 1, limit=8} = {}) => {
        try {

            let options = {
                include: [
                    {
                        association: "autor",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id", "autorId"],
                        },
                    },             {
                        association: "genero",
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id", "generoId"],
                        },
                    },
                    {
                        association: "editorial",                   
                         attributes: {
                            exclude: ["createdAt", "updatedAt", "id", "editorialId"],
                        },
                    },
                ],
                attributes: {
                    include: [literalQueryUrlImage(req, "libros", "imagen", "imagen")],
                },
               
            }

            if(withPagination === "true"){
                
                options= {
                    ...options,
                    page,
                    paginate: limit
                }

                const {docs, pages, total} = await db.Libros.paginate(options)
                return {
                    libros: docs,
                    pages,
                    count: total,
                }
            }
           
            const {count, rows:libros} = await db.Libros.findAndCountAll(options);
            return {
                count,
                libros
            }

        } catch (error) {
            console.log(error);
            throw {
                status: 500,
                message: error.message,
            };
        }
    },
    getLibrosById: async (id, req) =>{
        try {
          const libro = await db.Libros.findByPk(id,{
            include : [{
                association : "autor",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","autorId"]
                }
            },
            {
                association : "genero",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","generoId"]
                }
            },{
                association : "editorial",
                attributes :{
                    exclude : ["createdAt","updatedAt","id","editorialId"]
                }
            }
        ],
        attributes: {
            include:[
              literalQueryUrlImage(req,'libros', 'imagen', 'imagen' )
            ]
          }
          })
          
         return libro
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },

    getAllAutors : async () => {
        try {
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },

    getAllGeneros : async () => {
        try {
            const generos = await db.Generos.findAll({
                order: [['nombre']],
                    where :{id:data.genero.id},
                    attributes: ['id', 'nombre']
            })

            return generos
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },

    getLastBook : async (req) => {

        try {
            const lastBook = await db.Libros.findAll({
                order: [['createdAt', 'DESC']],
                limit: 1,
                attributes: {
                    include: [literalQueryUrlImage(req, "libros", "imagen", "imagen")],
                },
            })
            
            return lastBook
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }

    },

    getAllEditoriales : async () => {
        try {
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            } 
        }
    },

    getCountBooks : async () => {
        try {

            const totalBooks = await db.Libros.count()
            return totalBooks
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            } 
        }
    },

    getCountAutors : async () => {
        try {

            const totalAutors = await db.Autores.count()
            return totalAutors
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            } 
        }
    },



    createLibro: async (data, image) => {
        try {

           /*  const [genero, autor, editorial] = await Promise.all([
                db.Generos.findOne({
                    order: [['nombre']],
                    where :{id:data.genero.id},
                    attributes: ['id']
                }),

                db.Autores.findOne({
                    where :{id:data.autor.id},
                    order: [['nombre']],
                    attributes: ['id'],
                 
                }),
                db.Editoriales.findOne({
                    where :{id:data.editorial.id},
                    order: [['nombre']],
                    attributes: ['id']
                })
            ]); */
                
        const newLibro = await db.Libros.create({
            titulo : data.titulo.trim(),
            precio : data.precio.trim(),
            autorId : data.autor,
            generoId: data.genero,
            editorialId: data.editorial,
            video: data.video,
            paginas : data.paginas,
            description2 : data.description2,
            imagen : image ? image.filename : "not image.png",
        })     
        
        return newLibro

        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },

    updateLibro: async(id, data, image) => {
        try {
             
            const libroUpdated = await db.Libros.update({
                titulo : data.titulo.trim(),
                precio : data.precio.trim(),
                autorId : data.autor,
                generoId: data.genero,
                editorialId: data.editorial,
                video: data.video,
                paginas : data.paginas,
                description2 : data.description2,
                imagen : image.file ? image.file.filename : data.icon,
            },
            {
                where: {id:id}
            }
            )

            return libroUpdated


        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    },

    destroyLibro : async (id) => {
        try {

            const libroDestroy = await db.Libros.destroy({
                where:{id:id},
                force:true
            })

            return libroDestroy
            
        } catch (error) {
            console.log(error)
            throw{
                status :500,
                message : error.message
            }
        }
    }
}