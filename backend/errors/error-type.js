let ErrorType = {

    GENERAL_ERROR: { id: 1, httpCode: 600, message: "General error", isShowStackTrace: true },
    UNAUTHORIZED: { id: 2, httpCode: 401, message: "Login failed, invalid user name or password", isShowStackTrace: false },
    USER_ID_ALREADY_EXIST: { id: 3, httpCode: 601, message: "User ID already exist", isShowStackTrace: false },
    USER_EMAIL_ALREADY_EXIST: { id: 4, httpCode: 602, message: "Email already exist", isShowStackTrace: false },
    NO_AUTHORIZATION_TOKEN: { id: 5, httpCode: 401, message: "No authorization token was found/ invalid token", isShowStackTrace: false },
    MISSING_PARAMETERS: { id: 6, httpCode: 603, message: "Missing parameters", isShowStackTrace: false },
    USER_ALREADY_EXIST: { id: 7, httpCode: 604, message: "User already exist", isShowStackTrace: false },
    USER_DOES_NOT_EXIST: { id: 8, httpCode: 401, message: "User does not exist", isShowStackTrace: false }
}

module.exports = ErrorType;