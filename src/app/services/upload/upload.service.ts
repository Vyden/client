import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable()
export class UploadService {

  constructor(private _httpClient: HttpClient) { }

  public uploadVideoFile(videoFile: File) {
    console.log(videoFile);
    let params = new HttpParams();

    let formData = new FormData();
    formData.append('upload', videoFile)

    const options = {
      // headers: new HttpHeaders().set('Authorization', this.loopBackAuth.accessTokenId),
      params: params,
      reportProgress: true,
      // withCredentials: true,
    }

    const req = new HttpRequest('POST', 'http://localhost:5000/upload', formData, options);

    this._httpClient.request(req)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      })
  }

}
