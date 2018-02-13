# Smarthealth UI

It is an angular project for Smarthealth application.

# Getting Started

- Install latest **Node.js** version from [https://nodejs.org/en/download/]
- Install **angular cli** from [https://cli.angular.io/]
- Clone this github repo and open it from your favorite editor (preferably vs-code) .
- Use following **commands** to run project:
	- `ng-serve` - To run the project on port 5200 (configured in angular-cli.json).
	- `ng-build` - To build the project for distribution.
	- `ng-test` - To run test cases.
- **Angular Material Components** have already been added in the project. For the documentation, check [https://material.angular.io/components/categories]

## Configuration Files

- `angular-cli.json` - It contains configuration for :
	- **styles** - It contains array of style sheets used in the project globally. They are bundled on compile time.
	- **scripts** - It contains array of scripts used in the project globally. They are bundled on compile time.

-	`package.json` - It contains different packages and dependencies for the project. 
> On installing a package use --save flag with the command to save the package as project dependency. This make an entry in package.json.  Eg. **npm install 'pkg-name' --save**

## Important Files & Folders

-	`/src/main.ts` - This file contains reference to initial module that is called by angular on running the application.
-	`/src/index.html` - Starting point of the UI. It is the **base HTML file** of the application where we give reference to the common CSS, JS files and render the starting component in it.
-	`/src/app` - It contains all angular specific project files.
-	`/src/assets` - Here we keep the common CSS, JS, Fonts, Images used in the application.
-	`/src/app/app.module.ts` - Starting module of the application(called from main.ts). It contains reference to every other module/package/library/components used in the project.

## Project Development

Login Page sample is already made at `/src/app/login`. Since every page in angular2+ is a component, each one of the them will contain following files:
-	`component.ts` - main component file the page
-	`component.html` - HTML design of the page
-	`component.css(optional)` - CSS specific to the page

>Routing in between the component is written in **app.module.ts** file. So whenever a component is added, it needs to be referenced in the AppModule and its routing should be added as well.

>**Angular Material components** have already been added on the app.module.ts file. In case new components are needed, their Modules need to be imported in app module file.