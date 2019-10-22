const chai = require('chai');
const expect = chai.expect;

import hydrationData from '../data/hydration-test-data';
import userData from '../data/users-test-data';

import UserFitness from '../src/UserFitness'
import Hydration from '../src/Hydration';
import User from '../src/User';


describe('Hydration', () => {
  let hydration;
  let user;

  beforeEach(() => {
    user = new User(userData[0])
    hydration = new Hydration(hydrationData, user)
  });

  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of the class Hydration', () => {
    expect(hydration).to.be.an.instanceOf(Hydration);
  });

  it('should return the dates for the last week', () => {
    expect(hydration.returnWeek(1)).to.eql(
      [
        "2019/06/16",
        "2019/06/17",
        "2019/06/18",
        "2019/06/19",
        "2019/06/20",
        "2019/06/21",
        "2019/06/22"
      ])
  });

  it('should return the average fluid ounces for a user for all time', () => {
    expect(hydration.returnAverageFluidOunces()).to.equal(62);
  });

  it('should return the amount of fluid ounces consumed on a specific date for a specific person', () => {
    expect(hydration.returnDailyFluidOunces('2019/06/15')).to.equal(37);
  });

  it('should return the amount of ounces consumed for one person over a week', () => {
    expect(hydration.returnWeeklyNumOunces(1)).to.eql([69, 96, 61, 91, 50, 50, 43]);
  });



})
