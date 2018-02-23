import { Injectable } from '@angular/core'; 
import { CanDeactivate } from '@angular/router';
import { LectureEditorComponent } from '../components/lecture-editor/lecture-editor.component';

@Injectable() 
export class ConfirmDeactivateGuard implements CanDeactivate<LectureEditorComponent> {
     canDeactivate(target: LectureEditorComponent) { 
          if (target.uploadProgress > 0) { 
               return window.confirm('Do you really want to leave this page?'); 
          } 
          return true; 
      } 
}