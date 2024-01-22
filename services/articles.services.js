const Article = require('../models/articles.model');

const getAll = async (query) => {
    return Article.find(query)
};

const getOne = async (id, userId) => {
    return Article.findById({ _id: id, owner: userId });
};

const create = async (data) => {
    return Article.create(data);
};

const update = async (id, userId, data) => {
    return Article.findOneAndUpdate({ _id: id, owner: userId }, data, {
        new: true,
    })
};

const updateStatus = async (id, userId, favorite) => {
    return Article.findOneAndUpdate({ _id: id, owner: userId }, { favorite }, {
        new: true,
    })
};

const remove = async (id, userId) =>{
    return Article.findOneAndDelete({_id: id, owner: userId})
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updateStatus,
    remove,
}