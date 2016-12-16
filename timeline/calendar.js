
      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '1015943088021-uvgiu71ppb19619rnq80muaq9flj80k1.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.readonly"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listCalendars);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listCalendars() {
        var request = gapi.client.calendar.calendarList.list();

        request.execute(function(resp) {
          var cals = resp.items;

          appendPre('Calendars:');

          cals.sort(sortCalendars);

          if (cals.length > 0) {
            for (i = 0; i < cals.length; i++) {
              var cal = cals[i];
              var when = cal.id;
              
              appendPre(cal.summary + ' - ' + cal.id + " - " + cal.primary);
            }
          } else {
            appendPre('No calendars found.');
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var div = document.getElementById('output');
        
        pre.appendChild(textContent);
      }

      function sortCalendars(a,b)
      {
          if (a.primary === true)
          {
            return -1;
          }
          else if (b.primary === true)
          {
            return 1;
          }
          else if(a.summary > b.summary)
          {
              return 1;
          }
          else if (b.summary > a.summary)
          {
              return -1;
          }
          else
          {
              return 0;
          }
      }
    