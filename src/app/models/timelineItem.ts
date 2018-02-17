import { Lecture } from './lecture';

enum ItemType {
    MODEL = 'model',
    VIDEO = 'video',
    QUIZ = 'quiz'
}

export class TimelineItem {
    public id?: string;
    public lecture: Lecture;
    public type: ItemType;
    public resource: string;
}