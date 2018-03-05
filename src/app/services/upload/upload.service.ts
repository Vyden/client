import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';

@Injectable()
export class UploadService {

  private uploadUrl: string = 'http://indy.science/uploadVideo'
  // private uploadUrl: string = 'http://localhost:5000/upload'

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

    const req = new HttpRequest('POST', this.uploadUrl, formData, options);

    return this._httpClient.request(req)
  }

}
