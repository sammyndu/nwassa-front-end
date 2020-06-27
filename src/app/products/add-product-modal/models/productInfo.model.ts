export class ProductInfo {
    constructor(
        public id?: string,
        public title?: string,
        public description?: string,
        public price?: number,
        public location?: string,
        public duration?: number,
        public roi?: number,
        public numberOfUnits?: number,
        public sizeofFarm?: number,
        public productPhoto?: string,
        public owner?: string,
        public dateCreated?: Date
    ) {}

    public fromdto(dto: any) {
        this.id = dto.id;
        this.title = dto.title;
        this.description = dto.description;
        this.price = dto.price;
        this.location = dto.location;
        this.duration = dto.duration;
        this.roi = dto.roi;
        this.numberOfUnits = dto.nummberOfUnits;
        this.sizeofFarm = dto.sizeofFarm;
        this.productPhoto = dto.productPhoto;
        this.owner = dto.owner;
        this.dateCreated = dto.dateCreated;
    }
}
