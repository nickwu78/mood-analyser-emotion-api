# Microsoft Emotion API Project

This is a project i'm working on whilst following a [tutorial](https://onextrapixel.com/build-live-emotions-capture-app-using-emotions-api-part-ii/). Key skills that I wanted to practice include:

* HTML5 Canvas and handling webcam video inputs using getUserMedia()
* Making AJAX API calls
* Receiving JSON from API endpoint, formatting the data, and displaying it.
* General jQuery practice.

## Description

For this project, I built a website which assesses your emotions and mood.

Using your webcam, take a photo, then click the "Analyse" button. A request is sent to the Microsoft Cognitive Services server, passing the image through the Emotion API.

It will highlight the face that has been detected, and print out a set of statistics based on your mood in a number of categories including happiness, sadness, anger etc.

## Installation

You need to run a local webserver to use this project. Please install the [Chrome Web Server](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en)

Clone this repo, then choose the cloned repo folder and start the web server. You can access the page at:

`http://127.0.0.1:8887`

I have removed my emotion API key, please sign up an account and [request an API key](https://www.microsoft.com/cognitive-services/en-us/emotion-api), then add it to [YOUR API KEY HERE] in script.js

## To Do:

* Formatting and HTML work via a framework (Bootstrap? Materialise?)

* Integration with another API. Possible ideas include finding Spotify tracks based on mood, or displaying recommendations for shopping?