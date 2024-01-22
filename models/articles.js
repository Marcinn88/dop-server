const fs = require('fs/promises')
const patch = require("path");
const articlesPath = patch.join(__dirname, "./articles.json");
const { nanoid } = require("nanoid");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const listArticles = async () => {
  try {
    const data = await fs.readFile(articlesPath);
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const getArticleById = async (articleId) => {
  try {
    const articles = await listArticles();
    const result = articles.find((item) => item.id === articleId);
    return result || null;
  } catch (error) {
    return null;
  }
};

const removeArticle = async (articleId) => {
  try {
    const articles = await listArticles();
    const index = articles.findIndex((item) => item.id === articleId);
    if (index === -1) {
      return null;
    }
    const [result] = articles.splice(index, 1);
    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    return result;
  } catch (error) {
    return null;
  }
};

const addArticle = async (body) => {
    const articles = await listArticles();
    const newArticle = { id: nanoid(), ...body };
    const responseBody = addSchema.validate(body);
    if (responseBody.error) {
      console.log('Brak danych. Walidacja niepoprawna.');
      return null;
  } else {
    articles.push(newArticle);
    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    return newArticle;
  }
};

const updateArticle = async (articleId, body) => {
  try {
    const articles = await listArticles();
    const index = articles.findIndex((item) => item.id === articleId);
    if (index === -1) {
      return null;
    }
    articles[index] = {
      id: articleId,
      name:
        body.name !== undefined && body.name.trim().length > 0
          ? body.name
          : articles[index].name,
      email:
        body.email !== undefined && body.email.trim().length > 0
          ? body.email
          : articles[index].email,
      phone:
        body.phone !== undefined && body.phone.trim().length > 0
          ? body.phone
          : articles[index].phone,
    };

    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    return articles[index];
  } catch (error) {
    return null;
  }
};

module.exports = {
  listArticles,
  getArticleById,
  removeArticle,
  addArticle,
  updateArticle,
}
