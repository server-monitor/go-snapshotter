## Snapshotter

---

I made this web app for the purpose of learning Go and React. The app takes photos of websites then displays the photos
along with information about the website. The web addresses come from a JSON file. Some time in the future,
I'll probably add an API end-point or form to allow users to input their own addresses. For now, the list of web addresses
is fixed. The web addresses from the
[list of learning resources](https://github.com/fullstackla/pairing-meetup/blob/master/resources.md)
of the Full Stack LA meetup group.

# Requirement(s):

1. Go and Node should be installed in your system. There are many tutorials out there on the subject.

2. You'll have to install wkhtmltopdf/wkhtmltoimage.


# Setup

Clone this repo and cd into the newly created repo dir.

## Back-end

1. Install Go dependencies. There are a number of options out there. I'm using [gb](https://github.com/constabulary/gb)
   because it supports vendoring and because it is one of the
   [Go dependency managers that Heroku supports](https://devcenter.heroku.com/articles/go-dependencies-via-gb).

   The [gb documentation](https://getgb.io/) can explain far better than I can on how to setup gb in your environment.

2. Build the app. Building the app will also depend on the Go dependency management tool that you are using.

3. Run the binary file produced by the build.


## Front-end

1. `cd frontend`

2. `npm install`

3. Configure backend to either remote or local. This configuration is found in [webpack.config.js file](frontend/webpack.config.js) => `module.exports` => `externals` => `config`.

4. `npm run test:once` # proceed if all tests pass.

5. `npm run compile` # this will produce a bundled JS file in frontend/www

  Point your browser to localhost:5000.

6. `npm run dev:hot` # to run the frontend dev server.

  Go to localhost:8080.
