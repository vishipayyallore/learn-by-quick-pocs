/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/posts.controller';
const router = express.Router();

router.get('/posts/:id', controller.getPost);
router.post('/posts', controller.addPost);

export = router;