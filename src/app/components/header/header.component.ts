import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { VideoService } from '../../modules/video/services/video.service';
import { VideoCategoryModel } from '../../models/video-category.model';
import { VideoModel } from '../../models/video.model';



export type VideoByCategory = {
  name: string;
  id: string;
  videos: VideoModel[]
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [VideoService]
})
export class HeaderComponent implements OnInit {


  videoCategories: VideoCategoryModel[] = [];
  videoList: VideoModel[] = [];
  videoListByCategory: VideoByCategory[] = [];

  viewMenu: boolean = false;
  viewVideoMenu: boolean = false;

  constructor(private router: Router, private _videoService: VideoService) {
    router.events.subscribe(async e => {

      if (e instanceof NavigationStart) {

      }

      if (e instanceof NavigationEnd) {
        this.viewMenu = false;
        this.viewVideoMenu = false;
      }
    });

    this.getVideoData();
  }

  ngOnInit() {
    this.viewMenu = (window.outerWidth > 992);
  }

  public getVideoData() {
    Promise.all([this._videoService.getAllVideos(), this._videoService.getAllCategories()]).then(
      ([videos, categories]) => {
        this.videoCategories = categories;
        this.videoListByCategory = categories.map(cat => ({
          id: cat.id,
          name: cat.name,
          videos: videos.filter(vid => vid.categories.find(c => c.id == cat.id)).slice(0, 3)
        })
        );
      }
    );
  }

  /**
   * Navigate to play video page and play a video 
   * @param videoId video id
   */
  public viewVideo(ev: MouseEvent, videoId: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this.router.navigate(['video/play', videoId]);
  }

  public toggleMobMenu(ev: MouseEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.viewVideoMenu = !this.viewVideoMenu
  }

  public toggleViewMenu(ev: MouseEvent, menuVisibility: boolean) {
    ev.preventDefault();
    ev.stopPropagation();
    this.viewMenu = menuVisibility;
    if (!this.viewMenu) {
      this.viewVideoMenu = false;
    }
  }
}
