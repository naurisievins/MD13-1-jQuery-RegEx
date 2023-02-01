/**
 * @jest-environment jsdom
 */

import verifyRegistrationForm from './scripts';

const consoleSpy = jest.spyOn(console, 'log');
let totalCalls;

// Test empty input

describe('Check if fields are empty', () => {
  test('Should get empty fields in console case 1', () => {
    verifyRegistrationForm('', '', '');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 2', () => {
    verifyRegistrationForm('', '', 'a');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 3', () => {
    verifyRegistrationForm('', 'a', 'a');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 4', () => {
    verifyRegistrationForm('a', '', 'a');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 5', () => {
    verifyRegistrationForm('a', '', '');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 6', () => {
    verifyRegistrationForm('a', 'a', '');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get empty fields in console case 7', () => {
    verifyRegistrationForm('', 'a', '');
    expect(consoleSpy).toHaveBeenLastCalledWith('Empty fields');
  });
  test('Should get fields ok', () => {
    verifyRegistrationForm('a', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 3, 'Fields ok');
  });
});

// Test name input

describe('Test name input field', () => {
  test('Test name with 1 char (letter)', () => {
    verifyRegistrationForm('a', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 1 char (number)', () => {
    verifyRegistrationForm('3', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 1 char (symbol)', () => {
    verifyRegistrationForm('%', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 2 chars (letter)', () => {
    verifyRegistrationForm('na', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Name ok');
  });
  test('Test name with 2 chars (letter + number)', () => {
    verifyRegistrationForm('n2', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 2 chars (letter + symbol)', () => {
    verifyRegistrationForm('n@', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 2 chars (number + symbol)', () => {
    verifyRegistrationForm('1.', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 50 chars (letters)', () => {
    verifyRegistrationForm('aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeee', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Name ok');
  });
  test('Test name with 51 chars (letters)', () => {
    verifyRegistrationForm('aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeeeef', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with 51 chars (49 letters + 2 symbols)', () => {
    verifyRegistrationForm('aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeee@#', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
  test('Test name with latvian alphabet special letters', () => {
    verifyRegistrationForm('ņāāūū', 'a', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 2, 'Invalid name');
  });
});

// Test password input

describe('Test password input field', () => {
  test('Less than 8 characters', () => {
    verifyRegistrationForm('a', 'aA123@', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Invalid password');
  });
  test('More than 8 characters with correct pattern', () => {
    verifyRegistrationForm('a', 'aA123@1123', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Password ok');
  });
  test('More than 8 characters with incorrect pattern case 1', () => {
    verifyRegistrationForm('a', 'aA123a1123', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Invalid password');
  });
  test('More than 8 characters with incorrect pattern case 2', () => {
    verifyRegistrationForm('a', 'aA%#$#@$%@$', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Invalid password');
  });
  test('More than 8 characters with incorrect pattern case 3', () => {
    verifyRegistrationForm('a', '24424%#%#%#', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Invalid password');
  });
  test('More than 50 characters with correct pattern case 3', () => {
    verifyRegistrationForm('a', 'aaaaaaaaaabbbbbbbbbbccccccccccddddddddddeeeeeeeee@#123', 'a');
    totalCalls = consoleSpy.mock.calls.length;
    expect(consoleSpy).toHaveBeenNthCalledWith(totalCalls - 1, 'Password ok');
  });
});

// Test email input

describe('Test email input field', () => {
  test('invalid format case 1', () => {
    verifyRegistrationForm('a', 'a', 'a123@123.1@3');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 2', () => {
    verifyRegistrationForm('a', 'a', 'a123@123.1@3a');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 3', () => {
    verifyRegistrationForm('a', 'a', 'a123@123.1');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 4', () => {
    verifyRegistrationForm('a', 'a', 'a123@1.1');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 5', () => {
    verifyRegistrationForm('a', 'a', 'a123@fafga%.lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 6', () => {
    verifyRegistrationForm('a', 'a', 'a1^23@fafga.lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 6', () => {
    verifyRegistrationForm('a', 'a', 'a123fafga.@lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 6', () => {
    verifyRegistrationForm('a', 'a', 'a123fafga.@lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });
  test('invalid format case 7', () => {
    verifyRegistrationForm('a', 'a', 'Nauris,Ievins@gaaagaaa.lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Invalid email');
  });

  test('Valid format case 1', () => {
    verifyRegistrationForm('a', 'a', 'a123@42a14.lv');
    expect(consoleSpy).toHaveBeenLastCalledWith('Email ok');
  });
  test('Valid format case 2', () => {
    verifyRegistrationForm('a', 'a', 'Nauris.Ievins@4214gg.com');
    expect(consoleSpy).toHaveBeenLastCalledWith('Email ok');
  });
});

// Test if form is valid

describe('Test valid registration form', () => {
  test('Form is valid', () => {
    verifyRegistrationForm('Nauris', 'Nauris123@', 'nauris.ievins@kautkas.com');
    expect(consoleSpy).toHaveBeenLastCalledWith('Success');
  });
  test('Form is invalid case 1', () => {
    verifyRegistrationForm('N', 'Nauris123@', 'nauris.ievins@kautkas.com');
    expect(consoleSpy).not.toHaveBeenLastCalledWith('Success');
  });
  test('Form is invalid case 2', () => {
    verifyRegistrationForm('Nauris', 'Nauris', 'nauris.ievins@kautkas.com');
    expect(consoleSpy).not.toHaveBeenLastCalledWith('Success');
  });
  test('Form is invalid case 3', () => {
    verifyRegistrationForm('Nauris', 'Nauris123@', 'nauris.ievins');
    expect(consoleSpy).not.toHaveBeenLastCalledWith('Success');
  });
});
