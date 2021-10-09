export interface IUserResponse {
    data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        role?: number
    }
}

export interface IUserArray {
    data: IUserResponse[];
}
