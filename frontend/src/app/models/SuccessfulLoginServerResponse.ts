import { UserDetails } from "./UserDetails";

export class SuccessfulLoginServerResponse {
    public constructor(
        public token: string,
        public userDetails: UserDetails
    ) { }

}