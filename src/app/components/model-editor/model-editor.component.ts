import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { v4 as uuid } from 'uuid';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from '../../services/upload/upload.service';

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

  /* Dropzone data */
  public showDropBox: boolean
  public dropzoneActive: boolean
  public videoActive: boolean
  public showUploadProgress: boolean
  public uploadProgress: number
  public videoName: string

  constructor(private _uploadService: UploadService) {
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

  public onUpload($event: any) {
    if ($event.srcElement.files.length) {
      this.handleDrop($event.srcElement.files)
    }
  }

  public handleDrop(fileList: FileList) {
    // Create lecture object

    this.uploadProgress = 0
    this.videoActive = false
    this.showUploadProgress = true
    this.showDropBox = false
    this.videoName = fileList[0].name

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    const videoFile: File = new File([blob], uuid(), { type: fileList[0].type })
    console.log(videoFile.type);

    console.log(videoFile)

    this._uploadService.uploadModelFile(videoFile)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadProgress = percentDone
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          this.showUploadProgress = false

          console.log('File is completely uploaded!');

          this.showDropBox = false
          this.videoActive = true
          let vid = document.createElement('video');
          const fileURL = URL.createObjectURL(videoFile);
          vid.src = fileURL;
          // this._lectureEditorService.publishTimelineItem(videoItem)
        }
      })
  }

}
