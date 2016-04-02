describe("the application", function(){
  it("should allow a new user to register their name and organization", function(){
    browser.ignoreSynchronization = true;
    var text = "Sign Up";
    browser.get('/#/register');

    expect(element(by.css(".panel-heading h3")).getText()).toEqual(text);
  });

  it("should allow a registered user to login", function(){
    browser.ignoreSynchronization = true;
    browser.get('/#/home');
    var username = element(by.css('[name="username"]'));
    var pass = element(by.css('[name="password"]'));
    var btnSubmit = element(by.css('[class="btn btn-info"]'));

    username.sendKeys('jw@rutgers.edu');
    pass.sendKeys('not');
    btnSubmit.click();
    //User will be redirected to main page
    expect(page to redirect.getText()).toEqual("text");
  });

  it("should allow a registered user to add a class", function(){

  });
});
