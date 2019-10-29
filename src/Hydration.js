import UserFitness from "./UserFitness";
import userData from "../data/users";

class Hydration extends UserFitness {
  constructor(hydrationData, user) {
    super(hydrationData, user);
  }

  returnDailyFluidOunces(date) {
    return this.userData.find(ounces => ounces.date === date).numOunces
  }

  returnWeeklyNumOunces(date) {
    let dataDate = this.userData.map(data => data.date);
    let dateIndex = dataDate.lastIndexOf(date);
    return this.userData.slice(dateIndex - 7, dateIndex + 1).map(day => day.numOunces);
   }

}

export default Hydration;
