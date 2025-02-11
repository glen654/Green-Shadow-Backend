export class Log {
    logName: string;
    logDate: Date;
    logImage: string | undefined;
    fieldName: string;
    cropName: string;
    staffMember: string;

    constructor(logName: string, logDate: Date,  logImage: string, fieldName: string, cropName: string, staffMember: string) {
        this.logName = logName;
        this.logDate = logDate;
        this.logImage = logImage;
        this.fieldName = fieldName;
        this.cropName = cropName;
        this.staffMember = staffMember;
    }
}