import { AdSize } from "../enums/ad-size.enum";
import { Country } from "../enums/country.enum";

export class AdsModel {
    constructor(
        public path: string,
        public link: string,
        public adSize: AdSize,
        public country: Country
    ) {

    }
}