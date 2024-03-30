import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToxicService} from "../../Services/toxic.service";
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {InformationPageComponent} from "../information-page/information-page.component";
import {showErrorMessage, showWarningMessage} from "../../utilz/validation/validation/validation.component";

declare var YT: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  @ViewChild('player') playerContainer!: ElementRef;
  @ViewChild('urlInput', {static: true}) urlInput!: ElementRef;


  videoId: string = '';
  player: any;
  interval: any;
  isLoading: boolean = false;
  timeListObj: any;
  isButtonVisible: boolean = false;
  isWaterMark: boolean = true;

  constructor(private toxicService: ToxicService,
              public dialog: MatDialog) {
  }

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

  async fetchData(videoId: string) {
    try {
      this.timeListObj = await this.getTimeOfToxic(videoId);
      // console.log('Toxic Time: ',this.timeListObj);
      this.initializePlayer();

    } catch (error) {
      showWarningMessage('This video cannot be accessed');
      this.urlInput.nativeElement.value = '';
      this.isLoading = false;
      this.isWaterMark = true;
      this.isButtonVisible = false;
      console.error(error);
    }
  }

  async getTimeOfToxic(videoId: string) {
    return new Promise((resolve, reject) => {
      this.toxicService
        .getToxicTime(videoId)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  // fetchData(videoId: string): void {
  //   this.toxicService.getToxicTime(videoId).subscribe(data => {
  //     console.log('Toxic Time',data);
  //   });
  // }

  setYouTubeValues(url: string) {
    this.isLoading = true;
    this.isWaterMark = false;
    console.log('Pass 1');
    this.videoId = this.extractVideoId(url);

    if (this.videoId) {
      localStorage.setItem('videoId', this.videoId);
      if (this.player) {

        this.player.stopVideo();
        this.player.destroy();
        this.player = null;
      }

      this.fetchData(this.videoId);
    } else {
      this.isLoading = false;
      showWarningMessage('Please Enter Video URL');
    }
  }

  private loadYoutubeIframeApi(): void {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.youtube.com/iframe_api';

    document.body.appendChild(scriptTag);

    (window as any)['onYouTubeIframeAPIReady'] = () => {
      this.initializePlayer();
    };
  }

  private initializePlayer(): void {
    console.log('this.videoId 2', this.videoId);
    if (this.videoId && this.playerContainer && this.timeListObj) {
      this.isLoading = false;
      this.isButtonVisible = true;

      this.player = new YT.Player(this.playerContainer.nativeElement, {
        height: '360',
        width: '640',
        videoId: this.videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          mute: 0,
          rel: 0,
          cc_load_policy: 0,
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
        if (this.player && this.timeListObj && this.timeListObj.muted_segments) {

          const currentTime = this.player.getCurrentTime();
          let mute = false;
          const mutedSegments = this.timeListObj.muted_segments;
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

  openDialog(): void {

    if (this.player) {
      this.player.stopVideo();
    }

    this.dialog.open(InformationPageComponent, {
      width: '800px',
      height: 'auto',
      data: {videoId: this.videoId}
    });
  }

  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.urlInput.nativeElement.value === '') {
      if (this.player) {
        this.player.stopVideo();
        this.player.destroy();
        this.player = null;
        this.isWaterMark = true;
        this.isButtonVisible = false;
      }
    }
  }

}
