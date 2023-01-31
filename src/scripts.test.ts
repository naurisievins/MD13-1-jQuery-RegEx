/**
 * @jest-environment jsdom
 */

import verifyRegistrationForm from './scripts';

describe('Check if fields are empty', () => {
  test('Should get empty fields in console case 1', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('', '', '');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 2', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('', '', 'a');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 3', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('', 'a', 'a');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 4', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('a', '', 'a');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 5', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('a', '', '');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 6', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('a', 'a', '');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 7', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('', 'a', '');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
  test('Should get fields ok', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('a', 'a', 'a');
    expect(consoleSpy).toHaveBeenCalledWith('Fields ok');
  });
});
