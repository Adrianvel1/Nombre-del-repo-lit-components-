export class Utils {
  sum(num_1: number, num_2: number): number {
    if (typeof num_1 == "string" || typeof num_2 == "string") {
      return 0;
    }

    return num_1 + num_2;
  }

  resta(num_1: number, num_2: number) {
    if (num_1 <= 0 || num_2 <= 0) {
      throw new Error("Esto es una excepcion");
    }

    return (num_1 - num_2) * -1;
  }
  fizzBuzz(n: number): string[] {
    const result: string[] = [];

    for (let i = 1; i <= n; i++) {
      if (i % 15 === 0) {
        result.push("FizzBuzz");
      } else if (i % 3 === 0) {
        result.push("Fizz");
      } else if (i % 5 === 0) {
        result.push("Buzz");
      } else {
        result.push(i.toString());
      }
    }

    return result;
  }
}
