import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  const promesse = [signUpUser(firstName, lastName), uploadPhoto(fileName)];
  return Promise.allSettled(promesse).then((results) => results.map((result) => ({
    status: result.status,
    value: result.status === 'fulfilled' ? result.value : String(result.reason),
  })));
}
