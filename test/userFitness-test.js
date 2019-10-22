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
    userFitness = new UserFitness(sleepData, user);
  });

  it('should be a function', () => {
    expect(UserFitness).to.be.a('function');
  });

  it('should have the userData', () => {
    expect(userFitness.userData).to.eql([ { userID: 1,
    date: '2019/06/15',
    hoursSlept: 6.1,
    sleepQuality: 2.2 },
  { userID: 1,
    date: '2019/06/16',
    hoursSlept: 4.1,
    sleepQuality: 3.8 },
  { userID: 1,
    date: '2019/06/17',
    hoursSlept: 8,
    sleepQuality: 2.6 },
  { userID: 1,
    date: '2019/06/18',
    hoursSlept: 10.4,
    sleepQuality: 3.1 },
  { userID: 1,
    date: '2019/06/19',
    hoursSlept: 10.7,
    sleepQuality: 1.2 },
  { userID: 1,
    date: '2019/06/20',
    hoursSlept: 9.3,
    sleepQuality: 1.2 },
  { userID: 1,
    date: '2019/06/21',
    hoursSlept: 7.8,
    sleepQuality: 4.2 },
  { userID: 1, date: '2019/06/22', hoursSlept: 7, sleepQuality: 3 },
  { userID: 1,
    date: '2019/06/23',
    hoursSlept: 7.8,
    sleepQuality: 1.5 },
  { userID: 1,
    date: '2019/06/24',
    hoursSlept: 8,
    sleepQuality: 1.3 },
  { userID: 1,
    date: '2019/06/25',
    hoursSlept: 5.1,
    sleepQuality: 3.7 } ]);
  });

  it('should return the week of data', () => {
    expect(userFitness.returnWeekOfData(1)).to.deep.equal(
    [ { userID: 1,
    date: '2019/06/19',
    hoursSlept: 10.7,
    sleepQuality: 1.2 },
  { userID: 1,
    date: '2019/06/20',
    hoursSlept: 9.3,
    sleepQuality: 1.2 },
  { userID: 1,
    date: '2019/06/21',
    hoursSlept: 7.8,
    sleepQuality: 4.2 },
  { userID: 1, date: '2019/06/22', hoursSlept: 7, sleepQuality: 3 },
  { userID: 1,
    date: '2019/06/23',
    hoursSlept: 7.8,
    sleepQuality: 1.5 },
  { userID: 1,
    date: '2019/06/24',
    hoursSlept: 8,
    sleepQuality: 1.3 },
  { userID: 1,
    date: '2019/06/25',
    hoursSlept: 5.1,
    sleepQuality: 3.7 } ]);
  });

  it('should return the week of dates', () => {
    expect(userFitness.returnWeek(1)).to.deep.equal(
      [ '2019/06/19',
      '2019/06/20',
      '2019/06/21',
      '2019/06/22',
      '2019/06/23',
      '2019/06/24',
      '2019/06/25' ]);
  });

});
