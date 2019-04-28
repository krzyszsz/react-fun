
import 'jest';
import { Func1, Func2, BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise, BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne } from './binarySearch';

class arrayGetterFunc1 implements Func1<number, number>
{
    private _numbers : Array<number>;

    constructor(numbers : Array<number>)
    {
        this._numbers = numbers;
    }

    Get(indexer : number) : number
    {
        return this._numbers[indexer];
    }
}
 
class comparerFunc2 implements Func2<number, number, number>
{
    Get(val1 : number, val2 : number) : number
    {
        return val2 - val1;
    }
}

test('returns 1 for single element array, when found', () => {
    const givenArray : Array<number> = [3];
    const lookingFor : number = 3;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('returns -1 for single element array, when not found', () => {
    const givenArray : Array<number> = [3];
    const lookingFor : number = 0;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('returns -1 for empty array', () => {
    const givenArray : Array<number> = [];
    const lookingFor : number = 0;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 0 of 2 identical', () => {
    const givenArray : Array<number> = [0,0];
    const lookingFor : number = 0;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('cannot find element between two elements', () => {
    const givenArray : Array<number> = [0,2];
    const lookingFor : number = 1;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('cannot find element between two of three elements - between 0 and 1', () => {
    const givenArray : Array<number> = [0,2,3];
    const lookingFor : number = 1;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('cannot find element between two of three elements - between 1 and 2', () => {
    const givenArray : Array<number> = [0,2,4];
    const lookingFor : number = 3;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('cannot find element greater than the last one', () => {
    const givenArray : Array<number> = [0,2,4];
    const lookingFor : number = 5;
    const expected : number = -1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 0 of 2', () => {
    const givenArray : Array<number> = [1,2];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 1 of 2', () => {
    const givenArray : Array<number> = [1,2];
    const lookingFor : number = 2;
    const expected : number = 1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 0 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 1 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 2;
    const expected : number = 1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('can find element 2 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 3;
    const expected : number = 2;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('finds first maching of a idenctical series - part 1', () => {
    const givenArray : Array<number> = [1,1,1];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('finds first maching of a idenctical series - part 2', () => {
    const givenArray : Array<number> = [0,1,1];
    const lookingFor : number = 1;
    const expected : number = 1;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('finds first maching of a idenctical series - part 3', () => {
    const givenArray : Array<number> = [1,1,0];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: returns 1 for single element array, when found', () => {
    const givenArray : Array<number> = [3];
    const lookingFor : number = 3;
    const expected : number = 0;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: returns -1 for single element array, when not found', () => {
    const givenArray : Array<number> = [3];
    const lookingFor : number = 0;
    const expected : number = -1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: returns -1 for empty array', () => {
    const givenArray : Array<number> = [];
    const lookingFor : number = 0;
    const expected : number = -1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 0 of 2 identical', () => {
    const givenArray : Array<number> = [0,0];
    const lookingFor : number = 0;
    const expected : number = 1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 0 of 2', () => {
    const givenArray : Array<number> = [1,2];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 1 of 2', () => {
    const givenArray : Array<number> = [1,2];
    const lookingFor : number = 2;
    const expected : number = 1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: cannot find element between two elements', () => {
    const givenArray : Array<number> = [0,2];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: cannot find element between two of three elements - between 0 and 1', () => {
    const givenArray : Array<number> = [0,2,3];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: cannot find element between two of three elements - between 1 and 2', () => {
    const givenArray : Array<number> = [0,2,4];
    const lookingFor : number = 3;
    const expected : number = 1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: cannot find element greater than the last one', () => {
    const givenArray : Array<number> = [0,2,4];
    const lookingFor : number = 5;
    const expected : number = 2;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 0 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 1;
    const expected : number = 0;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 1 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 2;
    const expected : number = 1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: can find element 2 of 3', () => {
    const givenArray : Array<number> = [1,2,3];
    const lookingFor : number = 3;
    const expected : number = 2;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: finds last maching of a idenctical series - part 1', () => {
    const givenArray : Array<number> = [1,1,1];
    const lookingFor : number = 1;
    const expected : number = 2;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: finds first maching of a idenctical series - part 2', () => {
    const givenArray : Array<number> = [0,1,1];
    const lookingFor : number = 1;
    const expected : number = 2;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });

  test('BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne: finds first maching of a idenctical series - part 3', () => {
    const givenArray : Array<number> = [1,1,2];
    const lookingFor : number = 1;
    const expected : number = 1;

    const actual = BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne(lookingFor, givenArray.length, new arrayGetterFunc1(givenArray), new comparerFunc2());

    expect(actual).toBe(expected);
  });
