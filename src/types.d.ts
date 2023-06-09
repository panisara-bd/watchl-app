declare module 'aws-amplify' {
  export class Auth {
    static signUp(
      data: any
    ): Promise <import('amazon-cognito-identity-js').ISignUpResult>;
    static resendSignUp(username: string): any;
    static confirmSignUp(username: string, code: string): any;
    static signIn(username: string, password: string): any;
    static currentAuthenticatedUser(): any;
    static currentSession(): any;
    static signOut(): any;
    static federatedSignIn(data: any): any;
  }
  export class Hub {
    static listen(
    data: any,
    callback: ({payload: any}) => void
    ): any;
  }

  export class Amplify {
    static configure(config: any): any;
  }
}

declare module 'aws-amplify-react-native' {
  export function withOAuth(params: any): any;
}
declare module 'expo-router/entry' {}