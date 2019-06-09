import { IStoreState } from '../types';
import { connect } from 'react-redux';
import FlameAnimation from './FlameAnimation';

export function mapStateToProps({ fireWidth }: IStoreState) {
  return {
    value: fireWidth
  }
}

export default connect(mapStateToProps, null)(FlameAnimation);