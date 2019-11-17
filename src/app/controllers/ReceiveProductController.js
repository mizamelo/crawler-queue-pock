import * as validator from '../validators'
import Queue from '../lib/Queue'

export default {
 async register(req, res, next) {
    try {
      const err = validator.checkInputValidator(req, res)
      if (err) return res.status(422).json(err)

      const { url } = req.body;

      Queue.add('ReceiveProductQueue', { url })

      res.send({ msg: 'Products will be processed' })
    } catch (error) {
      console.log(error)
      next()
    }
  }
}