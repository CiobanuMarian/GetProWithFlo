export enum exerciseType {
    Aerobic = "Aerobic",
    Strength = "Strength",
    Stretching = "Stretching",
    Balance = "Balance",
}


export namespace Exercises {

    export function keys(): Array<string>{
      var keys = Object.keys(exerciseType);
      return keys.slice(keys.length / 2, keys.length-1);
    }
  }