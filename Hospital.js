module.exports = class Hospital{

    static get HOSPITALS(){
        let HOSPITALS = [
            {
                'Id': 1,
                'Name': 'HealthPartners Bloomington Clinic',
                'Location': 'Bloomington',
                'Zip': 55425
            },
            {
                'Id': 2,
                'Name': 'HealthPartners Bloomington Dental Clinic',
                'Location': 'Bloomington',
                'Zip': 55425
            },
            {
                'Id': 3,
                'Name': 'HealthPartners Eden Prairie Dental Clinic',
                'Location': 'Eden Prairie',
                'Zip': 55344
            },
            {
                'Id': 4,
                'Name': 'Physicians Neck and Back Clinic',
                'Location': 'Edina',
                'Zip': 55435
            }
        ];
        return HOSPITALS;
    }


    constructor(id){
        this.id = id;
        for(var i=0; i<Hospital.HOSPITALS.length; i++ ){
            let tempForm = Hospital.HOSPITALS[i];
            if(id === tempForm['Id']){
                this.name = tempForm['Name'];
                this.location = tempForm['Location'];
                this.zip = tempForm['Zip'];
            }
        }
    }


}