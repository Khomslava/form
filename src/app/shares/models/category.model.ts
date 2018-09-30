export class Category {
    id: string;
    catId: string;
    languageId: string;
    name: string;
    constructor(id, catId, lanuageId, name) {
        this.id = id;
        this.catId = catId;
        this.name = name;
        this.languageId = lanuageId;
    }
}