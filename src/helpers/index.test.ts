import { isOurPartyPerson, mayRequest } from './index';

test('Check Rick A is our party character Rick', () => {
  expect(isOurPartyPerson('Rick A', 'Rick')).toBe(true);
});

test('Check Rick A is not our party character rick', () => {
  expect(isOurPartyPerson('Rick A', 'rick')).toBe(false);
});

test('I may request with passed field', () => {
  expect(mayRequest('ric')).toBe(true);
});

test('I may not request with passed field', () => {
  expect(mayRequest('ri')).toBe(false);
});
