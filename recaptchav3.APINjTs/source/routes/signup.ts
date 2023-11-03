/** source/routes/posts.ts */
import express from 'express';
import controller from '../controllers/signup.controller';
const router = express.Router();

router.post('/signup', controller.signup);

export = router;