<<<<<<<<< Temporary merge branch 1
=========
/**
 * Standardized API Response structure
 */
>>>>>>>>> Temporary merge branch 2
export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
