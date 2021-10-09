interface ICompanies {
  data: string[];
}

export interface IEventArray {
  data: IEvent[];
}

export interface IEvent {
  data: {
    id: number;
    title: string;
    body: string;
    image: string;
    date: string;
    place: string;
    duration: string;
    timeStart: string;
    timeEnd: string;
    translationLink: string;
    form: string;
    eventType: string;
    price: string;
    contacts: string;
    contactPhone: string;
    hashtag: {
      data: string[];
    };
    speakers: {
      data: string[];
    };
    companies: {
      data: string[];
    };
    youtubeLink: string;
    memberCount: number;
  }
}
