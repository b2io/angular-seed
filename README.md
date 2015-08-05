# angular-seed

## Setup

### Node.js

Download and install the latest [Node.js](https://nodejs.org/download/) installer for your platform (currently v0.12.7).

Once the installation is complete, you should be able to verify that `node` is installed properly by running:

```
$ node -v
```

### npm

Install the latest (beta) version of `npm` (currently v3.2.1) to address issues with `npm install` on some platforms (mostly Windows). If you're on Windows, you can simplify the upgrade to the latest `npm` via [npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade).

Once the installation is complete, you should be able to verify that `npm` is installed properly by running:

```
$ npm -v
```

### python

Several of the dependencies within node projects will require Python 2.7 to be available on your path. Download and install the [python](https://www.python.org/downloads/release/python-2710/) installer for your platform. There is a step in the installation that provides the option to add `python` to your path; make sure you turn that option on.

Once the installation is complete, you should be able to verify that Python was installed and added to your path by running:

```
$ python --version
```

### c++

One of the dependencies of `browser-sync` (`ws`) requires a few c++ tools to be present in order to build. They'll be built by `node-gyp` which has good instructions [here](https://github.com/TooTallNate/node-gyp#installation).

If you're running Windows 7 64bit, you'll need to install:

 * [Visual Studio Community 2013 with Update 3](https://go.microsoft.com/fwlink/?LinkId=532495&type=WEB&clcid=0x409)
 * [Windows 7 64-bit SDK](http://www.microsoft.com/en-us/download/details.aspx?id=8279)

## Common Gulp Tasks

* `gulp serve`: Run application
* `gulp test`: Run unit tests
* `gulp test:tdd`: Run unit tests with watch
