librato-propane
===============

A patch for the [Propane](http://propaneapp.com/) Campfire application that expands links to Librato instruments into live,
auto-refreshing charts through the magic of the [Librato Javascript
SDK](http://blog.librato.com/2012/10/embeddable-charts.html).

## Requirements
`librato-propane` leverages the [Javascript Responder
Callbacks](http://help.propaneapp.com/discussions/announcements/58-whats-new-in-120)
provided by [Propane](http://propaneapp.com/) so you must be running
Propane version 1.2.0 or higher.

## Installation
Append the contents of `librato-propane.js` to the `caveatPatchor.js` file
that Propane uses to load custom extensions:

````
$ cat ./librato-propane.js >> ~/Library/Application\ Support/Propane/unsupported/caveatPatchor.js
````

Now just restart Propane, and you're ready to go!

Note that if you're upgrading `librato-propane.js`, you'll need to open
`caveatPatchor.js` in your favorite text editor and overwrite the
previous version.

## Usage
Propane shares a cookie store with Safari, so this hack relies on your having a
current, authenticated session of the Librato account
whose instruments are being linked to in Campfire. So start by [logging into Librato in Safari](https://metrics.librato.com)
and (if necessary) switching into the correct account context.

Now whenever a link to a Librato instrument (e.g.
`https://metrics.librato.com/instruments/922`) is clicked in the Propane
client, it will expand in place to a live, embedded chart with
functioning tooltips and autorefresh enabled.
