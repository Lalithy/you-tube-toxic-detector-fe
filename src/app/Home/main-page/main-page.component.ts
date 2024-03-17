import {Component} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  videoId: string = '';

  ngOnInit() {
    const scripTag = document.createElement('script')
    scripTag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(scripTag);
  }

  extractVideoId(url: string): string {

    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    const match = url.match(regex);

    if (match) {
      return match[1];
    } else {

      return '';
    }
  }

  setYouTubeValues(url: string) {
    this.videoId = this.extractVideoId(url);
  }
}
