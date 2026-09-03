<<<<<<< HEAD
=======
/**
 * Standardized API Response structure
 */
>>>>>>> b7782a51ab4547fa45f528ac0894c3b7bd6d4e53
export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
