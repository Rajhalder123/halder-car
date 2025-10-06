const Joi = require("joi");

// Signup validation middleware allowing extra fields
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(1)
      .max(50)
      .required()
      .messages({
        "string.empty": "First name is required",
        "string.pattern.base": "First name must contain only alphabets",
        "string.min": "First name must have at least 1 character",
        "string.max": "First name must not exceed 50 characters",
      }),

    lastName: Joi.string()
      .pattern(/^[A-Za-z]+$/)
      .min(1)
      .max(50)
      .required()
      .messages({
        "string.empty": "Last name is required",
        "string.pattern.base": "Last name must contain only alphabets",
        "string.min": "Last name must have at least 1 character",
        "string.max": "Last name must not exceed 50 characters",
      }),

    email: Joi.string()
      .email()
      .max(50)
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
        "string.max": "Email must not exceed 50 characters",
      }),

    password: Joi.string()
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must be 6–10 characters and include at least one uppercase, one lowercase, one number, and one special character",
      }),
  }).unknown(true); // allow extra fields if needed (optional)

  const { error } = schema.validate(req.body, { abortEarly: false }); // ✅ collect all errors
  if (error) {
    return res.status(400).json({
      message: "Invalid details Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }
  next();
};
// Login validation middleware (same, but no extra fields needed typically)
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(4).max(100).required(),
  }).unknown(true); // allow extra fields here too if you want

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = { signupValidation, loginValidation };
