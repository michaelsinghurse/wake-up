# Wake Up 

Wake Up is a Node script that pings a website and logs a few basic
metrics about the site's response. It is meant to be configured as a cron job. 

## Motivation

Many developers host their side projects on [Heroku](https://heroku.com/). 
Heroku offers a free tier which provides 550 free hours per month (or 1,000 if 
you verify with a credit card), but one of the drawbacks is that your app will 
go to sleep after 30 minutes if it doesn't have any traffic (see
[Heroku Pricing](https://www.heroku.com/pricing)). Waking a sleeping app 
involves starting the dyno (i.e. Linux container) the app is running on. Just
like starting your own computer, this takes several seconds to do. 
If you're a web developer and demonstrating your website to a potential client 
or employer, having your website take 10 seconds to load will not win you much 
work.

So, then, how can you prevent your app from sleeping?  

There are several websites out there that claim to keep your Heroku app awake for you.
Just give them your URL, and they will ping your site periodically. 
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

## Configuring a Cron Job 

### Ubuntu

You can set up a cron job by using the `crontab` program. To add your job,
enter `crontab -e` at the command line. You'll now be editing the file that
contains the cron jobs for your username.

The syntax of a crontab command looks like this:

```
t1 t2 t3 t4 t5 path/to/command arg1 arg2 ... argN
```
where... 
- t1 is minutes from 0-59, 
- t2 is hours from 0-23 (midnight = 0), 
- t3 is days from 1-31, 
- t4 is months from 1-12, and 
- t5 is days of the week from 0-6 (Sunday = 0)

and...
- an asterisk * in any field means every period
- a dash - means a range of values
- a slash / means an increment.

For my cron job, I decided to have it run every 10 minutes. Here is what my
crontab looks like:

```
PATH = /usr/bin:/bin:/home/michael/.nvm/versions/node/v13.11.0/bin
*/10 * * * * node /home/michael/projects/wake_up/wakeUp.js
https://salestaxsearch.com

```

Notes:
1. I had to include the `PATH` definition on line 1 so that the cron daemon that
   runs the job knows where to find the program `node` on line 2. I tell it to look
   in the `home/michael/.nvm/...` folder. To find where your version of node is
   located, type `which node` on the command line.
2. `*/10 * * * *` means to run the job every 10 minutes every day. If I 
   wanted it to run every 30 minutes, I would do `*/30 * * * *`. If I wanted it
   to run every 10 minutes on weekdays only, I would do `*/10 * * * 1-5`.
3. The third line is empty. Each command in the crontab file must end in a
   newline character or the daemon won't run it.


### macOS

### Windows 10
