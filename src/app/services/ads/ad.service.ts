import { Injectable } from '@angular/core';
import { AdsModel } from '../../models/ads.model';
import { AdSize } from '../../enums/ad-size.enum';
import { Country } from '../../enums/country.enum';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private adsList: AdsModel[] = [];

  constructor() {
    this.feedAds();
  }

  private feedAds() {
    let ad1 = new AdsModel('assets/images/banner/Ad/Dailyhunt.jpg', 'https://jack.vnative.co/5ba4e63cb6920d3a200af73c ', AdSize.horizontalSmall, Country.india);
   /*  let ad2 = new AdsModel('assets/images/banner/Ad/Paytm.jpg', 'https://jack.vnative.net/5ba4e712b6920d3a200af74a', AdSize.horizontalSmall, Country.india); */
    let ad2 = new AdsModel('assets/images/banner/Ad/Dailyhunt.jpg', 'https://jack.vnative.co/5ba4e63cb6920d3a200af73c ', AdSize.horizontalSmall, Country.india);
    // this.adsList.push(...[ad1, ad2]);
  }

  public getAllAds(): AdsModel[] {
    return this.adsList;
  }

  public getAdsBySize(adsize: AdSize) {
    return this.adsList.filter(ads => { return ads.adSize == adsize })
  }

  public getAdsByCountryCode(countryCode: Country) {
    return this.adsList.filter(ads => { return ads.country == countryCode })
  }
}
