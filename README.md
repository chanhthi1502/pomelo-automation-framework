# Pomelo QA challenge
This is documentation for Pomelo QA challenge assignment

## Part 1 : Analyst the requirements and create test scenarios

Please open this [link](https://docs.google.com/spreadsheets/d/1Ys8vey-Lp6X9Ilj5P8Tz-n5eGfBNezn8Uf7g8ZkNBk4/edit#gid=853402295) to take a look on Analyst the requirements and all test cases

I have 5 tabs:

* **Question to clarify**: My questions or concern during reading requirement.
* **Ideas or suggestion**: My ideas and suggestion during i'm playing around website.
* **Test Case - Functional**: All test cases related to functional testing of requirement in assignment
* **Test Case - Non-Functional**: All test cases related to non-functional testing of requirement in assignment
* **Bug in Production**: During i'm playing around i found some small bugs in website 

## Part 2 : Automated test assignment

### Download and clone project

Please use git command to clone project into your local laptop

### Install

Please run following command to install all required packages

```bash
npm install
```

### Run test

Please run following command to install all required packages

```bash
npm test
```

### Structure of project

```bash
--src
   |--configs
         |--yamls
   |--dataSource
   |--pages
   |--plugins
   |--support
   |--tests
   |--utils
```
#### 1. Configs folder
Inside configs folder is yamls folder - it included all files to store elements of each pages

```yml
ShoppingBag_Button: //li[contains(@data-cy,'nav_user__cart')]
Shop_DropDown: (//span[contains(text(),'Shop')])[1]
```

#### 2. Data Sources folder
Include Json files for data input in test cases

#### 3. Pages
Include js file - this is file for each page of website - to call elements and actions of that page

To call element from yml file

```js
get shoppingBagButton(){
        cy.log("get Shopping Bag button element")
        return this.getElement(this.eleYml.ShoppingBag_Button)
}
```

Example for one action (method) in Home page - click icon Shopping Bag in Header

```js
/* 
        ##### This is method to click Shopping Bag icon in header ####
        - Parameters:
          1. None
*/
   clickShoppingBag(){
        this.shoppingBagButton.click()
        return this
   }
```
#### 4. Plugins folder


#### 5. Support folder

Include 2 files commands.js and index.js 

- For commands.js, it used to creat custom commands and overwrite existing commands

```js
/* 
##### This is method to log in to website ####
- Parameters:
1. email
2. password
*/
Cypress.Commands.add('login',(email,password) => {
    cy.visit('https://www.pomelofashion.com/th/en')
    cy.xpath('//span[contains(text(),"Login")]').click()
    cy.xpath('//input[@name="email"]').type(email)
    cy.xpath('//input[@name="password"]').type(password)
    cy.xpath('//button[contains(@data-cy,"auth__login__email__button")]').click()
    cy.wait(3000)
    return this
})
```

#### 6. Test folder

It included all spec file for our test cases here

Before create some test, we should loaded all elements and wrap it to use in our test cases

```js
cy.readFile('./src/configs/yamls/home_page.yml').then(function (yamlString){
      cy.wrap(YAML.parse(yamlString)).as('elementHomePage')
})
```

In test cases, to use wrapper

```js
cy.get('@elementHomePage').then(function(ele){
       const homePage = new HomePage(ele)
       homePage.chooseCategory('Blouses')
})
```
#### 7. cypress.json file

This file is using for add,change some configuration or location of folder in cypress

```json
{
    "integrationFolder" : "src/tests",
    "fixturesFolder" : "src/configs",
    "supportFile" : "src/support/index.js",
    "pluginsFile" : "src/plugins/index.js",
    "screenshotsFolder" : "src/screenshots",
    "env": {
        "email" : "pomelotest1205@gmail.com",
        "password" : "Pomelotest1502"
    }
}
```


