export class UserAuthObject{
    public constructor(
        public isLoggedIn: boolean,
        public isAdmin: boolean,
        public isGuest: boolean
    ){
    }
}