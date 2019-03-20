# StoryBooks
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

StoryBooks is Node.js webApp for writing/reading stories and Comment on them.
Stories can be Private or Public.

## Tech Features!

  - Node.js at Back-End
  - Complelety Responsive with Bootstrap 4 and Materialize
  - Express JS for Routing
  - Passport's Google Oauth2.0
  - Fetches your images from google account and sets your profile.
  - MongoDB Storage
## Usage

- Without Logging in you can read Public stories and comments
- Comments are allowed only after Login.
- Login using Google Account. Create your stories. Make them Public or Private depending on your choice.
- Other Users can read only your Public stories and comment on them.  

## Installation
StoryBooks requires [Node.js](https://nodejs.org/) v4+ to run.

**Google secret and mongoURi have not been stored on github for security reasons.
Kindly create in your own google+ API and register this app's domain name there 
Create keys_dev.js file in config/ folder**

Install the dependencies and devDependencies and start the server.

```node
$ git clone
$ npm install
$ npm start
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
