export class Quiz {
    public id?: string;
    public course: string;
    public question: string;
    public answers: string [];
    public correct: number;
    public time: number;
    public pCorrect?: number;
    public numOfResp?: number;
}