import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClassesService } from '../../services/classes/classes.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';
import { QuizResponse } from '../../models/quizResponse';

@Injectable()
export class QuizzesService {

  constructor(private _firebase: AngularFireDatabase) {}
}