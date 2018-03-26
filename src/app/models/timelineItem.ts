export enum ItemType {
    MODEL = 'model',
    VIDEO = 'video',
    QUIZ = 'quiz',
    AUDIO = 'audio'
}

export class TimelineItem {
    public id?: string;
    public name: string;
    public lecture: string;
    public eventTime: number;
    public type: ItemType;
    public resource: string;
}