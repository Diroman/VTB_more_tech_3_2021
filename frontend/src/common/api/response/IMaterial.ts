export interface IMaterial {
    data: {
        id?: number | string;
        title: string;
        link?: string;
        file?: string;
        text?: string;
    }
}

export interface IMaterialArray {
    data: IMaterial[]
}
