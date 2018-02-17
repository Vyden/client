import { Course } from './course';
import { TimelineItem } from './timelineItem';

export class Lecture {
    public _id?: string;
    public course: Course;
    public title: string;
    public timeline: TimelineItem [];
    public date: Date;
    public sky: string;
}