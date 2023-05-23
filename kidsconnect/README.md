# DEVON Frontend Developer Assessment

## Description

KidsKonnect builds software to help day-care organizations succeed. One of the features is that we offer daycare employees with an overview of
children that are scheduled to attend on a given day. We call every occurrence of a child that will attend on a certain time a "session". In this exercise we'll ask you to implement such an overview yourself.

## Requirements

We would like you to build a React application where daycare employees can have a good overview of the session, where they can also manage the status of a session. If the mother of a child has come by to pick up the child, the employee should be able to change that with the application.

First, create the foundation of the application. Create a React app that uses Vite as bundler and with react router for the navigation. From the
Homepage we should be able to go to a new page calles ‘Sessions overview’.

The requirements for this page are as follows:

The sessions overview page by default shows all the sessions available for a certain date. Think a little about what would be a useful view for a day care employee.

If no date is provided the
default date will be 2023-06-02

There will be two buttons: ‘Next day’ and ‘Previous day’. When clicked it will show the sessions for that date.

For each session show the following information.
The start and end times for this session.
The name and avatar for the child
The group name associated with that session
The current presence status for that session
A button that updates the presence status according to the following rules. Make sure the button shows a useful label.
.If the presence status is ‘unknown’ it becomes ‘present’.
If the presence status is ‘present’ it becomes ‘picked up’
.If the presence status is ‘picked up’ it becomes unknown’ again.
Allow the user to filter the session list to only show the sessions for one specific group.

We also would like to see a page that shows news items. Requirements for this page are as follows:

The news overview shows all the information of the news items.

There should be a button 'Create new Post'. When clicked, a user should be able to fill in a form.

This form should on submit POST a news item, that is immediately visible in on the overview.

Feel free to add more fields or validation to the news items.

## Tech stack

Before you begin:

Make sure you have NodeJS and yarn installed. Run
yarn install to install all required modules.

Run
yarn start in to launch the JSON webservice that acts as our API.

We would like to see how you create the React application from scratch.

Implement the functionality requested described in the
Exercise section below.

We are using a specific Tech Stack that we would like to see used in this exercise
Use vite as bundler
vitest or cypress.io for testing
react-router for app navigation
Fetching data with react-query and axios
Handling forms with react-hook-form
Use components from mui and use styled-components

When you’re done:

Before moving on, make sure things work!

Share the React application with us.

Tips

Consider real world problems like latency and failed HTTP requests.
Provide the user with some feedback.

Feel free to use any additional libraries.

Show how you think code should be written. Think about code-styling, patterns, comments, if you have time left some tests would be nice, etc.
Make it pretty!

If you’re new to React or React Query, don’t be afraid to ask a question!

You can score bonus points by using Typescript!

## API service should run before vite run

Go to service

-   yarn install
-   yarn start

since proxy has been declare "http://localhost:3001"

-   http://localhost:3001/sessions/
    This contains sessions per day.
-   You can find sessions for a certain day by filtering on the day property: http://localhost:3001/sessions?day=2023-05-31
    Each session will have a child_id to refer to the child for whom the session was booked.
-   http://localhost:3001/children/ - This contains a list of children.
-   http://localhost:3001/news/ - This contains a list of news items.
-   http://localhost:3001/news/postnews - This shows a form to create news

## local info

## initial setup

yarn install or yarn

## run

yarn start

it runs vite at localhost:5173

## to run cypress test cases

npx cypress run or cypress open or cypress run
