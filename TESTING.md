# PROJECT TEST DOC - GarageGuru

## CONTENTS
[TESTS PERFORMED](#tests-performed)
  * [Manual User Story Tests](#manual-user-story-tests)
  * [HTML](#html)
  * [CSS](#css)
  * [ESLINT](#eslint)
  * [PYLINT & PEP8](#pylint-and-pep8)
  * [Lighthouse](#lighthouse)
  * [Browser Compatability](#browser-compatability)
  * [Automated Tests](#automated-tests)
  * [Final Manual Checks](#final-manual-checks)


  [Return to README.md](https://github.com/rstan-dev/GarageGuru-PP5/blob/main/README.md)


## TESTS PERFORMED
  The site was thoroughly tested during development with each feature tested before committing to GitHub. The testing regime included:
  1. Incremental preview testing
  2. Django Automated Tests
  2. Early user observation test
  3. Manual user story tests on the dev app
  4. Django Automated Tests checks and updates
  5. React Automated Tests
  5. HTML, CSS, ESLINT, PYLINT, Lighthouse
  6. Browser Compatability Tests
  7. Final manual user story tests on the production app

  ### Manual User Story Tests
  User story tests were conducted systematically, with any failing tests rectified.  A link to the Google Test Sheet [can be found here](https://docs.google.com/spreadsheets/d/1esaHTm738sbXP-JMxzEvQ63mgN3IazsXGUL8tRsX0ZI/edit#gid=165646488)

  <details>
    <summary>Click to View Manual User Story Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test1.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test2.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test3.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test4.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test5.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test6.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test7.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test8.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/manual_test9.png">

  </details>

  Each user story was tested again in the production version to ensure it matched the development version.
  <details>
    <summary>Click to View Manual User Story Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test1.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test2.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test3.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test4.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test5.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test6.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test7.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_test8.png">


  </details>

  * [Back to Contents](#contents)

  ### HTML
  All HTML pages were checked with [NU HTML Checker](https://validator.w3.org/nu/)

  <details>
    <summary>Click to View HTML Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_add_invoice.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_addjob.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_all_invoices.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_all_jobs.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_edit_invoice.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_edit_job.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_job_id.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_login.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_profile_page.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_edit_profile.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_register.png">

  </details>

  * [Back to Contents](#contents)

  ### CSS
  All CSS pages were checked with [JIGSAW W3 VALIDATION](https://jigsaw.w3.org/css-validator/)

  <details>
    <summary>Click to View CSS Test Evidence</summary>
       - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_add_invoice.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_addjob.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_all_invoices.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_alljobs.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_edit_invoice.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_edit_job.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_edit_profile.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_job_id.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3c_login.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_profile.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/w3jigsaw_register.png">

  </details>

   * [Back to Contents](#contents)

   ### ESLINT
  All JS pages were checked with [ESLINT](https://eslint.org/)

  <details>
    <summary>Click to View ESLINT Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/eslint_results.png">

  </details>

  * [Back to Contents](#contents)

  ### PYLINT AND PEP8
  All Python pages were checked with [CODE INSTITUTES PYTHON LINTER](https://pep8ci.herokuapp.com/)

  <details>
    <summary>Click to View PYLINT Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_admin.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_model.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_serializer.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_tests.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_comments_views.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_drf_permissions.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_drf_serializers.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_drf_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_drf_views.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_admin.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_models.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_serializer.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_tests.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_invoices_views.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_admin.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_choices.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_models.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_serializer.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_tests.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_jobs_views.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_profiles_models.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_profiles_serializer.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_profiles_tests.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_profiles_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_profiles_views.png">
       - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_watchers_models.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_watchers_serializer.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_watchers_tests.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_watchers_urls.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/pep8_watchers_views.png">

  </details>

  * [Back to Contents](#contents)

  ### LIGHTHOUSE
  A lighthouse report was run on the site on the following pages to ensure accessibility criteria was met
   * AllJobs
   * AllInvoices
   * EditInvoices
   * EditJob
   * Jobcard
   * ProfilePage

The performance issues are related to image sizes which are managed in the backend. A certain resolution is needed for good quality and as the app is fully responsive the images need to be flexible according to the container size - so this item has been left.

  <details>
    <summary>Click to View LightHouse Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_all_jobs.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_allinvoices.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_edit_invoices.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_edit_job.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_job_card.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/lighthouse_profilepage.png">

  </details>

  * [Back to Contents](#contents)

  ### Browser Compatability
  - The production site was tested using [Browserstack](https://www.browserstack.com/) to ensure compatibility across various devices, and browsers including Mac, iPhone, Windows and Android, Chrome, Safari and Firefox on different pages chosen at random

  <details>
    <summary>Click to View Browser Test Evidence</summary>
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_googlepixel5_firefox.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_androids23_chrome.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_ipad12.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_ipad12mini.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_iphone13.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_mac_firefox.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_mac_safari.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_windows_11_chrome.png">
      - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/browserstack_windows_11_firefox.png">

  </details>

  * [Back to Contents](#contents)

  ### Automated Tests
  * A total of 37 automated tests were written covering 95% of the code using the DjangoRESTFramework APITestCase library.
  * The tests were set up using a TEST database.  These settings were changed to address certain deployment issues.  The code can be seen below.  Screen shot of test_db_settings
  * The tests can be run by entering "python3 manage.py test" into the terminal. Tests covered 95% of the code and included tests on:
     - Jobs
     - Invoices
     - Profiles
     - Comments
     - Watchers

  * A total of 10 tests were run on the react code using Jest.  The tests can be run using npm test.


  <details>
    <summary>Click to View Automated Test Evidence & Coverage Report</summary>
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/test_db_settings.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_jobs.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_invoices.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_profiles.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_comments.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_watchers.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_coverage1.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/api_test_coverage2.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/react_test_results.png">

  </details>

  ### Final Manual Checks
  On deployment, a final check of all user stories was conducted on the production version, and any changes required were addressed and the project was redeployed.

  Every page of code was double checked to ensure there was no redundant or commented out code.

  There are some console.log(err) which were left commented out, for future debugging purposes.

  On the final manual pass, an anomoly was noticed on one specific page on the deployed version: https://garageguru2023-9cc8e49ac2b8.herokuapp.com/assigned

  When navigating to the page via the menu the page loads as expected.  When refreshing the page, a Dangerous Site warning appeared.  This only occurred on this one URL, and it only occurred on this browser. I could not replicate this issue in Incognito mode, on Firefox, or on Browserstack's Chrome browser on a Mac or a Windows terminal.

  I contacted Tutor Support and spoke to John Rearden on 15th Dec 2023 and raised this issue and he was unable to replicate it. I uninstalled an Ignore X-Frame extension which I installed to use Browserstack however the problem persisted. I am noting it as a potential bug for future investigation just in case it arises.

  Screen shots of the different browser tests have been included in the test results below.


   <details>
    <summary>Click to View Final User Story Tests</summary>
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual1.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual2.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual3.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual4.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual5.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/final_manual6.png">

    - Screen shots of the Dangerous Site Warning:

    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/dangerous_site_warning.png"><br>

    and other evidence from different browsers that did not display that warning:
    <br>
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/dangerous_page_no_warning_firefox.png">
    - <img src="https://github.com/rstan-dev/GarageGuru-PP5/blob/main/documentation/images/test_results/dangerous_page_browserstack_chrome_no_warning.png">

    </details>


  * [Back to Contents](#contents)
