export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface DateFilter {
  year: number;
  month: number;
}

export interface CommentData {
  eventId: string;
  email: string;
  name: string;
  text: string;
}

export interface CommentDataDB {
  _id?: string;
  eventId: string;
  email: string;
  name: string;
  text: string;
}
