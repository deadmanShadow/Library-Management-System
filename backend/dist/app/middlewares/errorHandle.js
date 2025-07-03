"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandle = void 0;
const mongoose_1 = require("mongoose");
const errorHandle = (err, req, res, next) => {
    if (err.name === "ValidationError" &&
        err instanceof mongoose_1.Error.ValidationError) {
        const formattedErrors = {};
        for (const [key, errorDetail] of Object.entries(err.errors)) {
            let properties = {};
            if (errorDetail.name === "ValidatorError" &&
                "properties" in errorDetail) {
                properties = Object.assign({}, errorDetail.properties);
                delete properties.path;
                delete properties.value;
            }
            formattedErrors[key] = {
                message: errorDetail.message,
                name: errorDetail.name,
                properties,
                kind: errorDetail.kind,
                path: errorDetail.path,
                value: errorDetail.value,
            };
        }
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: err.name,
                errors: formattedErrors,
            },
        });
        return;
    }
    res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong",
        success: false,
        error: err,
    });
};
exports.errorHandle = errorHandle;
