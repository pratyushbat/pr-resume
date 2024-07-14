export interface User{
    onboarding:number;
    verified:string;
    last_active:string;
    email:string;
    password:string;
    name:string;
    experience_level:string;
    job_category:string;
}

export interface UserRes{
    token:string;
    user:User;

}