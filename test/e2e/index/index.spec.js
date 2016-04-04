var UserMockAdm = require('../mocks/user.mock.js');
var UserMockSt = require('../mocks/user.mock.js');
var Org = require('../mocks/user.mock.js');
var Classes = require('../mocks/user.mock.js');

describe("the application", function(){
  it("should allow a new user to register their name and organization", function(){
    browser.ignoreSynchronization = true;
    var orgNm = element(by.model("organizationName"));
    var address = element(by.model("address"));
    var site = element(by.model("website"));
    var usrFNm = element(by.model("userFirstName"));
    var usrLNm = element(by.model("userLastName"));
    var email = element(by.model("userEmail"));
    browser.get('/#/register');

    orgNm.sendKeys(Faker.Name.findName());
    address.sendKeys("30 rock");
    site.sendKeys("www.test.com");
    usrFNm.sendKeys("Joe");
    usrLNm.sendKeys("Schmoe");
    email.sendKeys("Schmoe@joe.com");

    expect(orgNm).getText()).toEqual('');
  });

  // it("should allow a registered user to login", function(){
  //   browser.ignoreSynchronization = true;
  //   browser.get('/#/home');
  //   var username = element(by.css('[name="username"]'));
  //   var pass = element(by.css('[name="password"]'));
  //   var btnSubmit = element(by.css('[class="btn btn-info"]'));

  //   username.sendKeys('jw@rutgers.edu');
  //   pass.sendKeys('not');
  //   btnSubmit.click();
  //   //User will be redirected to main page
  //   expect(page to redirect.getText()).toEqual("text");
  // });

  // it("should allow a registered user to add a class", function(){

  // });

  it("should allow a registered user to post a message in chat", function(){
    browser.get('/#/chat');
    var msg = element(by.css('#chatInput'));
    var btnSubmit = element(by.css('[class="btn btn-success"]'));
    var last = element.all(by.css('.msgList li')).last();
    var msgIn = 'my new message';

    msg.sendKeys(msgIn);
    btnSubmit.click();
    //msg should become li item w/username in place of St:
    expect(last.getText()).toEqual("St: " + msgIn);
  });

  // it("should allow an admin to post an announcement", function(){

  // });
});
