// const chai = require('chai');
import chai from "chai";
import spies from "chai-spies";
const expect = chai.expect;

import sleepData from '../data/sleep-test-data';
import userData from '../data/users-test-data';
import allSleepData from '../data/sleep';

import UserFitness from '../src/UserFitness'
import Sleep from '../src/Sleep';
import User from '../src/User';

chai.use(spies);

describe('Sleep', () => {

  let user, sleep, fullSleep;
  beforeEach(() => {
    user = new User(userData[0]);
    sleep = new Sleep(sleepData, user);
    fullSleep = new Sleep(allSleepData, user);
  })

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of the class Sleep', () => {
    expect(sleep).to.be.an.instanceOf(Sleep);
  });

  it('should return how many hours slept for a specific day', () => {
    expect(sleep.returnSleepInfo('2019/06/15', 'hoursSlept')).to.equal(6.1);
  });

  it('should return sleep quality for a specific day', () => {
    expect(sleep.returnSleepInfo('2019/06/15', 'sleepQuality')).to.equal(2.2);
  });

  it('should return hours slept each day for week for a specific user', () => {
    chai.spy.on(fullSleep, 'returnWeekOfData', () => {
      return [{
        "userID": 3,
        "date": "2019/06/15",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }, {
        "userID": 3,
        "date": "2019/06/16",
        "hoursSlept": 10.7,
        "sleepQuality": 3.4
      }];
    });
    expect(fullSleep.returnWeekOfSleepInfo('2019/06/24', 'hoursSlept')).to.eql([10.8, 10.7]);
  });

  it('should return quality sleep each day for week for a specific user', () => {
    chai.spy.on(fullSleep, 'returnWeekOfData', () => {
      return [{
        "userID": 3,
        "date": "2019/06/15",
        "hoursSlept": 10.8,
        "sleepQuality": 4.7
      }, {
        "userID": 3,
        "date": "2019/06/16",
        "hoursSlept": 10.7,
        "sleepQuality": 3.4
      }];
    });
    expect(fullSleep.returnWeekOfSleepInfo('2019/06/24', 'sleepQuality')).to.eql([4.7, 3.4]);
  });

});
