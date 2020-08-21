# Wake Up 

Wake Up is a Node script that pings a website and logs a few basic
metrics about the site's response. It is meant to be configured as a cron job. 

## Motivation

Many developers host their side projects on [Heroku](https://heroku.com/). 
Heroku offers a free tier which provides a capped number of free  hours per
month, but one of the drawbacks is that your app will 
go to sleep after 30 minutes if it doesn't receive any traffic (see
[Heroku Pricing](https://www.heroku.com/pricing)). Waking a sleeping app 
involves starting the dyno (i.e. Linux container) the app is running on. Just
like starting your own computer, this takes several seconds. 
If you're a web developer and demonstrating your website to a potential client 
or employer, having it take 10 seconds to load will not win you much work.

So, then, how can you prevent your app from sleeping?  

There are several websites out there that claim to keep your Heroku app awake for you.
Just give them your URL, and they will ping your site periodically. 
I didn't want to go this route, however, for a couple reasons. First, I
didn't want to give a third-party control over how often my dyno is running.
Since I have a limited number of hours per month, and I could
potentially have several apps running on the free tier at any one time, I didn't
want any single app to have insomnia and burn through most of my hours. Second, as a
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

The script will write a few metrics from the request to a log file. Each line of ouput
has the following format:

```
Date, time, URL, res-status-code, res-time, res-body-size
```

If there is an error, the script will log the date, time, and an error message.

By default, the log file is named `wakeUp.js.log` and will be in the same 
directory as the script. If you wish to change the name or location of
the log file, simply edit the value of `logFile` in the function `logMessage`.

## Configuring a Cron Job 

### Ubuntu and macOS

You can set up a cron job by using the `crontab` program. To add your job,
enter `crontab -e` at the command line. You'll now be editing the file that
contains the cron jobs for your user account.

The syntax of a crontab command looks like this:

```
t1 t2 t3 t4 t5 path/to/command arg1 arg2 ... argN
```
where... 
- `t1` is minutes from 0-59, 
- `t2` is hours from 0-23 (midnight = 0), 
- `t3` is days from 1-31, 
- `t4` is months from 1-12, and 
- `t5` is days of the week from 0-6 (Sunday = 0)

and...
- an asterisk (\*) in any field means every period
- a dash (-) means a range of values
- a forward slash (/) means an increment.

For my cron job, I decided to have it run every 10 minutes. Here is what my
crontab file looks like:

```
PATH = /usr/bin:/bin:/path/to/node/bin
*/10 * * * * node /path/to/wakeUp.js http://example.com

```

A few things to note here...
1. On line 1, I appended to `PATH` the path to the folder which contains the
   Node executable. This is necessary so that the cron daemon 
   knows where to find the name `node` on line 2. To find the path to your 
   version of Node, enter `which node` on the command line. Alternatively, 
   rather than defining `PATH` on line 1, you could just give the 
   absolute path to the Node executable on line 2, i.e. replace `node` with 
   `/path/to/node`.
2. `*/10 * * * *` means to run the job every 10 minutes every day of the year. If I 
   wanted it to run every 30 minutes, I would do `*/30 * * * *`. If I wanted it
   to run every 10 minutes on weekdays only, I would do `*/10 * * * 1-5`.
3. The third line is empty. Each command in the crontab file must end in a
   newline character or it won't work.

After saving and closing the crontab file, you can go back to the folder that
contains the `wakeUp.js` script and look for the log file. If the cron job is
working properly, you will see new entries to the log at the increment that you
specified.

If it's not working, and you're on Ubuntu, you might check `/var/log/syslog` to 
see if the job is running. Specifically, try `$ grep CRON /var/log/syslog` to 
view only the logs related to cron. I don't believe macOS logs cron jobs by 
default, however. 

### Windows

The easiest way to set up a cron job on Windows is with the "Task Scheduler"
app. Here are the steps to take:

1. Go to "Start" > "Windows Administrative Tools" > "Task Scheduler", or go to
   "Start" and type "Task Scheduler".
2. Once the app opens, right click the `Task Scheduler Library` folder in the 
   left pane and select `New Folder...`. Name the folder whatever you'd like, 
   e.g. "My Tasks". This isn't a required step, but it helps keep the operating 
   system tasks separate from your own.
3. Select your newly created folder, and then go to the menu bar and select
   `Action` > `Create Task...`.
4. On the `General` tab, give your task a name and description. The other
   defaults are fine.
5. On the `Triggers` tab, select the `New...` button at the bottom. For the
   `Begin the task:` dropdown, select `On a schedule`. Next, select the
   `One time` radio button. In `Advanced Settings`, select the checkbox for
   `Repeat task every:` and change the time whatever increment you would
   like. (Just make sure it's less than 30 minutes if you want to keep your dyno
   awake.) Then change `for duration of:` to `Indefinitely`.
6. On the `Actions` tab, select `Start a program`. Enter the address to the Node
   executable in the `Program/script` input box. Make sure to wrap the address
   in quotes if it contains spaces, e.g. `"C:\Program Files\nodejs\node.exe"`.
   For the arguments input box, enter the address to the script and the 
   website you want to keep awake. I entered `C:\Projects\wake_up\wakeUp.js
   https://www.example.com`. (Note the space between the two arguments.)
7. On the `Conditions` tab, the defaults are fine.
8. On the `Settings` tab, I checked the box for `Run task as soon as possible
   after a scheduled start is missed` and left the others as default.
9. Finally, click `OK` to finish creating the task, and you should be good to go!

You can check the `wakeUp.js.log` file to make sure your task is running 
properly. If not, double check your arguments on the `Actions` tab and the 
schedule on the `Triggers` tab. Those are the two areas that gave me trouble.

## Author
- Michael Singhurse
- michaelsinghurse@gmail.com

