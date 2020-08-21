# Wake Up 

Wake Up is a Node script that pings a website and logs a few basic
metrics about the site's response. It is meant to be configured as cron job. 

## Motivation

Many developers, myself included, host their side projects on [Heroku](https://heroku.com/). 
Heroku offers a free tier which provides 550 free hours per month (or 1,000 if 
you verify with a credit card), but one of the drawbacks is that your app will 
go to sleep after 30 minutes if it doesn't have any traffic (see
[Heroku Pricing](https://www.heroku.com/pricing)). Waking a sleep app 
involves starting the dyno (i.e. Linux container) the app is running on. Just
like starting your own computer, this takes several seconds to do. 
If you're a web developer and demonstrating your website to a potential client 
or employer, having your website take 10 seconds to load will not win you much 
work.

So, then, how can you prevent your app from sleeping? With a simple Google 
search, you can find websites that claim to keep your Heroku app awake for you.
All you need to do is given them your url, and they will ping your site every so
often. I didn't want to go this route, however, for two reasons. The first is I
didn't want to give a third-party control over how often my dyno is running.
Given that I only have a fixed number of hours per month, and I could
potentially have several apps running on the free tier at any one time, I didn't
want any apps to have insomnia and burn through all my hours. The second reason I
didn't want to use one of these services is because I wanted to do it myself.
As a relative newcomer to the Ubuntu operating system, I have never set up a
cron job, and I thought this was a perfect opportunity to learn how. 

## Specs


## Installation

I set up cron jobs and tested the script on Linux, Mac, and Windows machines, and 
would like to provide some details on how you can do so as well. The first 
step for each of these is downloading the code and making sure you have Node installed. 

### Linux Ubuntu

### macOS

### Windows 10
