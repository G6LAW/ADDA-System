class Person {
    constructor (name, lastName, dob, email, telephone) {
        this.name = name;
        this.lastName = lastName;
        this.dayOfBirth = dob;
        this.email = email;
        this.telephone = telephone;
    };
    //methods:
    signo() {};
};

class Social extends Person {
    constructor (insta,face,twitt) {
        this.instagram = insta;
        this.facebook = face;
        this.twitter = twitt;
    };
    picture() {};
};

class Professional extends Person {
    constructor (vulgo, area, website, spotfy, soundcloud, behance, linkedin, youtube, tiktok) {
        this.vulgo = vulgo;
        this.area = area;
        this.website = website;
        this.spotfy = spotfy;
        this.soundcloud = soundcloud;
        this.behance = behance;
        this.linkedin = linkedin;
        this.youtube = youtube;
        this.tiktok = tiktok;
    };
};