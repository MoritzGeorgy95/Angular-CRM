export class User {
    firstName:string; 
    lastName:string;
    birthdate:number;
    adress:string;
    zipcode:number;
    city:string;

    constructor(obj?: any) {
        this.firstName= obj.firstName;
        this.lastName= obj.lastName;
        this.birthdate= obj.birthdate;
        this.adress= obj.adress;
        this.zipcode= obj.zipcode;
        this.city= obj.city;
    }
}