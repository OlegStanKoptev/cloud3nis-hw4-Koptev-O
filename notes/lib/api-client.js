import {doFetch} from './do-fetch';

function sleepFor(sleepDuration) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + sleepDuration) {
    /* Do nothing */
  }
}

export function* getNotes() {
  try {
    const requestParams = {
      method: 'GET',
      url: '/notes',
    };
    return yield doFetch(requestParams);
  } catch (error) {
    return error;
  }
}

export function* createNote(note) {
  try {
    const requestParams = {
      method: 'POST',
      url: '/notes',
      data: note,
    };
    yield doFetch(requestParams);
    return sleepFor(1000);
  } catch (error) {
    return error;
  }
}

export function* updateNote(note) {
  try {
    const requestParams = {
      method: 'PATCH',
      url: `/notes/${note.id}`,
      data: {
        title: note.title,
        content: note.content,
        image: note.image,
      },
    };
    return yield doFetch(requestParams);
  } catch (error) {
    return error;
  }
}
