import $ from 'jquery';

import UserRepo from "./UserRepo";
import User from "./User";
import Hydration from "./Hydration";
import Sleep from "./Sleep";
import SleepRepo from "./SleepRepo";
import Activity from "./Activity";
import ActivityRepo from "./ActivityRepo";

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';
import './css/normalize.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/appointment.svg'
import './images/drop.svg'
import './images/footsteps-silhouette-variant.svg'
import './images/goal.svg'
import './images/logo.png'
import './images/moon.svg'
import './images/road.svg'
import './images/screencapture.png'
import './images/stopwatch.svg'
import './images/trophy.svg'
import './images/team.svg'

var Packery = require('packery');

function getData(type) {
	const root = 'https://fe-apps.herokuapp.com/api/v1/fitlit/1908/';
	const url = `${root}${type}`;
	const promise = fetch(url)
	                .then(data => data.json());
	return promise;
}

function clearField() {
  $('.success-message').css('display', 'none')
  $('.failure-message').css('display', 'none')
}

getData('users/userData').then(function(userData) {

//Generate random user
const uniqueUserIndex = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

//Repo variables
const userRepo = new UserRepo(userData.userData);

//Individual Class Repos
const user = new User(userData.userData[uniqueUserIndex]);

function formatDate(date) {
  var monthNames = [
    "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "10",
    "11", "12"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return year + '/' + monthNames[monthIndex] + '/' + day;
}

  const date = formatDate(new Date());
	const dateObject = new Date(date);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}

	const formattedDate = dateObject.toLocaleString('en', options);

	$('.date').text(`${formattedDate}`);

function dropYear(dates) {
  const reformattedDates = dates.map(date => {
    const splitDate = date.split('/');
    return [splitDate[1], splitDate[2]].join('/');
  })
  return reformattedDates
}

  //Packery Items

  var pckry = new Packery( '#grid', {
  itemSelector: '.grid-item',
    columnWidth: 30,
    rowHeight: 30,
    gutter: 10,
});

  // Function to find user name
  function findUserName(id) {
    return userRepo.data.find(user => user.id === id).name;
  }

  //User Section
  $('#username').text(`${user.returnUserName()}`)

//Hydration
getData('hydration/hydrationData').then(function(hydrationData) {
  const hydration = new Hydration(hydrationData.hydrationData, user);

  $('#water-consumed').text(`${hydration.returnDailyFluidOunces(date)} Ounces \n\n`);

  const weeklyOuncesChart = new Chart(document.getElementById('water-consumed-week').getContext('2d'), {
    type: 'horizontalBar',
    data: {
      labels: dropYear(hydration.returnWeek(date)),
      datasets: [{
        data: hydration.returnWeeklyNumOunces(date),
        backgroundColor: [
          'rgba(92, 117, 218, 0.9)',
          'rgba(242, 188, 51, 0.9)',
          'rgba(126, 221, 255, 0.9)',
          'rgba(92, 117, 218, 0.9)',
          'rgba(242, 188, 51, 0.9)',
          'rgba(126, 221, 255, 0.9)',
          'rgba(92, 117, 218, 0.9)',
					'rgba(242, 188, 51, 0.9)'
        ],
      }]
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: '# of Ounces'
          }
        }]
      }
    }
  });

  //User Hydration Input
  $('#hydration-input-button').click(hydrationHandler);

  function hydrationHandler() {
    let ounceInput = Number($('#user-hydration-oz').val());

    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.id,
        date: date,
        numOunces: ounceInput
      })
    })
    .then(response => response.json())
    .then(data => $('#water-consumed').text(`${data.numOunces} Ounces \n\n`))
    .then($('#hydration-input-button').before('<p class="success-message">Data Submitted Successfully!</p>'))
    .catch($('#hydration-input-button').before('<p class="failure-message">Input Correct Data!</p>'));
    $('#user-hydration-oz').val('');
    setTimeout(clearField, 1600);
  }



	function insertFriendHydro() {
		let userIDs = user.friends;
		let list = `<ul class="friends_ul">`
			userIDs.forEach(userID => {
				let userName = findUserName(userID);
				const userFriend = new User(userData.userData[userID]);
				const hydrationFriend = new Hydration(hydrationData.hydrationData, userFriend);
				list += `<li class="friends_li">
						 <p class="data-text"><b>${userName}</b>:</p>
						 <p class="data-text border-bottom">${hydrationFriend.returnAvgInfo('numOunces')} Ounces</p>
						 </li>`;
			});
			list += `</ul>`;
			return list;
		}

		$('.friend-hydro-button').on( "click", function() {
			$('.friends_ul').remove();
			$('#friends-data').text('Weekly Hydration').after(`${insertFriendHydro()}`);
		});
	});

  //Sleep
