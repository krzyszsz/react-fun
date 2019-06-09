import * as constants from '../constants';

export interface ChangeFireWidth {
    newWidth: number;
    type: typeof constants.CHANGE_FIRE_WIDTH;
}

export type ChangeFireWidthAction = ChangeFireWidth /*| Another possible interface!*/;

export function changeFireWidth(newWidth: number): ChangeFireWidth {
    return {
        newWidth: newWidth,
        type: constants.CHANGE_FIRE_WIDTH
    }
}
