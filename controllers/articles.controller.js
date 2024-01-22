const articlesServices = require('../services/articles.services')

const get = async (req, res, next) =>{
    try {
    const {query} = req;
    const results = await articlesServices.getAll({ ...query });
    res.json({
        status: "succes",
        code: 200,
        data: {
            articles: results,
        }
    })
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const {params} = req;
        const { id } = params;
        const results = await articlesServices.getOne(id);
        res.json({
            status: "succes",
            code: 200,
            data: {
                article:results,
            }
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
};

const create = async (req, res, next) => {
    try {
        const { body } = req;
        const results = await articlesServices.create({ ...body});
        res.json({
            status: "succes",
            code: 200,
            data: {
                article: results,
            },
        });
    } catch (e) {
        console.error(e)
        next(e)
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const results = await articlesServices.update(id, body);
        res.json({
            status: "succes",
            code: 200,
            data: {
                article:results,
            }
        })
}   catch (e) {
        console.error(e)
        next(e)
}};

const updateStatus = async (req, res, next) => {
    try {
        const { body, params} = req
        const { id } = params;
        const { favorite } = body;
        const results = await articlesServices.updateStatus(id, favorite);
        if (!favorite) {
            return res.status(400).json({message: "missing field favorite"})
          }
        if (!results) {
            return res.status(404).json({message: "Not found"})
          }
        res.json({
            status: "succes",
            code: 200,
            data: {
                article:results,
            }
        })
}   catch (e) {
console.error(e)
next(e)
}};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await articlesServices.remove(id);
        res.json({
            status: "succes",
            code: 200,
            data: {
                id,
                data:{
                article:results,
            }
        },
        })
}   catch (e) {
console.error(e)
next(e)
}};

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
};