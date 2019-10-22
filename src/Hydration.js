import UserFitness from "./UserFitness";

class Hydration extends UserFitness {
  constructor(hydrationData, userID) {
    super(hydrationData, userID);
  }

  returnAverageFluidOunces() {
    return Math.floor(this.userData.reduce((totalOunces, dailyOunces) => {
      totalOunces += dailyOunces.numOunces;
      return totalOunces;
    }, 0) / this.userData.length);
  }

  returnDailyFluidOunces(date) {
    return this.userData.find(ounces => ounces.date === date).numOunces
  }

  returnWeeklyNumOunces() {
    return this.userData.slice(-7).map(day => day.numOunces);
  }
}

export default Hydration;
