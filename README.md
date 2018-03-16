[![Build Status](https://travis-ci.org/dhsynergetech/kmt.svg?branch=dhs-angular-build)](https://travis-ci.org/dhsynergetech/kmt) 
[![Known Vulnerabilities](https://snyk.io/test/github/dhsynergetech/kmt/badge.svg)](https://snyk.io/test/dhsynergetech/kmt)

# Technical Approach - DH Synergetech Knowledge Management Tool

## Prototype
A prototype of the DH Synergetech (DHS) Knowledge Management Tool (KMT) is located at: https://dhsknowledgemanagement.cfapps.io

## Features
### Knowledge Creation
#### Requirement 1: Have the ability to easily create “knowledge articles” (KAs).
- These can be original records (e.g., specific work instructions or content) and/or packages of content, including documents, user-configurable forms, tables, and workflows

To Create Knowledge Article, user first needs to “Register a new account”.
![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTHomePage.png)

User then needs to fill in the required fields to Register.
![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/DHSKMTRegistrationPage.png)

User will be sent a confirmation email with confirmation link that must be selected to activate the account.
Once user is registered for an account, they must Sign in to access the KMT.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTSignIn.png)

After the user is signed in, user can select Article under Categories.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTCreateArticle1.png)

After user clicks on article, they can select Create a new Article to create a Knowledge Article.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTCreateArticle2.png)

User can create an Article using ![Markdown](http://commonmark.org/help/) in the Content Field and a Preview is automatically displayed of the Knowledge Article.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/DHSKMTArticlePreview.png)

Once the Knowledge Article is complete, user selects save.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/DHSKMTArticleSave.png)

Knowledge Article has been created.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTCreateArticle3.png)

#### Requirement 2: Have the ability to provide multiple levels and formats of information in KAs (e.g., bullet points for senior technical levels, scripted specific details for junior/non-technical staff).

The DHS KMT includes summary level information at the Category level which can be expanded upon by selecting the relevant Article.  For example, for Station 23 – Forest Ranch user sees a list of Articles. Also user may link multiple articles together by including other article links in the content.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/Station23Information.png)

User can click on desired article and see detailed information below this.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/Station23Article.png)

#### Requirement 3: Allow for role-based security access, to allow control of access and level of information by login.

Only users with Captain role can approve Knowledge Articles by selecting Status of Approved.  Users with Firefighter role can create Knowledge Articles but not approve.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/DHSKMTArticleApproval.png)

### Knowledge Sharing
#### Requirement 4: Allow for the promotion of process and information across systems and channels, as required.

The DHS KMT exposes a layer of RESTful APIs for integration with the UI and with any application.  The RESTful APIs are published on DHS KMT website using Swagger UI.  Using the RESTful APIs, other applications may invoke REST services from the KMT.  For example, another web application may get knowledge article information from the KMT to display on its web page.  This architecture supports the promotion of process and information across systems and channels as required. 

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/SwaggerAPIs.png)

#### Requirement 5: Have the ability to create user-defined rules for creation (e.g., mandatory fields) and lifecycle management (e.g., who, how, when revised and updated).

Administrators can assign roles for creation and lifecycle management using User Management features in KMT.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/DHSKMTUserAdmin.png)

#### Requirement 6: Trigger escalation processes (e.g., automated emails/texts to approvers, reminders) for lifecycle activities revised and updated).

When Articles are created, an email is sent to fire captains requesting their approval of the article.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/KMTApprovalEmail.png)

### Knowledge Development
#### Requirement 7: Have the ability to update and improve KAs and access the value of usage as input to predicting new records or record types.

The DHS KMT is designed to use an article Review feature for users to assess the value of the article being viewed.  The review ratings are recorded in the database and reflected in a scorecard on the homepage.  From the Article Page, user selects Edit.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/ArticlePage.png)

User then selects rating from pulldown list.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/ArticleReview.png)

