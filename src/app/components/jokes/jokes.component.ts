import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ads/ad.service';
import { Country } from '../../enums/country.enum';
import { Router, NavigationStart, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AdsModel } from '../../models/ads.model';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  public adsList: AdsModel[] = [];
  public countryCode: Country;
  public userClicked: boolean = true;
  constructor(private _adService: AdService, private router: Router, private _activatedRoute: ActivatedRoute) {

    router.events.subscribe(async e => {


      if (e instanceof NavigationStart) {

      }

      if (e instanceof NavigationEnd) {
        let catId: any = this._activatedRoute.snapshot.paramMap.get('id');
        if (catId) {
          this.countryCode = parseInt(catId);
          this.getAds(this.countryCode);
        }
      }
    });

  }

  ngOnInit() {
  }

  private getAds(countryCode: Country) {

    this.adsList = this._adService.getAdsByCountryCode(countryCode);


  }

  public openAds() {

    if (this.adsList && this.adsList.length > 0) {

      let randomAd = Math.floor(Math.random() * this.adsList.length);

      setTimeout(() => {

        let win = window.open(this.adsList[randomAd].link);
      }, 1000);

      
    }
    this.userClicked = true;
  }


}
