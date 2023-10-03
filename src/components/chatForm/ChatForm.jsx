import React, {useState} from 'react';

export const ChatForm = ({onSubmit}) => {
    const [state, setState] = useState({
        message: ''
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
            message: ''
        })
    }

    const {message} = state;

    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" name="message" value={message} placeholder="Please type your message" onChange={changeInputValue} />
            <button>Send message</button>
        </form>
    );
};
