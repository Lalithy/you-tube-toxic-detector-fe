import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

declare var YT: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  @ViewChild('player') playerContainer!: ElementRef;

  videoId: string = '';
  private player: any;
  private interval: any;

  ngOnInit(): void {
    this.loadYoutubeIframeApi();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
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
    console.log('Pass 1');
    this.videoId = this.extractVideoId(url);

    console.log('this.videoId 1', this.videoId);
    this.initializePlayer();

  }

  private loadYoutubeIframeApi(): void {
    // Create a script element
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.youtube.com/iframe_api';

    // Append the script to the document body
    document.body.appendChild(scriptTag);

    // Define a callback function to initialize the player
    (window as any)['onYouTubeIframeAPIReady'] = () => {
      this.initializePlayer();
    };
  }

  private initializePlayer(): void {
    console.log('this.videoId 2', this.videoId);
    if (this.videoId &&  this.playerContainer) {
      this.player = new YT.Player(this.playerContainer.nativeElement, {
        height: '360',
        width: '640',
        videoId: this.videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          mute: 0,
        },
        events: {
          onReady: () => this.onPlayerReady(),
          onStateChange: (event: any) => this.onPlayerStateChange(event),
        },
      });
    }
  }

  private onPlayerReady(): void {
    if (this.player) {
      this.player.playVideo();
    }
  }

  private onPlayerStateChange(event: any): void {
    if (event.data === YT.PlayerState.PLAYING) {
      this.interval = setInterval(() => {
        if (this.player) {
          const currentTime = this.player.getCurrentTime();
          let mute = false;
          const mutedSegments = [
            [2, 10],
            [12, 20],
            [20, 30],
            [50, 55]
          ];
          for (let i = 0; i < mutedSegments.length; i++) {
            const segment = mutedSegments[i];
            if (currentTime >= segment[0] && currentTime <= segment[1]) {
              mute = true;
              break;
            }
          }
          if (mute) {
            this.player.mute();
          } else {
            this.player.unMute();
          }
        }
      }, 1000);
    }
  }
}
