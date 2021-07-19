let ErrorType = {

    GENERAL_ERROR: { id: 1, httpCode: 600, message: "General error", isShowStackTrace: true },
    UNAUTHORIZED: { id: 2, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: false },
    NO_AUTHORIZATION_TOKEN: { id: 3, httpCode: 401, message: "No authorization token was found/ invalid token", isShowStackTrace: false },
    USER_EMAIL_ALREADY_EXIST: { id: 4, httpCode: 602, message: "Email already exist", isShowStackTrace: false },
    MISSING_PARAMETERS: { id: 5, httpCode: 603, message: "Missing parameters", isShowStackTrace: false },
    USER_DOES_NOT_EXIST: { id: 6, httpCode: 401, message: "User does not exist", isShowStackTrace: false }
}

module.exports = ErrorType;