#### Requirement 8: Show innovation by learning from existing records (e.g., types, content, usage) and prompting to create new KAs.

The scorecard is used to learn from existing records and prompt the creation of new articles.  In the Scorecard, the types of Articles are scored for number of Outstanding, Good, or Poor ratings.  This tells KMT authors how often articles are used and how on target the various article types are.  This helps shape creation of future articles.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/Scorecard.png)

## DHS Agile Methodology
### User Involvement in Design
*US Digital Service Playbook:*
> *Play 1 - Understand What People Need*

> *Play 2 - Address the Whole Experience from Start to Finish*

On 2/21/18, DHS consultants interviewed users (firefighters) in person at the Butte County CalFire Emergency Command Center to identify a useful application for a Knowledge Management Tool (KMT) that would provide value to CalFire. The firefighters suggested a KMT that mimics the functionality of the “Magnet Board” used to model the firefighting resources available to the county for incident response.  Currently the magnet board is a physical board located in the Command Center.  The goal of the Magnet Board KMT would be to represent the information represented in this magnet board in electronic format, viewable from any location in a responsive format.  Underlying the Magnet Board is new functionality for a Knowledge Management Tool for the fire stations, engines, and other associated firefighting equipment.   
![Image of Magnet Board](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/MagnetBoard.png)

*US Digital Service Playbook:*
> *Play 3 - Make it Simple and Intuitive*

Initial mockups based on the Magnet Board were developed and shared with development team in GitHub https://github.com/dhsynergetech/kmt/blob/master/CalFire%20Mockups%20v2.docx

### Sprint Planning

*US Digital Service Playbook:*
> *Play 4 - Build the Service Using Agile and Iterative Practices*

The DHS consultants began the scrum process on 2/22/18 with Sprint planning session to review draft user stories based on the interview with firefighters as well as requirements in the RFI.  User stories were developed, documented, and prioritized in the Kanban board in GitHub at https://github.com/dhsynergetech/kmt/projects/1

### Daily Scrum
The DHS consultants began daily 15 minute scrum calls on 2/23/18, with a plan to conduct two 1 (one) week sprints for the RFI.  Plan is to conduct sprint review's with firefighters to obtain feedback on the CalFire Magnet Board KMT tool. Daily collaboration for the team is enhanced via a Slack channel at https://dhsynergetech.slack.com/?redir=%2Fhome

### Sprint Reviews and Retrospectives

*US Digital Service Playbook:*
> *Play 12 - Use Data to Drive Decisions*

A sprint review and retrospective was conducted on 3/7/2018 where the Kanban board from sprint 1 was reviewed.  Stories were reviewed with demonstrations of the KMT prototype and further development items were discussed.  Items that were completed were moved to the Done column on the Kanban board and remaining items in the product backlog were discussed.  Stories for the next sprint were identified and moved to the In Progress column.  Retrospective discussion was conducted and changes in our approach for next sprint were identified (for example, changing from ReactJS to AngularJS in the next build).  Product Manager started developing plan to review with firefighter users in next few days after new build.

### Results of Agile Approach

The results of the agile approach and impressive contributions from the team were that a fully functional, responsive, magnet board with underlying RFI required knowledge management tool functionality was created in just over 3 weeks!

![Responsive Magnet Board with underlying KMT](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/IMG_2215.PNG)

### Technical Approach Requirements

*US Digital Service Playbook:*
> *Play 5 - Structure Budgets and Contracts to Support Delivery (see Requirement a.)*

> *Play 6 - Assign One Leader and Hold that Person Accountable (see Requirement a.)*

> *Play 7 - Bring in Experienced Teams (see Requirement b.)*

> *Play 8 - Choose a Modern Technology Stack (see Requirement l.)*

> *Play 9 - Deploy in a Flexible Hosting Environment (see Requirement m.)*

> *Play 13 - Default to open (see Requirement t.)*


