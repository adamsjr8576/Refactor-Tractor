const chai = require('chai');
const expect = chai.expect;

import activityData from '../data/activity-test-data';
import userData from '../data/users-test-data';

import Activity from '../src/Activity';
import User from '../src/User';


describe('Activity', () => {
  let user;
  let activity;

  beforeEach(() => {
    user = new User(userData[0])
    activity = new Activity(activityData, user)
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should have access to userData', () => {
    expect(activity.user).to.eql(userData[0]);
  });

  it('should have access to activityData', () => {
    expect(activity.activityData).to.eql(activityData);
  });

  it('should return the number of steps for specific user for a specific day', () => {
    expect(activity.returnActivityDay("2019/06/17", 'numSteps')).to.equal(14329);
  });

  it('should return the miles walked by a specific user for a specific day', () => {
    expect(activity.returnMilesWalked()).to.equal(6.60);
  });

  it('should return number of flights of stairs climbed by a specific user for a specific day', () => {
    expect(activity.returnActivityDay("2019/06/17", 'flightsOfStairs')).to.equal(18);
  });

  it('should return the minutes active for a day', () => {
    expect(activity.returnActivityDay("2019/06/26", 'minutesActive')).to.equal(219);
  });

  it('should return the average minutes active for a week', () => {
    expect(activity.returnAverageForWeek("2019/06/25", 'minutesActive')).to.equal(180);
  });

  it('should return the average steps for a week', () => {
    expect(activity.returnAverageForWeek("2019/06/25", 'numSteps')).to.equal(8586);
  });

  it('should return the average flight of staris for a week', () => {
    expect(activity.returnAverageForWeek("2019/06/25", 'flightsOfStairs')).to.equal(20);
  });

  it('should return false if they did not meet their step goal for a date', () => {
    expect(activity.metStepGoal('2019/06/15')).to.equal(false);
  });


  it('should return true if they did  meet their step goal for a date', () => {
    expect(activity.metStepGoal("2019/06/17")).to.equal(true);
  });

  it('should return all days where exceeded step goal ', () => {
    expect(activity.returnAllStepGoalDays()).to.eql(['2019/06/17', '2019/06/22', '2019/06/23']);
  });

  it('should return alltime stair climbing record ', () => {
    expect(activity.returnStepRecord()).to.equal(36);
  });

  it('should return all friends\' step count for the week ', () => {
    expect(activity.returnFriendsCount('numSteps')).to.eql([56526, 46615, 63243]);
  });

  it('should return back the dates of what days had increasing steps for 3 or more days', () => {
    expect(activity.returnThreeDayStreak('numSteps')).to.eql(['2019/06/25', '2019/06/24', '2019/06/23']);
  });

  it('should return back the dates of what days had increasing floors climbed for 2 or more days', () => {
    expect(activity.returnTwoDayStreak('flightsOfStairs')).to.eql(['2019/06/26', '2019/06/25']);
  });

});
