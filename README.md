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

Please run following command to install all required packages. Please note that if you have be failed one ore more test cases, please try rerun it.

```bash
npm test
```
<img width="857" alt="Screen Shot 2021-11-24 at 15 42 25" src="https://user-images.githubusercontent.com/4730067/143204240-954aeda4-1a76-4394-a72c-dc791f7f1f8b.png">

```bash
npx cypress open
```
<img width="800" alt="Screen Shot 2021-11-24 at 15 46 16" src="https://user-images.githubusercontent.com/4730067/143205144-7691943e-d58d-4e0a-a9e8-7c2be1516cbd.png">

<img width="1195" alt="Screen Shot 2021-11-24 at 15 49 59" src="https://user-images.githubusercontent.com/4730067/143205198-45f7bef1-df8c-43b3-b00d-2ccea21ddad9.png">

### Git Hub Action

Set up basic git hub action for CI/CD

--.github
   |--workflows
     |--node.js.yml
     
 Configure all CI/CD in node.js.yml
 
 ```yml
steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm install ## Install all packages are needed
    - run: npm test ## Run Test
```
Please check result in Action tab

<img width="1023" alt="Screen Shot 2021-11-24 at 11 11 07" src="https://user-images.githubusercontent.com/4730067/143173625-1ab41edf-ea87-4e3a-a851-7460696580d7.png">

<img width="1005" alt="Screen Shot 2021-11-24 at 11 12 22" src="https://user-images.githubusercontent.com/4730067/143173745-065c6c99-9a72-4a47-8a21-db92f05e90bc.png">

<img width="1438" alt="Screen Shot 2021-11-24 at 11 13 53" src="https://user-images.githubusercontent.com/4730067/143173951-6559b9c5-3e8a-48e2-b107-359de276f74c.png">



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

Data for test cases will be formatted like below

```js
module.exports = {
   test:{
       data:{
            "Mali Blouse - Rose in Blouses Category" : 
                     {category: 'Blouses', product: 'Mali Blouse - Rose', size : 'M', quantity :'3', newSize :'S', promoCode: 'AAABC'}
       }
   }
}
```
We should be install package 

```bash
npm install jasmine-data-provider
```
In spec file (test case file), we will use like below

```js
const dataTest = require ('../dataSource/pomelo_data_test')
const using = require('jasmine-data-provider')

using(dataTest['test'].data, (data,description) => {
        it(`Test Case - A customer adds the ${description} and click "Cart" Icon`, function(){
            cy.get('@elementHomePage').then(function(ele){
                const homePage = new HomePage(ele)
                homePage.chooseCategory(data.category)
            })
            cy.get('@elementProductCategoryPage').then(function(ele){
                const productCategoryPage = new ProductCategoryPage(ele)
                productCategoryPage.chooseProduct(data.product)
                //productPage.chooseProduct('Uranus Earring - Pink/Purple')
            })
            cy.get('@elementProductSinglePage').then(function(ele){
                const productSinglePage = new ProductSinglePage(ele)
                productSinglePage.addToBag(data.size)
            })
            cy.get('@elementShoppingBagPage').then(function(ele){
                const shoppingBagPage = new ShoppingBagPage(ele)
                shoppingBagPage.viewMyShoppingBag()
                               .verifyShoppingBag('My Shopping Bag','Mali Blouse - Rose','M','1')
            })
    
        })
})
```

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