Requirement | DHS Approach
-------------------- | --------------------
a.	Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted | Assigned Brendon Delong as Delivery Manager responsible for the prototype.
b.	Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP AD-DS Labor Category Description | Assembled an experienced, multi-disciplinary team: Delivery Manager (Brendon DeLong), Product Manager (Jacob Hayes), Agile Coach (Pamela Jarrett), Technical Architect (Sabu Azeez), Front End Developer (Steve Hoang), Full Stack Web Developer (Shabna Shurafadeen).
c.	Understood what people needed by including people in the prototype development and design process | Involved users: Design of KMT, User Stories, Sprint Reviews, User Testing, and an iterative development process.
d.	Used at least a minimum of three (3) user-centric design techniques and/or tools | Used story boards, prototype testing, and an iterative process to interact with the firefighters (users).
e.	Used GitHub to document code commits | DHS used the following GitHub repository: https://github.com/dhsynergetech/kmt
f.	Used Swagger to document the RESTful API, and provided a link to the Swagger API | Restful APIs for the DHS Knowledge Management tool are in Swagger at: https://dhsknowledgemanagement.cfapps.io/#/admin/docs 
g.	Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0 | 508 compliance was tested with Wave http://wave.webaim.org/.
h.	Created or used a design style guide and/or pattern library | Used jHipster framework with AngularJS code.
i.	Performed usability tests with people | The Product Manager is a former firefighter who performed testing and facilitated user testing with the other firefighters.
j.	Used an iterative approach, where feedback informed subsequent work or versions of the prototype | The DHS KMT was developed in two iterations (sprints) and reviewed by users during each sprint review.
k.	Created a prototype that works on multiple devices, and presents a responsive design | The DHS KMT was developed on a responsive platform and tested on multiple devices during development iterations.
l.	Used at least five (5) modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.) | The 5 modern and open-source technologies used in the DHSynergetech KMT are: 1.	Pivotal Cloud Foundry (Pivotal.io); 2.	JHipster development platform (jhipster.tech); 3.	Angular javascript library for user interfaces (angularjs.org); 4.	MySQL database (mysql.com); and 5.	 GitHub source code management and collaboration tools (github.com)
m.	Deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as Service (PaaS) provider, and indicated which provider they used | The DHSynergetech KMT was deployed on Pivotal.io: ![Pivotal](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/pivotalio.png)
n.	Developed automated unit tests for their code | Unit tests are run by [Karma][] and written with [Jasmine].
o.	Setup or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider | Used Travis CI (travis-ci.org) for Continuous Integration.
p.	Setup or used configuration management | Used GitHub configuration management: ![GitHub](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/GitHub.png)
q.	Setup or used continuous monitoring | Used PCF Metrics (pivotal.io) for continuous monitoring of the DHS Knowledge Management application: ![PCF Metrics](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/PCFMetrics.png)
r.	Deployed their software in an open source container, such as Docker (i.e., utilized operating-system-level virtualization) | The KMT application is deployed in Pivotal Cloud Foundry (PCF) Platform as a Service.  The application can also be deployed in Kubernetes or Docker containers.
s.	Provided sufficient documentation to install and run their prototype on another machine; and | See the DHSKnowledgeManagement Development How-To's paragraph below for documentation on hot to install and run prototype on another machine.
t.	Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge | The prototype and underlying platforms were openly licensed and free of charge: Pivotal, JHipster, Angular, and MySQL.

## Architectural Description / Code Flow

The DHS KMT is built using Angular 4 and Spring Boot framework. The project scaffolding was created using [JHipster](https://www.jhipster.tech), it is an open source project providing development tools and production ready generators.  The DHS KMT is a modern web app, mobile responsive, build on latest technologies (HTLM5/CSS3/JavaScript, Angular 4, Spring Boot/Spring REST MVC, Security, JPA and MySQL). The client side technologies used are Yarn for dependency management, webpack for compile/minify and hotreload of Angular+TypeScript, BrowserSync, Karma for Unit Tests, Angular 4 for data binding, validations, and Bootstrap for HTML components. The server side technologies include Maven for dependency management, Spring Boot, Liquibase for database schema tracking, Hibernate JPA, Spring Data JPA, Spring Security, Spring MVC REST, and Thymeleaf.  The DHS KMT is deployed on Pivotal Cloud Foundry (PCF) as a Java application using Spark version of ClearDB MySQL database service. 

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/ArchitectureFlow.PNG?raw=true)

