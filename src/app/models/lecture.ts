// export class Lecture {
//     public id?: string;
//     public course: string;
//     public title: string;
//     public timeline: string [];
//     public date: Date;
//     public sky: string;
// }


export enum ItemType {
    MODEL = 'model',
    VIDEO = 'video',
    QUIZ = 'quiz'
}

export class Lecture {
    public id?: string;
    public name: string;
    public lecture: string;
    public eventTime: number;
    public type: ItemType;
    public resource: string;
}