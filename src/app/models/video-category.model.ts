export class VideoCategoryModel {
    /**
     * Name of the Category
     */
    public name: string = '';
    /**
     * Id of the Category
     */
    public id: string = '';

    /**
     * Child category array
     */
    public categories: Array<VideoCategoryModel> = [];

    constructor(Name: string, Id: string, Categories?: Array<VideoCategoryModel>) {
        this.id = Id;
        this.name = Name;
        if (Categories && Categories.length > 0) {
            this.categories = Categories;
        }
    }
}