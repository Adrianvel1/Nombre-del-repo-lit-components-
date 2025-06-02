import { expect } from "@open-wc/testing";
import { Utils } from "./service/utils";

describe("Pruebas de Utils", () => {
  let utils_service: Utils;

  beforeEach(() => {
    utils_service = new Utils();
  });
  describe("My Primera prueba", () => {
    it("Mi primera prueba", () => {
      expect(true).equal(true);
    });

    it("Test functions sum", () => {
      const utils_service = new Utils();

      const result: number = utils_service.sum(10, 5);

      expect(result).equal(15);

      const result_2: number = utils_service.sum(10, 10);

      expect(result_2).equal(20);
    });

    it("Test functions with other type", () => {
      let other_type: any = "Hola";

      const utils_service = new Utils();

      const result = utils_service.sum(other_type, 20);

      expect(result).equal(0);

      const result_2 = utils_service.sum(20, other_type);

      expect(result_2).equal(0);
    });

    it("Test function - restar", () => {
      const utils_service = new Utils();

      const result = utils_service.resta(10, 20);

      expect(result).equal(10);
    });

    it("Test function should throw exception - restar ", () => {
      const utils_service = new Utils();
      expect(() => utils_service.resta(-10, 20)).to.throw();

      try {
        utils_service.resta(-20, 10);
      } catch (error: any) {
        expect(error.message).equal("Esto es una excepcion");
      }
    });
  });

  describe("Pruebas de fizzBuzz()", () => {
    it("Debe devolver 'Fizz' para múltiplos de 3", () => {
      expect(utils_service.fizzBuzz(3)[2]).to.equal("Fizz");
    });

    it("Debe devolver 'Buzz' para múltiplos de 5", () => {
      expect(utils_service.fizzBuzz(100)[99]).to.equal("Buzz");
    });

    it("Debe devolver 'FizzBuzz' para múltiplos de 15", () => {
      expect(utils_service.fizzBuzz(30)[29]).to.equal("FizzBuzz");
    });
  });
});
