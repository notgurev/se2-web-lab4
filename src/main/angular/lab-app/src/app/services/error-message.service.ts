import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  any(errorMessage: string): string | null {
    return this.authentication(errorMessage) ?? this.authorization(errorMessage)
      ?? this.values(errorMessage) ?? this.other(errorMessage);
  }


  // Errors related to authentication problems (user exists, wrong password, etc)
  authentication(errorMessage: string): string | null {
    switch (errorMessage) {
      case 'USERNAME_TOO_SHORT':
        return 'Username is too short';
      case 'USERNAME_TOO_LONG':
        return 'Username is too long';
      case 'PASSWORD_TOO_SHORT':
        return 'Password is too short';
      case 'WRONG_PASSWORD':
        return 'Wrong password';
      case 'USER_NOT_FOUND':
        return 'User not found';
      case 'USER_ALREADY_EXISTS':
        return 'User already exists';
      case 'MISSING_CREDENTIALS':
        return 'Missing credentials';
      case 'USERNAME_MUST_NOT_BE_NULL_OR_EMPTY':
        return 'Username must not be null or empty';
      case 'PASSWORD_MUST_NOT_BE_NULL_OR_EMPTY':
        return 'Password must not be null or empty';
      default:
        return null;
    }
  }

  // Connection, etc
  other(errorMessage: string): string | null {
    return null;
  }

  get unknown(): string {
    return 'Unknown error';
  }

  // Errors related to authorization problems (wrong token, etc)
  authorization(errorMessage: string): string | null {
    switch (errorMessage) {
      case 'MISSING_AUTHORIZATION_TOKEN':
        return 'Missing authorization token';
      case 'INVALID_TOKEN':
        return 'Invalid token';
      default:
        return null;
    }
  }

  // Errors related to incorrect values
  values(errorMessage: string): string | null {
    switch (errorMessage) {
      // X
      case 'X_VALUE_NOT_ALLOWED':
        return 'Allowed X values are {-5, -4, -3, -2, -1, 0, 1, 2, 3}';
      case 'X_MUST_NOT_BE_NULL_OR_EMPTY':
        return 'X must not be null';
      // Y
      case 'Y_VALUE_NOT_ALLOWED':
        return 'Y must be in range (-5 ... 5)';
      case 'Y_MUST_NOT_BE_NULL_OR_EMPTY':
        return 'Y must not be null';
      // R
      case 'R_VALUE_NOT_ALLOWED':
        return 'Allowed R values are {0, 1, 2, 3}';
      case 'R_MUST_NOT_BE_NULL_OR_EMPTY':
        return 'R must not be null';
      default:
        return null;
    }
  }
}
