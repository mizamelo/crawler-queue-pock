import * as validator from '../providers'
import Queue from '../lib/Queue'

export default {
 async register(req, res, next) {
    try {
      validator.checkInputValidator(req, res)
      const { url } = req.body;

      Queue.add('ReceiveProductQueue', { url })

      res.send({ msg: 'Products will be processed' })
    } catch (error) {
      console.log(error)
      next()
    }
  }
}