# Project Name - GarageGuru


* [Link to Deployed Project](https://garageguru2023-9cc8e49ac2b8.herokuapp.com/)

## CONTENTS
* [USER EXPERIENCE (UX)](#user-experience)
  * [Purpose & target audience](#purpose-and-target-audience)
  * [Goals](#goals)
* [PROJECT DESIGN](#project-design)
  * [Agile Approach](#agile-approach)
  * [Wireframes](#wireframes)
  * [User Stories](#user-stories)
  * [Logic](#logic)
  * [Color Scheme](#color-scheme)
  * [Imagery](#imagery)
  * [Typography](#typography)
  * [MVP](#mvp)
* [FEATURES](#features)
* [VALIDATION](#validation)
* [TECH STACK](#tech-stack)
* [MODULES & LIBRARIES](#modules-and-libraries)
* [TESTING](#testing)
  * [Tests performed](#tests-performed)
  * [User Story Tests](#user-story-tests)
  * [Bugs resolved](#bugs-resolved)
  * [Unresolved bugs](#unresolved-bugs)
  * [Improvements & future developments](#improvements-and-future-developments)
* [DEPLOYMENT](#deployment)
* [FORKING & CLONING INSTRUCTIONS](#forking-and-cloning-instructions)
* [SECURITY SETTINGS](#security-settings)
* [CREDITS](#credits)
  * [Code](#code)
  * [Resources](#resources)
  * [Content](#content)
  * [Media](#media)
  * [Acknowledgements](#acknowledgements)


## USER EXPERIENCE

   ### Purpose and target audience

GarageGuru is a collaborative job management app aimed at vehicle service centres.

It is designed with the employee in mind, where jobs can be created, and assigned to different users, and job status can be tracked. Jobs can be viewed, watched, edited, filtered and searched.  In addition, an invoice can be created and its status can also be separately managed.

Each job card also has a comments section where users can collaborate on the job and specific comments in the form of a conversation thread.

This fully responsive accessible website can be used on a  desktop or the employee's mobile device on the workshop floor.


<img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/site_images/hosted_site.png">

* [Back to Contents](#contents)

  ### Goals
Goals for the first time user
1. To be able to create an account easily.
2. To be able to customise and update their profile.
3. To easily understand what the app is supposed to do and how to navigate it on a desktop or mobile device.
4. To easily be able to Add a Job, choose from a selection of job types, assign a job by default to themselves, or to be able to select another user.
5. To be able to select a due date for the job, while defaulting to the current day.
6. To be unable to choose a date in the past.
7. To be able to watch various jobs and view them on a dashboard.
8. To be able to view the jobs they have created on a dashboard.
9. To be able to view jobs assigned to them on a specific dashboard.
10. To be able to easily create and edit an invoice associated with a job.
11. To be able to leave comments about any job.
12. To view all the invoices in the system and manage their status.

Goals for the returning user
1. All the pages of the app should be secure, so once logged out, the only way to access any pages is via the login page.
The app should feel familiar to the returning user.
2.

Goals for the Administrator
1. The administrator can easily update or override any information on the backend as a superuser.

Goals for the Site Owner
1. The app should have the capacity to scale.
2. More choices of services can easily be added and customised for different businesses.
3. Images are validated to ensure they are not oversized dragging on site performance and storage resources.
4. Jobs, invoices and comments are pulled as required, to avoid dragging on site performance and storage resources.


* [Back to Contents](#contents)

## PROJECT DESIGN

  ### Agile Approach
  From the start the project was managed using [GitHub Projects (View Here - ensure labels are activated)](https://github.com/users/rstan-dev/projects/8/views/2?filterQuery=), using an agile approach.
  - The project goals were broken into epics, which were broken into user stories with acceptance criteria and individual tasks.
  - Each user story was allocated a certain number of story points based on a rough estimation of time to complete the work.
  - This allowed me to create a roadmap with milestones and target dates. [View Roadmap Here(ensure milestone and start date markers are activated)](https://github.com/users/rstan-dev/projects/8/views/1)
  - Each User Story was assigned a label according to the MoSCoW system so I could prioritise the work.
<img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/moscow_labels.png">

  ### Wireframes
   The initial wireframes were created in [Balsamiq](https://balsamiq.cloud/) to understand how the site would work, and this layout would drive User Stories, the logic required and overall design artwork decisions.
   The final app deviated slightly in a couple of areas as improvements were made while the site was being built and user functions could be tested.

   The Invoice functionality was added midway through the project because I felt not only would it complete the app, but it would add a layer of much-needed functionality.

   The Comments design and functionality was also enhanced later in the project when I added the ability to leave a reply to a comment, ensuring it was a fully collaborative system.


   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_alljobs.png">

   <details>
    <summary>Click to View More Wireframe Images</summary>
   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_addjob.png">
   <br>
   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_myjobs.png">
   <br>
   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_watchedjobs.png">
   <br>
   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_comments.png">
   <br>

   New wireframe for including the invoice module was conceived halfway through the project.
   - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/wf_new alljobs.png">
   </details>

* [Back to Contents](#contents)

  ### User Stories
  All epics, user stories with their acceptance criteria and tasks can be viewed on the GarageGuru [GitHub Project board](https://github.com/users/rstan-dev/projects/8/views/2?filterQuery=)

- There were 12 Epics created from Project Concept to Project Submission.

- There were 35 User Stories Created including:

1. [US1] Project General Requirements
 - As a developer, I can understand the goals of the site so that development decisions can be made accordingly.
2. [US2] Setup Repo
- As a developer, I will set up the repo and install the necessary packages so that I can start building the initial models to view on the React front-end
3. [US3] Profiles Model
- As a superuser, I can log in to the admin panel	 so that I can manage users and other parts of the system as it develops
4. [US4] Jobs Model
- As a superuser, I can create a Job Card so that I can capture the details of the job I wish to display
5. [US5] Create NavBar
- As a website user, I can view the basic navbar so that I can easily navigate the website on desktop and mobile
6. [US6] Link NavBar
- As a website user, I can navigate each page seamlessly so that I do not need to wait for page refresh
7. [US7] User Login frontend
- As a website user, I can log in so that I can access all the functions of the site, and I can easily see if I am logged in or not
8. [US8] User Logout frontend
- As a website user, I can log out so that I can protect my profile data, and I can easily see if I need to log in again
9. [US9] User Registration Frontend
- As a website user, I can register for an account so that I can access the functions of the site
10. [US10] Refresh Access Tokens
- As a website user, I can maintain my logged-in status until I decide to log out So that my user experience is not interrupted
11. [US11] View Profile Page frontend
- As a logged in User I can view my profile so that I can see the details I have entered about myself
12. [US12] Edit Profile Page frontend
- As a logged in User I can edit my profile so that I can change my personal info
13. [US13] Update Password frontend
- As a logged-in User, I can update my password so that I can change my password if I need to
14. [US14] Update Username frontend
- As a logged-in User, I can change my username so that I can change my username if I want to
15. [US15] View all jobs
- As a logged-in User, I can click on the All Jobs button in the NavBar so that I can see all the jobs in the system
16. [US16] Search all jobs
- As a logged-in User, I can enter a query in the search bar so that I can find a job easily
17. [US17] Filter jobs
- As a logged-in User, I can filter the job cards so that I can display them in the order I want
18. [US18] Add Job
- As a logged-in User, I can click on the Add Job button in the NavBar so that I can add the Job details to a form and save them to the database
19. [US19] Edit Job Card
- As a logged-in User, and creator of a job, I can click on the pencil icon on the job card so that I can edit the Job Card details
20. [US20] Delete a Job
- As a logged-in User, and creator of a job, I can click on the pencil icon on the job card so that I can delete the Job Card details
21. [US21] Add comment
- As a logged-in User, I can add a comment so that I can leave any comments about a particular job
22. [US22] View Job Comments
- As a logged-in user | I can click on the comments bubble so that I can view all the comments that have been made about the job
23. [US23] Edit Comment
- As a logged-in User, and creator of a comment, I can click on the pencil item of a comment I have written so that I can update it if I want to
24. [US24] Delete Comment
- As a logged-in User, and creator of a comment, I can click on the pencil item of a comment I have written so that I can delete it if I want to
25. [US25] Add Invoice details
- As an Owner or Assigned person of a Job Card, I can add invoice details to a job card so that a financial record can be maintained
26. [US26] View Invoice Details on the Job Card
- As any user of a Job Card, I can view invoice details on a job card so that I can see the status of the invoices for a job
27. [US27] Edit Invoice Details on the Job Card
- As an Owner or Assigned person of a Job Card, I can edit invoice details on a job card so that I can edit any of the details of the invoices for a job
28. [US28] Delete Invoice details on the Job Card
- As an Owner or Assigned person of a Job Card, I can delete an invoice related to a job card so that I can delete an invoice if a job is cancelled
29. [US29] View Invoice Details on AllInvoicesPage
- As any user of a Job Card, I can view invoice details on the AllInvoicesPage so that I can see the status of the invoices for a job
30. [US30] Edit Invoice Details on AllInvoicesPage
- As an Owner or Assigned person of an Invoice, I can edit invoice details on the AllInvoicesPage so that I can edit any of the details of the invoices for a job
31. [US31] My Jobs & Assigned Jobs View
- As a logged-in User, I can click on the My Jobs button or the Assigned Jobs button in the NavBar so that I can see all of the jobs that I have created or that have been assigned to me in the system
32. [US32] Watch Jobs
- As a logged-in User, I can click on the eye icon on a job card so that I can add it to my watch list where I can keep an eye on a job
33. [US33] UX & Testing
- As a developer, I can test each user story function so that I can verify each function works as intended
34. [US34] Deploy to Heroku
- As a developer, I can deploy to Heroku so that I can host the site in production
35. [US35] Complete Readme Documentation
- As a developer, I can submit a comprehensive Readme document so that other developers can understand the project's development process


  * [Back to Contents](#contents)

  ### Logic
  The database schema and website logic was conceived and created using [Lucid](https://lucid.app/) as follows:

  1. Database Structure:
  <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/garageguru_schematic_dec_2023.png">

  * [Back to Contents](#contents)

  ### Color Scheme
  The main colours of blue, white and grey were chosen for maximum contrast. I used Coolors to generate a colour palette.

  - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/color_pallette.png">

  I used [Canva](https://www.canva.com/) to generate a logo and a style guide.

  - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/site_images/garage_guru_logo.png">

  <details>
    <summary>Click to View More Color Scheme Images</summary>

    With a color palette in mind, I could create a project style guide:

    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/garage_guru_project_colors.png">

    <br>
  - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/wireframes/gg_icon.png">

  </details>

   * [Back to Contents](#contents)

   ### Imagery
   I used FontAwesome https://fontawesome.com/ for various icons in the navbar, JobCard, and other places for visual effects.
- All Jobs - <i class="fa-solid fa-car"></i>
- My Jobs - <i class="fa-solid fa-clipboard-list"></i>
- Add Job - <i class="fa-solid fa-circle-plus"></i>
- Assigned Jobs - <i class="fa-solid fa-people-group"></i>
- Login - <i class="fa-solid fa-right-to-bracket"></i>
- Log out - <i class="fa-solid fa-right-from-bracket"></i>
- Register - <i class="fa-solid fa-user-plus"></i>
- Profile - <i class="fa-solid fa-circle-user"></i>
- Pending - <i class="fa-solid fa-bell-concierge"></i>
- Underway - <i class="fa-solid fa-hourglass-half"></i>
- Completed - <i class="fa-solid fa-flag-checkered"></i>
- Job type - <i class="fa-solid fa-wrench"></i>
- Details - <i class="fa-solid fa-circle-info"></i>
- Created_by - <i class="fa-solid fa-user"></i>
- Created_on - <i class="fa-solid fa-calendar-days"></i>
- Updated_on - <i class="fa-regular fa-calendar-plus"></i>
- Due date_on - <i class="fa-regular fa-calendar-check"></i>
- Assigned to - <i class="fa-solid fa-person"></i>
- Status - <i class="fa-solid fa-circle-question"></i>
- Pencil - <i class="fa-solid fa-pencil"></i>
- Eyes - <i class="fa-regular fa-eye"></i> and  <i class="fa-solid fa-eye"></i>
- Speech bubble - <i class="fa-regular fa-comment"></i> and  <i class="fa-solid fa-comment"></i>
- Default car pic - <i class="fa-solid fa-car-side"></i>
- No jobs found clipboard - <i class="fa-solid fa-clipboard-question"></i>
- Upload image - <i className="fas fa-upload"></i>
- Cash register - <i class="fa-solid fa-cash-register"></i>
- Traffic Light - <i class="fa-solid fa-traffic-light"></i>

<br>

I used [Unsplash](https://unsplash.com/) to populate the site with realistic royalty-free images while testing.

  * [Back to Contents](#contents)

   ### Typography
   * I used a default Google font of Raleway and sans serif throughout the website for visual clarity and consistency.


   ### MVP
   Using the GitHub project board I prioritised user stories to give me an incremental MVP.

At each stage of achieving an MVP, I would aim to complete a piece of functioning work.  Styling issues would be noted as a small-item, logged to the Kanban board and I would revisit to make incremental visual improvements once the functionality logic was completed.

Every commit message thoroughly detailed the work that had been completed.  Some of the more complex pieces of functionality required updates and development across several pages for the functions to work as expected and this was captured in the commit history.

1. I created the basic models for profiles and jobs first so I could upload information to pull into the front end.
2. I built the Navbar and routes
3. I built the Login, Logout and registration functionality
4. I built the Profile Area with CRUD functionality
5. I built the Jobs section with CRUD functionality
6. I built the comments section below each job card with CRUD functionality
7. I built the Invoice Model and frontend components and linked them to the relevant JobCard
8. I built the Watch Jobs functionality and views
9. I built the filters and views for My Jobs and Assigned Jobs


   * [Back to Contents](#contents)

## FEATURES
The following features have been implemented:
1. Fully responsive website consisting of:
  - Home.

  <details>
    <summary>Click to View Images</summary>
    - <img src=""><br>

  </details>


  * [Back to Contents](#contents)

2. UX features include:
  -

  <details>
    <summary>Click to View UX Features Images</summary>
    - <img src=""><br>


  </details>

  * [Back to Contents](#contents)

## VALIDATION
Various validation methods have been incorporated:
 1.

 <details>
  <summary>Click to View Validation Images</summary>
  <img src=""><br>

</details>

 * [Back to Contents](#contents)

## TECH STACK
The site has been built with the following tech and tools:
1.

* [Back to Contents](#contents)

### Tools used
- [Canva Artwork](https://www.canva.com/).
- [Lucid Chart](https://lucid.app/) - schema and flow diagrams.
- [Favicon generator](https://favicon.io/favicon-converter/).
- [Responsive Image generator](https://ui.dev/amiresponsive).
- [Browserstack Browser Compatability](https://www.browserstack.com/).

* [Back to Contents](#contents)

## MODULES AND LIBRARIES
   * font-awesome - icons.

* [Back to Contents](#contents)

## TESTING
FOR DETAILED TEST REPORTS AND RESULTS PLEASE [VIEW THEM HERE:]().

  ### Tests performed
  The site was thoroughly tested during development with each feature tested before committing to GitHub.  The testing regime included the following:
  1.

  ### User Story Tests
  Each user story was tested manually according to a structured test sheet [VIEW IT HERE:](), with results being recorded and any failures rectified.

  * [Back to Contents](#contents)

  ### Bugs resolved:
  The following bugs were recorded and rectified [See test sheet]()
  1.

  * [Back to Contents](#contents)

  ### Unresolved bugs:


  ### Improvements and future developments:
  The following items have been identified for future development:
  1.

  * [Back to Contents](#contents)

## DEPLOYMENT
The summary of the steps to deployment are as follows:
1.

On completion of development, the following steps took place to deploy the final site to Heroku:
1.

* [Back to Contents](#contents)

## FORKING AND CLONING INSTRUCTIONS
You can create a copy of a GitHub Repository without affecting the original by forking it. Here's a step-by-step guide:
1. Log into GitHub or sign up for an account.
2. Go to the Repo...
3. Click "Fork" on the right side of the repository's page to create a copy in your own repository.

To clone a copy:
1. Go to the Repo...
2. Click the green code button, then the arrow, and select the "clone by https" option to copy the URL.
3. Open your preferred code editor and navigate to the directory where you want to clone the repository.
4. Type 'git clone', paste the copied URL, and press enter. The repository will then be cloned to your machine.

* [Back to Contents](#contents)

## SECURITY SETTINGS
The following precautions were taken regarding the security of the site:
1. An env.py was created at the start of the project, and added to .gitignore, to contain the following:
- DATABASE_URL
- SECRET_KEY
- CLOUDINARY_URL
2. These values were added to the Config Vars section of Heroku's Settings page.
3. Heroku is configured with 2FA

* [Back to Contents](#contents)

## CREDITS:
  ### Code
  *

  * [Back to Contents](#contents)

  ### Resources
  I used the following resources to help develop features and functionality:
  1.

  * [Back to Contents](#contents)

  ### Content
  *

  * [Back to Contents](#contents)

  ### Media
  * Logo was custom designed for this project.
  * Icons - font awesome.

  * [Back to Contents](#contents)

  ### Acknowledgements
  * Thanks to

  * [Back to Contents](#contents)
