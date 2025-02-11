export class Field {
    fieldName : string;
    location : string;
    extentSize: number;
    fieldImage : string | undefined;

    constructor(fieldName: string, location: string, extentSize: number, fieldImage: string) {
        this.fieldName = fieldName;
        this.location = location;
        this.extentSize = extentSize;
        this.fieldImage = fieldImage;
    }
}