getData('sleep/sleepData').then(function(sleepData) {
  const sleepRepo = new SleepRepo(sleepData.sleepData);
  const sleep = new Sleep(sleepData.sleepData, user);

  $('#hours-slept-day').text(`${sleep.returnSleepInfo(date, 'hoursSlept')} Hours | ${sleep.returnSleepInfo(date, 'sleepQuality')} Quality`);
  const weeklySleepChart = new Chart(document.getElementById('sleep-week').getContext('2d'), {
    type: 'line',
    data: {
      labels: dropYear(sleep.returnWeek(date)),
      datasets: [{
        data: sleep.returnWeekOfSleepInfo(date, 'hoursSlept'),
        label: "Sleep Hours",
        borderColor: "rgba(92, 117, 218, 0.9)",
        fill: false,
        lineTension: 0.1
      },
      {
        data: Array(8).fill(sleep.returnAvgInfo('hoursSlept')),
        label: "Average Hours of Sleep",
        borderColor: "rgba(92, 117, 218, 0.9)",
        fill: false,
        borderDash: [10, 5]
      },
      {
        data: sleep.returnWeekOfSleepInfo(date, 'sleepQuality'),
        label: "Quality of Sleep",
        borderColor: "rgba(242, 188, 51, 0.9)",
        fill: false,
        lineTension: 0.1
      },
      {
        data: Array(8).fill(sleep.returnAvgInfo('sleepQuality')),
        label: "Average Quality of Sleep",
        borderColor: "rgba(242, 188, 51, 0.9)",
        fill: false,
        borderDash: [10, 5]
      }
      ]

    },
    options: {
      elements: {
        point: {
          radius: 0
        }
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "rgba(92, 117, 218, 0.9)"
          },
          scaleLabel: {
            display: true,
            labelString: 'hours'
          },

        }, {
          id: 'Quality of Sleep',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 10,
            fontColor: "rgba(242, 188, 51, 0.9)"
          },
          scaleLabel: {
            display: true,
            labelString: 'quality'
          }
        }]
      }
    }
  });
  $('#longest-sleepers').text(`${findUserName(sleepRepo.returnWeeklyLongestSleepers(date)[1])}: ${sleepRepo.returnWeeklyLongestSleepers(date)[0]} Hours`);

	function insertFriendSleep() {
		let userIDs = user.friends;
		let list = `<ul class="friends_ul">`
			userIDs.forEach(userID => {
				let userName = findUserName(userID);
				const userFriend = new User(userData.userData[userID]);
				const sleepFriend = new Sleep(sleepData.sleepData, userFriend);
				list += `<li class="friends_li">
						 <p class="data-text"><b>${userName}</b>:</p>
						 <p class="data-text border-bottom">${sleepFriend.returnAvgInfo('sleepQuality')} Sleep Quality</p>`;
			});
			list += `</ul>`;
			return list;
		}

		$('.friend-sleep-button').on( "click", function() {
			$('.friends_ul').remove();
			$('#friends-data').text('Weekly Sleep').after(`${insertFriendSleep()}`);
		});

});

//User Sleep Input
$('#sleep-input-button').click(sleepHandler);

  function sleepHandler() {
    let hoursInput = Number($('#user-sleep-hours').val());
    let qualityInput = Number($('#user-sleep-quality').val())

    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.id,
        date: date,
        hoursSlept: hoursInput,
        sleepQuality: qualityInput
      })
    })
    .then(response => {
			if (response.ok) {
				$('#sleep-input-button').before('<p class="success-message">Data Submitted Successfully!</p>')
				return response.json();
			} else {
				return Promise.reject('something went wrong!');
			}
		})
    .then(data => {
			$('#hours-slept-day').text(`${data.hoursSlept} Hours | ${data.sleepQuality} Quality`)
		})
    .catch(err => {
			$('#sleep-input-button').before('<p class="failure-message">Input Correct Data!</p>')
		});
    $('#user-sleep-hours').val('');
    $('#user-sleep-quality').val('');
    setTimeout(clearField, 1600);
  }

  //Activity Section