Architecture Layer        | Code Path      
------------- |-------------
Angular      | https://github.com/dhsynergetech/kmt/tree/master/src/main/webapp/app
Localization | https://github.com/dhsynergetech/kmt/tree/master/src/main/webapp/i18n
Swagger UI | https://github.com/dhsynergetech/kmt/tree/master/src/main/webapp/swagger-ui
Spring Boot App | https://github.com/dhsynergetech/kmt/tree/master/src/main/java/com/dhs
REST APIs | https://github.com/dhsynergetech/kmt/tree/master/src/main/java/com/dhs/web/rest
JPA Repository | https://github.com/dhsynergetech/kmt/tree/master/src/main/java/com/dhs/repository
Security | https://github.com/dhsynergetech/kmt/tree/master/src/main/java/com/dhs/security
Config | https://github.com/dhsynergetech/kmt/tree/master/src/main/resources
Unit Tests | https://github.com/dhsynergetech/kmt/tree/master/src/test
Webpack | https://github.com/dhsynergetech/kmt/tree/master/webpack


## DHSKnowledgeManagement Development How-To's

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
2. [Yarn][]: We use Yarn to manage Node dependencies.
3. [Maven][]: We use Maven to manage Spring Boot dependencies and to run the development app server
4. Clone the KMT repository using [git clone https://github.com/dhsynergetech/kmt.git]
5. [cd kmt] change directory to kmt
6. Run [yarn install] to install the node modules and tools.

We use yarn scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to start webpack and the REST API application

    ./mvnw
    yarn start
    
## Building for production

To optimize the DHSKnowledgeManagement application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

## Testing

*US Digital Service Playbook:*
> *Play 10 - Automate Testing and Deployments*

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Karma][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test

For more information, refer to the [Running tests page][].

### Security Testing

*US Digital Service Playbook:*
> *Play 11 - Manage Security and Privacy through Reusable Processes*

The DHS KMT security testing uses Snyk https://snyk.io.  Snyk is used to detect web vulnerabilities such as cross site scripting and other web vulnerabilities.

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/Snyk%20Vulnerability%20Report.png?raw=true)

## Using Docker for development

Start a mysql database in a docker container, run:

    docker-compose -f src/main/docker/mysql.yml up -d

Build a docker image of DHS KMT app by running:

    ./mvnw verify -Pprod dockerfile:build

Then run:

    docker-compose -f src/main/docker/app.yml up -d

## Continuous Integration
We are using Travis CI for automated build and deploy. The configuration setup is in https://github.com/dhsynergetech/kmt/blob/master/.travis.yml. 

Build Console is at

[https://travis-ci.org/dhsynergetech/kmt/builds]

![](https://github.com/dhsynergetech/kmt/blob/master/ImagesForReadme/Travis%20CI%20Automated%20Build.png?raw=true)

## Appendix
### References
[Node.js](https://nodejs.org/): https://nodejs.org/

[Yarn](https://yarnpkg.org/): https://yarnpkg.org/

[Webpack](https://webpack.github.io/): https://webpack.github.io/

[Angular CLI](https://cli.angular.io/): https://cli.angular.io/

[BrowserSync](http://www.browsersync.io/): http://www.browsersync.io/

[Karma](http://karma-runner.github.io/): http://karma-runner.github.io/

[Jasmine](http://jasmine.github.io/2.0/introduction.html): http://jasmine.github.io/2.0/introduction.html

[Spring Boot](https://projects.spring.io/spring-boot/): https://projects.spring.io/spring-boot/
