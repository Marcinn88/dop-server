const express = require('express')
const router = express.Router()
const articlesController = require('../../controllers/articles.controller')
const auth = require('../../middlewares/auth')

//Prywatne routsy, jezeli bedzie ptrzebna autoryzacja.
// router.get('/articles', auth, articlesController.get);
// router.get('/articles/:id', auth, articlesController.getById);

router.get('/articles', articlesController.get);
router.get('/articles/:id', articlesController.getById);
router.post('/articles', auth, articlesController.create);
router.put('/articles/:id', auth, articlesController.update);
router.patch('/articles/:id/favorite', auth, articlesController.updateStatus);
router.delete('/articles/:id', auth, articlesController.remove);

module.exports = router
