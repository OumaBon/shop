import express from 'express';

import { registerUser, getUsers } from '../controllers/userController.js'

const router = express.Router()


router.route('/').post(registerUser)
router.route('/').get(getUsers)



export default router 