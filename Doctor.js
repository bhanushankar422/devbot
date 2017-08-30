export default class Doctor{
    id = 0;
    name = 'NOT_SELECTED';
    speciality = 'NOT_SELECTED';
    gender = 'NOT_SELECTED';
    hospital = 0;
    image = 'NOT_SELECTED';

    static DOCTORS = [
        {
            'Id': 1,
            'Name': 'Darrell G. Boychuk, DDS',
            'Speciality': 'TMD',
            'Gender': 'Male',
            'Hospital': 3,
            'image': 'https://www.healthpartners.com/locator/photos/mini/boychuk_darrell_g_dds.jpg'
        },
        {
            'Id': 2,
            'Name': 'David R. Louis, DDS',
            'Speciality': 'General Dentistry',
            'Gender': 'Male',
            'Hospital': 3,
            'image': 'https://www.healthpartners.com/locator/photos/mini/louis_david_r_dds.jpg'
        },
        {
            'Id': 3,
            'Name': 'Pamela J. Becker, PT',
            'Speciality': 'Physical Therapy',
            'Gender': 'Female',
            'Hospital': 4,
            'image': 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png'
        },
        {
            'Id': 4,
            'Name': 'Jose A. Alba Hernandez, PT',
            'Speciality': 'Physical Therapy',
            'Gender': 'Male',
            'Hospital': 4,
            'image': 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png'
        },
        {
            'Id': 5,
            'Name': 'Katherine Louise Anglin, MD',
            'Speciality': 'Family Medicine',
            'Gender': 'Female',
            'Hospital': 4,
            'image': 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png'
        },
        {
            'Id': 6,
            'Name': 'Ayman Ali, MD',
            'Speciality': 'Family Medicine',
            'Gender': 'Male',
            'Hospital': 1,
            'image': 'https://www.healthpartners.com/locator/photos/mini/ali_ayman_md.jpg'
        },
        {
            'Id': 7,
            'Name': 'Frank E. Banfield, MD',
            'Speciality': 'Pediatrics',
            'Gender': 'Male',
            'Hospital': 1,
            'image': 'https://www.healthpartners.com/ucm/groups/public/@hp/@public/documents/images/dev_068842.png'
        },
        {
            'Id': 8,
            'Name': 'Sara M. Blackburn, MD',
            'Speciality': 'Pediatrics',
            'Gender': 'Female',
            'Hospital': 1,
            'image': 'https://www.healthpartners.com/locator/photos/mini/blackburn_sara_m_md.jpg'
        },
        {
            'Id': 9,
            'Name': 'Gerald A. Brost, DDS',
            'Speciality': 'General Dentistry',
            'Gender': 'Male',
            'Hospital': 2,
            'image': 'https://www.healthpartners.com/locator/photos/mini/brost_gerald_a_dds..jpg'
        },
        {
            'Id': 10,
            'Name': 'Stephen S. Clifford, DDS',
            'Speciality': 'Orthodontics',
            'Gender': 'Male',
            'Hospital': 2,
            'image': 'https://www.healthpartners.com/locator/photos/mini/clifford_stephen_s_dds.jpg'
        }
    ];

    constructor(id){
        this.id = id;
        for(var i=0; i<Doctor.DOCTORS.length; i++ ){
            let tempForm = Doctor.DOCTORS[i];
            if(id === tempForm['Id']){
                this.name = tempForm['Name'];
                this.speciality = tempForm['Speciality'];
                this.gender = tempForm['Gender'];
                this.hospital = tempForm['Hospital'];
                this.image = tempForm['image'];
            }
        }
    }

}