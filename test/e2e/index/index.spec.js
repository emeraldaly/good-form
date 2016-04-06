"use strict";
describe("the application", function(){
  // var UserMockAdm = require('../mocks/user.mock.js');
  // var UserMockSt = require('../mocks/user.mock.js');
  // var Org = require('../mocks/user.mock.js');
  // var Classes = require('../mocks/user.mock.js');

  it("should allow a new user to register their name and organization", function(){
    browser.ignoreSynchronization = true;

    var orgNm = element(by.model("organizationName"));
    var address = element(by.model("address"));
    var site = element(by.model("website"));
    var usrFNm = element(by.model("userFirstName"));
    var usrLNm = element(by.model("userLastName"));
    var email = element(by.model("userEmail"));
    var pass = element(by.model("userPassword"));
    browser.get('/#/register');

    expect(browser.getCurrentUrl()).toMatch("\/#/register$");

    orgNm.sendKeys("organization");
    address.sendKeys("10 main street");
    site.sendKeys("http://www.google.com");
    usrFNm.sendKeys("John");
    usrLNm.sendKeys("Smith");
    email.sendKeys("test@gmail.com");
    pass.sendKeys("pass");

    element(by.css('[ng-click="register()"]')).click();

    expect(browser.getCurrentUrl()).toMatch("\/#/home$");
  });

  it("should allow a registered user to login", function(){
    browser.ignoreSynchronization = true;
    browser.get('/#/splash');
    var username = element(by.model("userEmail"));
    var passW = element(by.model("userPassword"));
    var btnSubmit = element(by.css('[ng-click="login()"]'));

    username.sendKeys('Wrongtest@gmail.com');
    passW.sendKeys('not');
    btnSubmit.click();
    //User will be redirected to main page
    expect(browser.getCurrentUrl()).toMatch("\/#/home$");
  });

  it("should allow a registered user to add a class", function(){
    browser.ignoreSynchronization = true;
    browser.get('/#/class');
    var createButton = element(by.css('[ui-sref="createClass"]'));
    var nameInput = element(by.model("name"));
    var dateInput = element(by.model("datetime"));
    createButton.click();
    //User will be redirected to create class page
    expect(browser.getCurrentUrl()).toMatch("\/#/createClass$");
  });

  it("should allow a registered user to edit a class", function(){
    browser.ignoreSynchronization = true;
    browser.get('/#/class');
    var editButton = element(by.css('[ui-sref="showClasses"]'));

    editButton.click();
    //User will be redirected to show class page
    expect(browser.getCurrentUrl()).toMatch("\/#/showClasses$");
  });

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

  // it("should allow a student to submit homework", function(){

  // });
});