getData('activity/activityData').then(function(activityData) {
  const activityRepo = new ActivityRepo(activityData.activityData, userRepo.data);
  const activity = new Activity(activityData.activityData, user);
  var bar = new ProgressBar.Circle('#number-of-steps-day', {
    color: '#aaa',
    svgStyle: {
      display: 'block',
      width: '100%'
    },
    strokeWidth: 12,
    trailWidth: 8,
    easing: 'easeInOut',
    duration: 1400,
    text: {
      autoStyleContainer: true
    },
    from: {
      color: '#fff940',
      width: 4
    },
    to: {
      color: '#f2bc33',
      width: 10
    },

    step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = circle.value();
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(`${activity.returnActivityDay(date, 'numSteps')} steps`);
      }
    }

  });

  let percentSteps = activity.returnActivityDay(date, 'numSteps') / user.dailyStepGoal;
  bar.animate(percentSteps > 1 ? percentSteps = 1 : percentSteps); // Number from 0.0 to 1.0

  $('#number-of-steps-goal').text(`${user.dailyStepGoal}`);
  $('#avg-number-of-steps-goal').text(`${userRepo.returnAverageStepGoal()}`);
  $('#number-of-minutes-active-day').text(`${activity.returnActivityDay(date, 'minutesActive')}`);
  $('#average-minutes-active').text(`${activityRepo.returnAverage(date, 'minutesActive')}`)
  $('#distance').text(`${activity.returnActivityDay(date, 'numSteps')}`);
  $('#average-distance').text(`${activityRepo.returnAverage(date, 'numSteps')}`)
  $('#stairs').text(`${activity.returnActivityDay(date, 'flightsOfStairs')}`);
  $('#average-stairs').text(`${activityRepo.returnAverage(date, 'flightsOfStairs')}`)
  $('#distance-in-miles').text(`${activity.returnMilesWalked()} Miles`);
  $('#most-active').text(`${activityRepo.returnMostActive()[0]}: ${activityRepo.returnMostActive()[1]} Minutes`);
  $('#week-review-minutes').text(`${activity.returnAverageForWeek(date, 'minutesActive')} Minutes Active`);
  $('#week-review-steps').text(`${activity.returnAverageForWeek(date, 'numSteps')} Number of steps`);
  $('#week-review-stairs').text(`${activity.returnAverageForWeek(date, 'flightsOfStairs')} flightsOfStairs`);

$("#activity-input-button").click(activityHandler);

function activityHandler() {
	let stepsInput = Number($("#user-steps").val());
	let flightOfStairsInput = Number($("#user-stairs").val());
	let minutesActiveInput = Number($("#user-minutes").val());

	fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userID: user.id,
			date: date,
			numSteps: stepsInput,
			minutesActive: minutesActiveInput,
			flightsOfStairs: flightOfStairsInput
		})
	})
	.then(response => {
		if (response.ok) {
			$("#activity-input-button").before('<p class="success-message">Data Submitted Successfully!</p>')
			return response.json();
		} else {
			return Promise.reject('something went wrong!');
		}
	})
	.then(data => {
		$("#number-of-minutes-active-day").text(`${data.minutesActive}`)
		$("#distance").text(`${data.numSteps}`)
		$("#stairs").text(`${data.flightsOfStairs}`)
	})
	.catch(err => {
		$("#activity-input-button").before('<p class="failure-message">Input Correct Data!</p>')
	});
	$("#user-steps").val('');
	$("#user-stairs").val('');
	$("#user-minutes").val('');
	setTimeout(clearField, 1600);
}

  // Friends

	function insertFriendActivity(property, text) {
		let userIDs = user.friends;
		let list = `<ul class="friends_ul">`;
		userIDs.forEach((userID, index) => {
			let userName = findUserName(userID);
			const activity = new Activity(activityData.activityData, user);
			list += `<li class="friends_li">
						 <p class="data-text friends-step"><b>${userName}</b>:</p>
						 <p class="data-text friends-step border-bottom">${activity.returnFriendsCount(property)[index]} ${text}</p>`;
		});
		list += `</ul>`;
		return list;
	}

  $('#friends-data').text('Weekly Steps').after(`${insertFriendActivity('numSteps', 'steps')}`);

  $('.friend-stairs-button').on( "click", function() {
    $('.friends_ul').remove();
    $('#friends-data').text('Weekly Stairs').after(`${insertFriendActivity('flightsOfStairs', 'stairs')}`);
  });

  $('.friend-steps-button').on( "click", function() {
    $('.friends_ul').remove();
    $('#friends-data').text('Weekly Steps').after(`${insertFriendActivity('numSteps', 'steps')}`);
  });

  // Challenges

  function insertStepStreak() {
    let stepContainer = `<div class="border-bubble">`;
    activity.returnThreeDayStreak('numSteps').forEach(day => {
      stepContainer += `<p class="data-text"> ${day}</p>`;
    });
    stepContainer += `</div>`;
    return stepContainer;
  }

  $('#increase-step-header').after(`${insertStepStreak()}`);

  function insertStairStreak() {
    let stairContainer = `<div class="border-bubble">`;
      activity.returnTwoDayStreak('flightsOfStairs').forEach(day => {
      stairContainer += `<p class="data-text"> ${day}`
    })
    stairContainer += `</div>`;
    return stairContainer;
  }

  $('#increasing-stairs-container').after(`${insertStairStreak()}`);

  });
});
