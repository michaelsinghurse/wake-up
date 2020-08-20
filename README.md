# wake-up

Node script to ping a website.

## Motivation

Many developers, including me, host their side projects on [Heroku](https://heroku.com/). 
Heroku offers a free tier which provides 550 free hours per month (or 1,000 if 
you verify with a credit card), but one of the drawbacks is that your app will 
go to sleep if it doesn't have any traffic in 30 minutes. Waking a sleep app 
involves starting the dyno (i.e. Linux container) the app is running on. I've 
seen a sleeping app take over 20 seconds to load. If you're a developer, and 
you're demonstrating your website to a potential client or employer, having 
your website take 20 seconds to load will win you much work.

So, then, how can you prevent your app from sleeping? One way to do is to simply
to go to your website before demo'ing it to someone. Say if you have an interview 
in a few minutes, pull out your phone and browse to your website to wake it up.
But what if you don't know when people will be viewing your website? A simple Google 
search will reveal a few websites that claim to keep your Heroku dyno awake for you.
All you need to do is given them your url and they will ping your site every so
often. I didn't want to go this route because I didn't want to give them
control over how often they pinged my site. The free hours have a cap, and I was
afraid that they would keep my app awake all night and use up all my free hours. I
only wanted it to be awake more or less during the business day. Plus, I
thought, I could easily write my own cron job to keep the site awake.

## Specs


## Installation

### Linux Ubuntu

### macOS

### Windows 10
