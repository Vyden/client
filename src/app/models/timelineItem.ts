export enum ItemType {
    MODEL = 'model',
    VIDEO = 'video',
    QUIZ = 'quiz'
}

export class TimelineItem {
    public id?: string;
    public lecture: string;
    public type: ItemType;
    public resource: string;
}