export class FilterLectureOptions {
  public oldFirst: boolean
  public startDate: Date
  public endDate: Date

  constructor() {
    this.oldFirst = false
    this.startDate = new Date((new Date()).getFullYear() - 1, (new Date()).getMonth(), (new Date()).getDate());
    this.endDate = new Date()
  }
}
