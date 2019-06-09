import { IStoreState } from '../types';
import { connect } from 'react-redux';
import * as actions from '../actions/';
import { Dispatch } from 'redux';
import  SliderComponent from './SliderComponent';

export function mapStateToProps({ fireWidth }: IStoreState) {
  return {
    value: fireWidth
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ChangeFireWidthAction>) {
  return {
    onSliderChange: (event: React.ChangeEvent<{}>, value: number) => {
      dispatch(actions.changeFireWidth(value))
    }      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderComponent);