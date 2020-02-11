import { isOurPartyPerson, mayRequest, debouncedFetch } from './index';
import sinon from 'sinon';

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

test('Hook will call after 300ms', () => {
  const clock: sinon.SinonFakeTimers = sinon.useFakeTimers();

  const myMock = jest.fn();
  const name = 'Rick';

  const debounced: Function = debouncedFetch(myMock, name);
  debounced()();
  expect(myMock).toHaveBeenCalledTimes(0);

  for (let i = 0; i < 10; i++) {
    const cancel = debounced();
    clock.tick(200);
    cancel();
  }
  expect(myMock).toHaveBeenCalledTimes(0);

  const cancel = debounced();
  clock.tick(500);
  cancel();

  expect(myMock).toHaveBeenCalledTimes(1);

  clock.restore();
});
