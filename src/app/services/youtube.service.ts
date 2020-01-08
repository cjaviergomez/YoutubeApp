import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyCGA3JonXMq-JVGv-akfirkucv84Ckb8fA';
  private playListID = 'UUaHEdZtk6k7SVP-umnzifmQ';
  private nextPageToken = '';

  constructor(public http: HttpClient) { }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;
    let params = new HttpParams();

    params = params.append('part', 'snippet');
    params = params.append('maxResults', '10');
    params = params.append('playlistId', this.playListID);
    params = params.append('key', this.apiKey);

    if (this.nextPageToken) {
      params = params.append('pageToken', this.nextPageToken);
    }

    return this.http.get( url, { params } )
          .pipe(map( (resp: any) => {
            this.nextPageToken = resp.nextPageToken;

            let videos: any[] = [];
            for (const video of resp.items) {
              let snippet = video.snippet;
              videos.push( snippet );
            }
            return videos;
          }));
  }
}
