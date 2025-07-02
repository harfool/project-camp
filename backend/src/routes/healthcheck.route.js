import express from 'express'
import healthCheck from '../controllers/healthcheck.controllers.js'

const healthRoute = express.Router()

healthRoute.get('/heathCheck' ,healthCheck)


export default healthRoute