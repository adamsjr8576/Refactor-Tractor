import UserFitness from "./UserFitness";
import userData from "../data/users";

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

  returnWeeklyNumOunces() {
    return this.userData.slice(-7).map(day => day.numOunces);
  }
  
  returnFriendsDailyFluidOunces() {
    return Math.floor(this.userData.reduce((totalOunces, dailyOunces) => {
      totalOunces += dailyOunces.numOunces;
      return totalOunces;
    }, 0) / this.userData.length);
}


}

export default Hydration;
