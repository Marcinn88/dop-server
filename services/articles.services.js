const Article = require('../models/articles.model');

const getAll = async (query) => {
    return Article.find(query)
};

const getOne = async (id) => {
    return Article.findById({ _id: id });
};

const create = async (data) => {
    return Article.create(data);
};

const update = async (id, data) => {
    return Article.findOneAndUpdate({ _id: id }, data, {
        new: true,
    })
};

const updateStatus = async (id, favorite) => {
    return Article.findOneAndUpdate({ _id: id }, { favorite }, {
        new: true,
    })
};

const remove = async (id) =>{
    return Article.findOneAndDelete({_id: id })
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updateStatus,
    remove,
}