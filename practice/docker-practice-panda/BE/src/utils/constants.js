export default class CONSTANTS {
  static MESSAGES = Object.freeze({
    NOID: 'Cannot find given id.',
    IDFORMAT: 'Invalid id format.',
  });
  static HTTP_STATUS = Object.freeze({
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  });
}
