import {Observable} from 'rxjs/Observable';
import {ActionsObservable} from 'redux-observable';

import * as ActionTypes from '../../actionTypes';
import {login, register} from '../auth';

let oldPost;

beforeEach(() => {
  oldPost = Observable.ajax.post;
});

afterEach(() => {
  Observable.ajax.post = oldPost;
});

test('# login epic - success', (done) => {
  const payload = {test: true};
  const response = {data: true};
  const input = {type: ActionTypes.DO_LOGIN, payload};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  login(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/login');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(res).toEqual({type: ActionTypes.LOGIN_SUCCESS, payload: response});
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 0, text: 'Login success', alertType: 'info'},
      });
      done();
    }
  });
});

test('# login epic - error', (done) => {
  const input = {type: ActionTypes.DO_LOGIN, payload: {}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  login(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toBe(ActionTypes.LOGIN_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 1, text: 'ajax error 0', alertType: 'danger'},
      });
    }
    done();
  });
});

test('# register epic - success', (done) => {
  const payload = {test: true};
  const response = {data: true};
  const input = {type: ActionTypes.DO_REGISTER, payload};
  const input$ = ActionsObservable.from([input]);

  const post = jest.fn().mockReturnValueOnce(Observable.from([{response}]));
  Observable.ajax.post = post;

  let responseCount = 0;
  register(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/register');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(res).toEqual({type: ActionTypes.REGISTER_SUCCESS, payload: response});
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 2, text: 'Register success', alertType: 'info'},
      });
    }
    done();
  });
});

test('# register epic - error', (done) => {
  const input = {type: ActionTypes.DO_REGISTER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  register(input$).subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toBe(ActionTypes.REGISTER_ERROR);
      expect(res.payload.error.message).toBe('ajax error 0');
      responseCount += 1;
    } else {
      expect(res).toEqual({
        type: ActionTypes.ADD_NOTIFICATION,
        payload: {id: 3, text: 'ajax error 0', alertType: 'danger'},
      });
    }
    done();
  });
});
