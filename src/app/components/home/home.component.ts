import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VideoModel } from "../../models/video.model";
import { VideoCategoryModel } from '../../models/video-category.model';
import { VideoService } from "../../modules/video/services/video.service";
import { Router } from '@angular/router';
import { AdService } from '../../services/ads/ad.service';
import { AdSize } from '../../enums/ad-size.enum';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('imgSlider', { read: ElementRef }) imgSlider: ElementRef;
  @ViewChild('bannerBtnWrap', { read: ElementRef }) bannerBtnWrap: ElementRef;


  selectedSlide: string = '';

  LatestVideos: VideoModel[] = [];
  mostLikedVideos: VideoModel[] = [];
  allVideos: VideoModel[] = [];
  videoCategoryList: VideoCategoryModel[];
  selectedCatTab: string = 'all';
  constructor(private _videoService: VideoService, private _router: Router, private _adService: AdService) {
    this.feedVideos();
   
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  private showSlide(targetSlideIndex: string) {
    this.selectedSlide = this.LatestVideos[targetSlideIndex].id;
    this.scrollBannerBtnBar(parseInt(targetSlideIndex))
  }

  private bannerSwipeLeft(slideindex: number): void {
    let targetSlideIndex: number = 0;
    if (slideindex >= (this.LatestVideos.length - 1)) {
      targetSlideIndex = 0;
    }
    else {
      targetSlideIndex = slideindex + 1;
    }
    this.showSlide(targetSlideIndex.toString());
  }

  private bannerSwipeRight(slideindex: number): void {
    let targetSlideIndex: number = 0;
    if (slideindex <= 0) {
      targetSlideIndex = this.LatestVideos.length - 1;
    }
    else {
      targetSlideIndex = slideindex - 1;
    }
    this.showSlide(targetSlideIndex.toString());
  }

  public bannerNextPrev(ev, nextOrPrev: string) {


    let vdoLength = this.LatestVideos.length
    for (let i = 0; i < vdoLength; i++) {
      if (this.LatestVideos[i].id == this.selectedSlide) {
        if (nextOrPrev == 'next') {
          this.bannerSwipeLeft(i);
        }
        else {
          this.bannerSwipeRight(i);
        }
        break;
      }
    }
  }

  public playVideo(ev: MouseEvent, videoId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this._router.navigate(['video/play', videoId]);
  }

  private async scrollBannerBtnBar(targetSlideIndex: number) {
    let bannerBtnWrapDiv: HTMLDivElement = this.bannerBtnWrap.nativeElement;
    let bannerBtnDiv = <HTMLDivElement>bannerBtnWrapDiv.firstElementChild;
    let sliderBtnWidth: number = bannerBtnDiv && bannerBtnDiv.offsetWidth || 300;
    let scrollLength: number = sliderBtnWidth * targetSlideIndex;
    bannerBtnWrapDiv.scroll({ left: scrollLength, behavior: 'smooth' });
  }

  private feedVideos() {

    this._videoService.getAllVideos().then(vidList => {
      this.LatestVideos = vidList.slice(0, 6);
      this.selectedSlide = vidList[0].id;
      this.allVideos = vidList.slice();
      this.mostLikedVideos = vidList.sort((v1, v2) => v1.likesCount - v2.likesCount).slice(0, 9);
    });

    this._videoService.getAllCategories().then(catList => {
      this.videoCategoryList = catList;
    });
  }

  public imgSlide(slideTo: string) {
    let slider: HTMLDivElement = this.imgSlider.nativeElement;
    let scrollLength: number = 0;
    if (slideTo == 'left') {
      scrollLength = slider.scrollLeft + slider.clientWidth;
      if (scrollLength >= slider.scrollWidth) {
        scrollLength = 0;
      }
    }
    else {
      scrollLength = slider.scrollLeft - slider.clientWidth;
      if (slider.scrollLeft <= 0) {
        scrollLength = slider.scrollWidth;
      }
    }
    slider.scroll({ left: scrollLength, behavior: 'smooth' });
  }

  public showCat(ev: MouseEvent, catId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this.selectedCatTab = catId;
    if (catId == 'all') {
      this.allVideos.forEach(lv => lv.hidden = false);
    }
    else {
      this.allVideos.forEach(lv => lv.hidden = lv.categories.find(lvc => lvc.id == catId) ? false : true);
    }
  }

  

}
