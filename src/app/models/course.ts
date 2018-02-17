import { Lecture } from './lecture';
import { Announcement } from './announcement';
import { QuizResponse } from './quizResponse';

export class Course {
    public _id?: string;
    public instructor: string;
    public title: string;
    public students: string [];
    public lectures: Lecture [];
    public studentQuizResponses: QuizResponse [];
    public lectureQuizResponses: QuizResponse [];
}