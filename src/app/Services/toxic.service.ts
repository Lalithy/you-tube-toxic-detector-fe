import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToxicService {

  constructor(private http: HttpClient) { }

  getToxicTime(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/toxic?video_id=${videoId}`);
  }

  getFalseInformation(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/video_sentiment?video_id=${videoId}`);
  }
}
