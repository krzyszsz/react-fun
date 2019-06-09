import { ChangeFireWidthAction } from '../actions';
import { IStoreState } from '../types/index';
import { CHANGE_FIRE_WIDTH } from '../constants/index';

const initialState : IStoreState = {
  fireWidth : 2
};

export function fireReducer(
    state: IStoreState = initialState, action: ChangeFireWidthAction): IStoreState {
  switch (action.type) {
    case CHANGE_FIRE_WIDTH:
      return { ...state, fireWidth: action.newWidth };

      /* Other actions here! */
      default:
          return state
  }
}