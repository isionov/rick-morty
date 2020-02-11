import { gqlFetch } from './index';
import sinon from 'sinon';

let clock: sinon.SinonFakeTimers;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('Hook will call after 300ms', () => {
  const myMock = jest.fn();
  const name = 'Rick';

  const debounced: Function = gqlFetch(myMock, name);
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
});
