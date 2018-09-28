import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ads/ad.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { Country } from '../../enums/country.enum';
import { AdsModel } from '../../models/ads.model';

@Component({
  selector: 'app-wallpapers',
  templateUrl: './wallpapers.component.html',
  styleUrls: ['./wallpapers.component.css']
})
export class WallpapersComponent implements OnInit {
  adsList: AdsModel[] = [];

  constructor(private _adService: AdService, private router: Router, private _activatedRoute: ActivatedRoute) {

    router.events.subscribe(async e => {


      if (e instanceof NavigationStart) {

      }

      if (e instanceof NavigationEnd) {
        let catId: any = this._activatedRoute.snapshot.paramMap.get('id');
        if (catId) {
          this.getAds(parseInt(catId));
        }
      }
    });

  }

  ngOnInit() {
  }

  private getAds(countryCode: Country) {
    this.adsList = this._adService.getAdsByCountryCode(countryCode);
    let randomAd = Math.floor(Math.random() * this.adsList.length);
    window.open(this.adsList[randomAd].link);

  }

}
