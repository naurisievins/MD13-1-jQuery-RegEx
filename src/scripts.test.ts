import verifyRegistrationForm from './scripts';

describe('Check fields', () => {
  test('Should be Empty fields', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    verifyRegistrationForm('', '', '');
    expect(consoleSpy).toHaveBeenCalledWith('Empty fields');
  });
});
