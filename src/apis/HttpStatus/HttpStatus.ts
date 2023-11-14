interface HttpStatus {
  BAD_REQUEST: number;

  UNAUTHORIZED: number;

  FORBIDEN: number;

  NOT_FOUND: number;

  INTERNAL_SERVER_ERROR: number;

  TIME_OUT: number;
}

export const HTTP_STATUS: HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  TIME_OUT: 503,
};
