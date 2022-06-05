import { CalculController } from "./calculatrice.controller";

describe('Test person.ts', () => {
    let controller: CalculController;

    beforeEach(() => controller = new CalculController());
    test('test for simple addition', () => {
        expect(controller.calcFromString("2+2")).toBe(4);
    });
    test('test for simple substraction', () => {
        expect(controller.calcFromString("4-2")).toBe(2);
    });
    test('test for simple multiplication', () => {
        expect(controller.calcFromString("3x2")).toBe(6);
    });
    test('test for simple division', () => {
        expect(controller.calcFromString("6÷2")).toBe(3);
    });
    test('test priority between addition division', () => {
        expect(controller.calcFromString("5+6÷2")).toBe(8);
    });
    test('test priority between addition multiplication', () => {
        expect(controller.calcFromString("5+6x2")).toBe(17);
    });
    test('test left right priority for addition subtraction', () => {
        expect(controller.calcFromString("5+6-2")).toBe(9);
    });
    test('test left right priority for multiplication division', () => {
        expect(controller.calcFromString("5x6÷2")).toBe(15);
    });
    test('test division by zero', () => {
        expect(controller.calcFromString("5÷0")).toBe(Infinity);
    });
    test('test float numbers', () => {
        expect(controller.calcFromString("2.2+2.2")).toBe(4.4);
    });
    test('test dot when no number before and after', () => {
        expect(controller.calcFromString(".+2")).toBe(2);
    });
    test('test twice dot when no number before and after', () => {
        expect(controller.calcFromString(".+.")).toBe(0);
    });
});