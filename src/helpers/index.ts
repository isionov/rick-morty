import { debounce } from 'lodash';
import { QueryLazyOptions } from '@apollo/react-hooks';
import { EffectCallback } from 'react';
import { CharactersVars } from '../Types';

export const isOurPartyPerson = (name: string, who: string): boolean => {
  return name.includes(who);
};

export const mayRequest = (field: string): boolean => field.length > 2;

export const debouncedFetch = (
  hook: (options?: QueryLazyOptions<CharactersVars> | undefined) => void,
  name: string
): EffectCallback => () => {
  const cb = debounce((value: string) => {
    hook({ variables: { name: value } });
  }, 300);

  mayRequest(name) && cb(name);
  return cb.cancel;
};
