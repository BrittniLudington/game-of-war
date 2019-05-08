
export default function createDeck()
{
    let fullDeck =
    [
        1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10
    ];

    let curr = fullDeck.length, tempValue, randIndex;
    while(0 !== curr)
    {
        randIndex = Math.floor(Math.random() * curr);
        curr -= 1;

        tempValue = fullDeck[curr];
        fullDeck[curr] = fullDeck[randIndex];
        fullDeck[randIndex] = tempValue;
    }
    return fullDeck;
}