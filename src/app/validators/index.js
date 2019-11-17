import { validationResult } from 'express-validator'

export { default as ReceiveProduct } from './ReceiveProductValidators'

export const checkInputValidator = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return { errors: errors.array() };
  }
}
