//use faker to generate
var faker = require('faker');

// class
UserMockAdm{
  // constructor() {
    this.first_name = faker.Name.firstName();
    this.last_name = faker.Name.lastName();
    this.address = faker.Address.streetAddress();
    this.internet = faker.Internet.email();
    this.usrNm = faker.Internet.userName();
    this.userRole = 'admin';
  // }
}

class UserMockSt() {
  constructor() {
    this.first_name = faker.Name.firstName();
    this.last_name = faker.Name.lastName();
    this.address = faker.Address.streetAddress();
    this.internet = faker.Internet.email();
    this.usrNm = faker.Internet.userName();
    this.userRole = 'student';
  }
}

class Org() {
  constructor() {
    this.name = faker.Company.companyName();
    this.address = faker.Address.streetAddress();
    this.site = faker.Internet.domainName();
  }
}

class Classes() {
  constructor() {
    this.name = faker.Company.companyName();
    this.date = faker.Date.companyName();
  }
}

module.exports = UserMockAdm;
module.exports = UserMockSt;
module.exports = Org;
module.exports = Classes;
