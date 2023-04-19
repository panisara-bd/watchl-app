declare module 'aws-amplify' {
  export class Auth {
    static signUp(
      data: any
    ): Promise <import('amazon-cognito-identity-js').ISignUpResult>;
    static resendSignUp(username: string): any;
    static confirmSignUp(username: string, code: string): any;
    static signIn(username: string, password: string): any;
    static currentAuthenticatedUser(): any;
    static signOut(): any;
  }
  export class Hub {
    static listen(
    data: any,
    callback: ({payload: any}) => void
    ): import('amazon-cognito-identity-js').CognitoUser;
  }

  export class Amplify {
    static configure(config: any): any;
  }
}

declare module 'expo-router/entry' {}