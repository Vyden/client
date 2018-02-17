import { Course } from './course';

export class UserInfo {
    public UID?: string;
    public fullName: string;
    public courses: Course [];
    public isInstructor: boolean;
}