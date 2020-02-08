export const isOurPartyPerson = (name: string, who: string): boolean => {
  return name.includes(who);
};

export const mayRequest = (field: string): boolean => field.length > 2;
