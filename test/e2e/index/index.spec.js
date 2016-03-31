describe("the application Homepage", function(){
  it("should have an h1 tag", function(){
    browser.ignoreSynchronization = true;
    var text = "GOOD FORM";
    browser.get('/');

    expect(element(by.css(".goodtitle h1")).getText()).toEqual(text);
  });
});
