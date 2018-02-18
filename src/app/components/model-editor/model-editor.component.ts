import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.scss']
})
export class ModelEditorComponent implements OnInit {

  @Input() lectureTime: number

  public modelStartTime: number // Start time in seconds
  public modelMM: number
  public modelSS: number
  public modelName: string

  public newModelMode: boolean

  constructor() {
    this.modelMM = 0
    this.modelSS = 0
    this.modelStartTime = 0
  }

  ngOnInit() {
  }

  public initModel() {
    this.newModelMode = true
  }

  public calculateModelTime() {
    this.modelStartTime = Number(this.modelMM) * 60 + Number(this.modelSS)
    console.log(this.modelStartTime);
  }

  public calculateModelTimeSlider($event: any) {
    this.modelStartTime = Number($event.value)
    this.modelMM = Math.floor(this.modelStartTime / 60)
    this.modelSS = this.modelStartTime % 60
  }

  public finishModel() {
    this.newModelMode = false
  }

}
