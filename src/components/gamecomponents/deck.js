
export default function createDeck(deckFile)
{

    /*for(let i = 0; i < 3; i++)
    {
        for(let num = 1; num <= 10; num++)
        {
            if(deckFile[i][`${num}`] == 0)
            {
                deckFile.push(num);
            }
        }
    }
    */
    let curr = deckFile.length, tempValue, randIndex;
    while(0 !== curr)
    {
        randIndex = Math.floor(Math.random() * curr);
        curr -= 1;

        tempValue = deckFile[curr];
        deckFile[curr] = deckFile[randIndex];
        deckFile[randIndex] = tempValue;
    }

    /*let deckFile =
    [
        1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10
    ];

    let curr = deckFile.length, tempValue, randIndex;
    while(0 !== curr)
    {
        randIndex = Math.floor(Math.random() * curr);
        curr -= 1;

        tempValue = deckFile[curr];
        deckFile[curr] = deckFile[randIndex];
        deckFile[randIndex] = tempValue;
    }
    */
    return deckFile;
}