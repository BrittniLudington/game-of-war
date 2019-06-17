import React from 'react';
import Popup from 'react-popup';

export default function NewFile(props)
{
    let handleSubmit = function(e, callback,props)
    {
        e.preventDefault();
        callback(document.getElementById('username').value,props);
        //props.history.push('/');
    }
    return(<section aria-label="make a new file">
                        <h1>New Game</h1>
                        <form id="newFileForm" aria-label="fill out username here" onSubmit={(e) =>handleSubmit(e,addUser,props)}>
                            <label>
                                Name:
                                <input type="text" id="username" name="username"/>
                            </label>
                            <input type="submit" value="submit"/>
                        </form>
                        <Popup />
                    </section>
    );

}

// checks if a user already exists, if not, creates a new file and sends user there
function addUser(name,props)
    {
        let unfilteredName = name;
        let filteredName = unfilteredName.replace(/[^a-zA-Z0-9_\-]/g, "");
        if(filteredName.length > 1)
        {
            Popup.alert("Invalid filename!");
            return;
        }
        let alreadyExists = false;
        const request = async () =>
        {
            const get = await fetch(`https://game-of-war-server.herokuapp.com/files/${name}`)
            .then(res => res.json())
            .then(result =>
                {
                    if(result.length > 0) alreadyExists = true;
                if(alreadyExists)
                {
                        Popup.alert(`File ${name} already exists!`);
                        return;
                }
                fetch('https://game-of-war-server.herokuapp.com/files',
                {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                })
                })
                .then(res => res.json())
                .then(result =>
                    {

                        props.history.push(`/user/${filteredName}`);
                    })
                .catch(err =>
                    {
                        console.log(err);
                    })
            })
            .catch(err =>
                {
                    console.log(err);
                })
                const finished = await get;
                if(alreadyExists)
                    return;

           
        }

        request();
       

        /*            "username": "john",
            "date-made": "01/22/2001",
            "total-games": 2,
            "total-wins": 1,
            "win-lose": "50%",
            "gameid": null */

        


    }


