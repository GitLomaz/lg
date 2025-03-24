import { HttpException, HttpStatus } from '@nestjs/common';

const RESPONSE_CODES = {
  USERNAME_TAKEN: { code: 'USERNAME_TAKEN', message: 'Username is taken', success: false },
  EMAIL_TAKEN: { code: 'EMAIL_TAKEN', message: 'Email Address is in use already', success: false },

  ACCOUNT_REGISTERED: { code: 'ACCOUNT_REGISTERED', message: 'Account Created', success: true }
}

export interface APIResponse {
  code: string;
  data: string;
  success: boolean;
}

export function generateServerResponse(code: string, data?: any): APIResponse {
  if (!RESPONSE_CODES[code]) {
    throw new HttpException('Invalid response code', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  return {
    code: RESPONSE_CODES[code].code,
    data: data !== undefined ? data : RESPONSE_CODES[code].message,
    success: RESPONSE_CODES[code].success,
  };
}