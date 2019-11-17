import 'dotenv/config'
import express from 'express'
import BullBoard from 'bull-board'
import Queue from './app/lib/Queue'
import mongoose from 'mongoose'

import { rules, options } from './config/database'

// Import all controllers
import * as controller from './app/controllers'
// Import all validators
import * as validator from './app/validators'

const app = express()
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?${rules}`, options)

app.use(express.json())
app.post('/receive-product', validator.ReceiveProduct, controller.ReceiveProduct.register)

app.use('/admin/queues', BullBoard.UI);
app.listen(3333)