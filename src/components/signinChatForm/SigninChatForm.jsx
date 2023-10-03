import React, { useState } from 'react';

export const SigninChatForm = ({onSubmit}) => {
    const [state, setState] = useState({
        name: ''
    })

    const changeInputValue = ({target}) => {
        const {name, value} = target;

        setState((prevState)=> ({
            ...prevState,
            [name]: value,
        }))
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit({...state});

        setState({
            name: ''
        })
    }

    const {name} = state;

    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" name="name" value={name} placeholder="Please type your name" onChange={changeInputValue} />
            <button>Connection</button>
        </form>
    );
};
