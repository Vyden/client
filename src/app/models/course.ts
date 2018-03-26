export class Course {
  public id?: string;
  public mean?: string;
  public sd?: string;
  public instructor: string;
  public title: string;
  public students: string [];
  public lectures: string [];
  public announcements?: string [];
  public studentQuizResponses: string [];
  public lectureQuizResponses: string [];
}