
export class AuthUtils {

    constructor() {
        
    }
    private  static  authToken='auth_token';

    static getAuthToken(){
    return localStorage.getItem(AuthUtils.authToken)
    }
    static  setAuthToken(value:string){
      localStorage.setItem(AuthUtils.authToken,value)
    }  
    static removeAuthToken(){
      localStorage.removeItem(AuthUtils.authToken)
    }

    
}