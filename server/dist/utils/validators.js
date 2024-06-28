import { body, validationResult } from "express-validator";
// Middleware to run the validators
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(422).json({ errors: errors.array() });
    };
};
// Validators for login
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is Required"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters")
];
// Validators for signup, including login validators
export const signupValidator = [
    body("name").notEmpty().withMessage("Name is Required"),
    ...loginValidator,
];
export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is Required"),
];
//# sourceMappingURL=validators.js.map