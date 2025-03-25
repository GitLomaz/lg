import { HttpException, HttpStatus } from '@nestjs/common';

const RESPONSE_CODES = {
  USERNAME_TAKEN: { code: 'USERNAME_TAKEN', message: 'Username is taken', success: false },
  EMAIL_TAKEN: { code: 'EMAIL_TAKEN', message: 'Email Address is in use already', success: false },
  LOGIN_FAILED: { code: 'LOGIN_FAILED', message: 'Login or Password incorrect', success: false },
  ACCOUNT_UNVERIFIED: { code: 'ACCOUNT_UNVERIFIED', message: 'Please check your email to verify your account', success: false },
  INVALID_TOKEN: { code: 'INVALID_TOKEN', message: 'Invalid or Expired Token', success: false },
  ACCESS_FORBIDDEN: { code: 'ACCESS_FORBIDDEN', message: 'You must be logged in to do this', success: false },

  ACCOUNT_REGISTERED: { code: 'ACCOUNT_REGISTERED', message: 'Account Created', success: true },
  ACCOUNT_VERIFIED: { code: 'ACCOUNT_VERIFIED', message: 'Account Verified, You can now log in!', success: true }
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