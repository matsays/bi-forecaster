# bi-forecaster
5-Day Weather Forecast App

--
PROJECT PARAMETERS
Please build a one page application displaying a 5 day weather forecast for a location.  The data might look something like the information provided by  http://openweathermap.org/forecast5. Use ES6/HTML5/CSS3/JavaScript to create your solution. You are free to use whatever frameworks and such that you like.

You should:
- Give some thought to what will make for a good user experience.
- Ensure your code works on the following browsers (only needs to support the last two major versions for each browser): Safari, Chrome, Firefox and Internet Explorer
- Produce a responsive page
- Please ensure that what you do implement is good quality code using best practices and runs without any bugs, crashes or issues
- Be prepared to discuss any tradeoffs and/or compromises you make

Please upload your code to GitHub (https://github.com) - you can create a free account if needed. Please make sure the GitHub project is public and respond back to us with the URL for the project.

All submissions should be viewable standalone on standard browsers and can also be hosted by yourself if you like. Any environment or build steps required should be documented in a README markdown file.  Installation of global packages is discouraged.
--
USER JOURNEY (ABBREVIATED)
- User lands on page
- User provides location
  - Free-form text entry, autofill on 3 alpha-char
  - Accept zip or city
    - If no match, respond with 'data not available for location'
- 5-day forecast provided
  - Location field should contain current entry, clear on focus
  - Location should be denoted within context
  - Image based primary denotation
--
NOTATIONS
- This master calls directly to the API. Because of free access limits, you may experience no response (401). If so, you can uncomment line 119 in assets/js/main.js
  - There is a publicly accessible implementation at matsays.com/bi-forecast/ calling sample data (local XML) to illustrate the output.
- I did not bother to do the autofill or drop-down, nor did I provide for a zip-based response, this is just exemplary
