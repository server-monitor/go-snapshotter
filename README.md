## Snapshotter

---

I made this web app for the purpose of learning Go and React. The app takes photos of websites then displays the photos
along with information about the website. The web addresses come from a JSON file. Some time in the future,
I'll probably add an API end-point or form to allow users to input their own addresses. For now, the list of web addresses
is fixed. The web addresses from the
[list of learning resources](https://github.com/fullstackla/pairing-meetup/blob/master/resources.md)
of the Full Stack LA meetup group.

# Requirement(s):

You'll have to install wkhtmltopdf/wkhtmltoimage.


# Setup

## Back-end

1. Install Go.

2. Install Go dependencies. There are a number of options out there. I'm using [gb](https://github.com/constabulary/gb)
   because it supports vendoring and because it is one of the
   [Go dependency managers that Heroku supports](https://devcenter.heroku.com/articles/go-dependencies-via-gb).

   The [gb documentation](https://getgb.io/) can explain far better than I can on how to setup gb in your environment.

3. Build the app.

4. Run the binary file produced by the build.


## Front-end

1. Install Node.

2. `cd frontend`

3. `npm install`


Point your browser to localhost:5000.




# Heroku Notes

Build pack pls...

heroku buildpacks:set 'https://github.com/heroku/heroku-buildpack-multi.git'
heroku buildpacks:set https://github.com/dscout/wkhtmltopdf-buildpack
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-go.git

$ heroku buildpacks:set https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-go

$ echo 'https://github.com/heroku/heroku-buildpack-go.git' >> .buildpacks
$ echo 'https://github.com/dscout/wkhtmltopdf-buildpack.git' >> .buildpacks

https://github.com/dscout/wkhtmltopdf-buildpack
$ heroku plugins:install https://github.com/heroku/heroku-repo.git
$ heroku repo:purge_cache -a appname

$ heroku stack

If you are on an older stack, you can upgrade to cedar-14 with:

$ heroku stack:set cedar-14
