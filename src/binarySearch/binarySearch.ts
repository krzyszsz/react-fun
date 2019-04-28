
export interface Func1<T, R>
{
    Get(inputData : T) : R;
}

export interface Func2<T, T1, R>
{
    Get(inputData : T, inputData1 : T1) : R;
}

function IsThisIndexTheAnswer<T>(soughtElement : T, getValue : Func1<number, T>, comparer : Func2<T, T, number>, checkedIndex : number, numberOfElements : number) : boolean
{
    return (comparer.Get(getValue.Get(checkedIndex), soughtElement) >= 0 &&
        ((checkedIndex + 1 >= numberOfElements) || comparer.Get(getValue.Get(checkedIndex+1), soughtElement) < 0)
        );
}

function IsThisIndexTheAnswerOrFollowsAnswer<T>(soughtElement : T, getValue : Func1<number, T>, comparer : Func2<T, T, number>, checkedIndex : number, numberOfElements : number) : boolean
{
    return IsThisIndexTheAnswer(soughtElement, getValue, comparer, checkedIndex, numberOfElements)
        || comparer.Get(getValue.Get(checkedIndex), soughtElement) < 0;
}

export function BinarySearchFindFirstPositionIfExistsOrMinusOneOtherwise<T>(soughtElement : T, numberOfElements : number, getValue : Func1<number, T>, comparer : Func2<T, T, number>) : number
{
    let start : number = 0;
    let end : number = numberOfElements - 1;
    while (start < end && comparer.Get(getValue.Get(start), soughtElement) != 0)
    {
        let middleIndex : number = ~~((start + end) / 2);
        let middleValue : T = getValue.Get(middleIndex);
        if (comparer.Get(soughtElement, middleValue) >= 0)
        {
            end = middleIndex;
        }
        else
        {
            start = middleIndex + 1;
        }
    }

    if (start > end || comparer.Get(getValue.Get(start), soughtElement) != 0)
    {
        return -1;
    }

    return start;
}

export function BinarySearchLastPositionSmallerOrEqualOtherwiseMinusOne<T>(soughtElement : T, numberOfElements : number, getValue : Func1<number, T>, comparer : Func2<T, T, number>) : number
{
    let start : number = 0;
    let end : number = numberOfElements - 1;

    while (start < end &&
            !IsThisIndexTheAnswer(soughtElement, getValue, comparer, start, numberOfElements)
    )
    {
        var middleIndex = ~~((start + end) / 2);
        if (IsThisIndexTheAnswerOrFollowsAnswer(soughtElement, getValue, comparer, middleIndex, numberOfElements))
        {
            end = middleIndex;
        }
        else
        {
            start = middleIndex + 1;
        }
    }

    return start <= end && IsThisIndexTheAnswer(soughtElement, getValue, comparer, start, numberOfElements) ?
        start :
        -1;
}
