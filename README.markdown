#jquery.tapClick

This plugin should solve your unresponsive slow taps on touch devices. Made to intercept jquery click events. Supports normal events and delegates.

## Usage

    // Initialize tapClick
    $.tapClick();

    // Bind events
    $('.button').on('click', handler);

## Usage with Modernizr
You can use any test you'd like to initialize tapClick. Here's an example using [Modernizr](http://modernizr.com "Go to Modernizr website").

    // Initialize tapClick if touch
    Modernizr.touch && $.tapClick();

    // Bind events
    $('.button').on('click', handler);