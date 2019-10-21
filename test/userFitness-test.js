const chai = require('chai');
const expect = chai.expect;

import activityData from '../data/activity-test-data';
import sleepData from '../data/sleep-test-data';
import hydrationData from '../data/hydration-test-data';
import userData from '../data/users-test-data';

import User from '../src/User';
import UserFitness from '../src/UserFitness'


describe('UserFitness', () => {
  let user;
  let userFitness;

  beforeEach(() => {
    user = new User(userData[0])
    userFitness = new UserFitness(sleepData, activityData, hydrationData, user.id)
  });

  it('should be a function', () => {
    expect(UserFitness).to.be.a('function');
  });

  it('should have access to the user ID', () => {
    expect(userFitness.userID).to.eql(1);
  });

});
