import UserFitness from "./UserFitness";

class Hydration extends UserFitness {
  constructor(hydrationData, user) {
    super(hydrationData, user);
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

  returnWeeklyNumOunces(date) {
    let dataDate = this.userData.map(data => data.date);
    let dateIndex = dataDate.lastIndexOf(date);
    return this.userData.slice(dateIndex - 7, dateIndex + 1).map(day => day.numOunces);
    // return this.userData.slice(-7).map(day => day.numOunces);
  }
}

export default Hydration;
