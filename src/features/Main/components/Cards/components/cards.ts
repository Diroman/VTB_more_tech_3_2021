export interface IMetric {
    id: number;
    name: string;
}

export interface IDescription {
    url?: string;
    label?: string;
    description?: string;
    username?: string;
}


export interface IOwner {
    type: string;
    username: string;
    urn: string;
    email?: string;
}

export interface ICard {
    urn: number;
    type: string;
    name: string;
    owners?: IOwner[];
    metrics?: IMetric[];
    rating?: number;
    description: IDescription[];
}

export const cardsInfo = [
    {
        urn: 0,
        type: '',
        name: 'demo_pipeline.public.all_entities',
        owner: 'Snowflake',
        metrics: [
            {
                id: 0,
                name: 'Data',
            },
            {
                id: 1,
                name : 'Public',
            }
        ],
        rating: 4.0,
    },
    {
        urn: 1,
        type: '',
        name: 'demo_pipeline.public.all_entities',
        owner: 'Snowflake',
        metrics: [
            {
                id: 0,
                name: 'Data',
            },
            {
                id: 1,
                name : 'Public',
            }
        ],
        rating: 2.5,
    },
    {
        urn: 3,
        type: '',
        name: 'demo_pipeline.public.all_entities',
        owner: 'Snowflake',
        metrics: [
            {
                id: 0,
                name: 'Data',
            },
            {
                id: 1,
                name : 'Public',
            }
        ],
        rating: 3.5,
    },
]
