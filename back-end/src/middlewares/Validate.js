const Joi = require("joi")

const logInValidation = (req, res, next) => {
  const schema = Joi.object({
    phone_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(8)
      .required()
      .messages({
        "any.required": "phoneNumber cannot be empty",
      }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]{6,25}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password length at least has to be 6 or above with no special characters",
      }),
  })

  const { value, error } = schema.validate({
    phone_number: req.body.phone_number,
    password: req.body.password,
  })

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    })
  }

  return next()
}

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(15),
    phone_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(8)
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9_-]{6,25}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Password length at least has to be 6 or above with no special characters",
      }),
  })

  const { value, error } = schema.validate({
    username: req.body.username,
    phone_number: req.body.phone_number,
    password: req.body.password,
  })

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    })
  }

  return next()
}

const libraryAddValidation = (req, res, next) => {
  const schema = Joi.object({
    client_id: Joi.number().required(),
    show_id: Joi.number().required(),
  })
  const { value, error } = schema.validate({
    client_id: req.body.client_id,
    show_id: req.body.show_id,
  })

  if (error) {
    return res.status(400).send({
      message: error.details[0].message,
    })
  }
  return next()
}

module.exports = { signUpValidation, logInValidation, libraryAddValidation }
