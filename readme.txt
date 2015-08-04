Cone of Silence
----------------------------------------------------------------------
Cone of Silence for android, using cordova.


Setup
----------------------------------------------------------------------
Android SDK

  install the android SDK - details at http://cordova.apache.org
  * tools and platform-tools must be in the path
  * run the android SDK manager and ensure the correct android
    version API is installed
  * you will probably need to install ant and add it to the path

Tools

  npm install -g cordova
    - installs the cordova cli
  npm install -g grunt-cli
    - installs grunt
  npm install -g bower
    - installs bower

Libraries

  npm install
    - install node packages in package.json
  bower install
    - install bower managed libs in bower.json
  grunt initCordova
    - this will add the cordova plaforms & plugins
      generating all the cordova guff in /platforms
      and /plugins

Build and Run the Project
----------------------------------------------------------------------
  
  grunt build
    - generate dev version of /www
      which contains all the html etc to be deployed
    * grunt watch will generate the release version

  grunt buildCordova
    - runs the cordova build tool
      which will copy the current contents of /www into the
      /platforms directory

  grunt runCordova
    - run on attached android device
    * if you get INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES error
      its because the app is already installed on the device from
      some other source, so delete it and try again
    

Project structure
---------------------------------------------------------------------
The project was initially generated using the cordove CLI tool.
The angular app is structured according to https://github.com/ngbp/ngbp 

config.xml
  - metadata needed to generate and distribute the app
  - gets copied to each plaform in the platforms dir when
    you run the cordova build tool

hooks/
  - scripts to customize cordova commands

karma/
  - karma config to be read into the Gruntfile.js

platforms/
  - contains target platforms as subdirs
  - on a build the www directory gets copied into each target
    platform subdir, eg. platforms/android/assets/www

plugins/
  - contains any cordova plugins that have been installed
  - plugins are installed using the cordova cli
    eg.
    $ cordova plugin add cordova-plugin-console 

src/
  - the application code and unit tests

vendor/
  - third party libs

www/
  - the built app ready to be deployed 


Update cordova cli
---------------------------------------------------------------------
npm update -g cordova
  - update to latest version
cordova platform update android
  - after updating the cli you should do this

