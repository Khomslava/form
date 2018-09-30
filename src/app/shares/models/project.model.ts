export class Project {
    id: string;
    translate: TranslateProject[];
    order: number;
    categoryId: [number];
    year: number;
    square: number;
    photosLarge: Photo[];
    photosMobile: Photo[];
    photos: Photo[];
    awardLinks: string[];
    showInMainPages: boolean;

    constructor(id,
        translate,
        order,
        categoryId,
        year,
        square,
        photosLarge,
        photosMobile,
        photos,
        awardLinks,
        showInMainPages ) {
        this.id = id;
        this.translate = translate;
        this.order = order;
        this.categoryId = categoryId;
        this.year = year;
        this.square = square;
        this.photosLarge = photosLarge;
        this.photosMobile = photosMobile;
        this.photos = photos;
        this.awardLinks = awardLinks;
        this.showInMainPages = showInMainPages;
    }
}

export class TranslateProject {
    id: string;
    languageId: string;
    name: string;
    description: string;
    city: string;
    country: string;

    constructor(id,
        languageId,
        name,
        description,
        city,
        country) {
        this.id = id;
        this.languageId = languageId;
        this.name = name;
        this.description = description;
        this.city = city;
        this.country = country;
    }
}

export class Photo {
    id: string;
    url: string;
    order: string;
    showOnMainPage: boolean;
    constructor(id,
        url,
        order,
        showOnMainPage ) {
        this.id = id;
        this.url = url;
        this.order = order;
        this.showOnMainPage = showOnMainPage ;
        }
}
