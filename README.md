# Wake Up 

Wake Up is a Node script that pings a website and logs a few basic
metrics about the site's response. It is meant to be configured as a cron job. 

## Motivation

Many developers host their side projects on [Heroku](https://heroku.com/). 
Heroku offers a free tier which provides 550 free hours per month (or 1,000 if 
you verify with a credit card), but one of the drawbacks is that your app will 
go to sleep after 30 minutes if it doesn't have any traffic (see
[Heroku Pricing](https://www.heroku.com/pricing)). Waking a sleep app 
involves starting the dyno (i.e. Linux container) the app is running on. Just
like starting your own computer, this takes several seconds to do. 
If you're a web developer and demonstrating your website to a potential client 
or employer, having your website take 10 seconds to load will not win you much 
work.

So, then, how can you prevent your app from sleeping?  

There are several websites out there that claim to keep your Heroku app awake for you.
Just give them your url, and they will ping your site periodically. 
I didn't want to go this route, however, for a couple reasons. First, I
didn't want to give a third-party control over how often my dyno is running.
Since I have a limited number of hours per month, and I could
potentially have several apps running on the free tier at any one time, I didn't
want any single app to have insomnia and burn through all my hours. Second, as a
relative newcomer to the Ubuntu operating system, I had never set up a cron job,
and I saw this as a wonderful opportunity to learn how.

## Getting Starting 

Simply download the `wakeUp.js` file and run it with Node. It takes one
argument, the URL for the website you want to ping. Be sure to include the
scheme (http or https).

From the command line:

```
$ node wakeUp.js http://www.example.com/
```

The script will log the results of the request to a log file. Each line of ouput
has the following format:

```
Date, time, URL, res-status-code, res-time, res-body-size
```

If there is an error, the script will log the date, time, and error message.

By default, the log file is named `wakeUp.js.log` and will be in the same 
directory as the script. If you wish to change the name or location of
the log file, edit the value of `logFile` in the function `logMessage`.

## Configuring Cron Job 

I set up cron jobs and tested the script on Linux, Mac, and Windows machines, and 
would like to provide some details on how you can do so as well. The first 
step, of course, for each of these is downloading the script and making sure
you have Node installed. 

### Ubuntu

### macOS

### Windows 10
