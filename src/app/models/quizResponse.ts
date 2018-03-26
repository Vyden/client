export class QuizResponse {
    public id?: string;
    public correct?: boolean;
    public user: string;
    public course: string;
    public date: Date;
    public lecture: string;
    public quiz: string;
    public selection: number;
    public quizObj?: Object;
}