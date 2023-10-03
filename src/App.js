import {useState, useEffect, useCallback} from 'react';
import './App.css';
import {SigninChatForm} from "./components/signinChatForm/SigninChatForm";
import {ChatForm} from "./components/chatForm/ChatForm";
import {Chat} from "./components/chat/Chat";
import io from 'socket.io-client';
import {nanoid} from "nanoid";

const {ENV, REACT_APP_SERVER_BASE_NAME} = process.env;

const connectBaseUrl = ENV === 'development' ? 'http://localhost:5000' : REACT_APP_SERVER_BASE_NAME;

const socket = io.connect(connectBaseUrl);

function App() {
    const [nickname, setNickName] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=> {
        socket.on('chat-message', (data)=> {
            setMessages((prevMessages)=> {
                const {username, message} = JSON.parse(data);
                const newMessage = {
                    id: nanoid(),
                    type: 'user',
                    username,
                    message,
                }

                return [newMessage, ...prevMessages]
            } )
        })
    }, [])

    const addNickname = useCallback(({name}) => {
        setNickName(name)
    }, [])

    const addMessage = useCallback(({message}) => {
        setMessages((prevMessages)=> {
            const newMessage = {
                id: nanoid(),
                type: 'you',
                username: nickname,
                message,
            }

            return [newMessage, ...prevMessages]
        } )

        socket.emit('chat-message', JSON.stringify({username: nickname, message}))
    }, [nickname])

  return (
    <div className="App">
        {!nickname ? <SigninChatForm onSubmit={addNickname} /> :
            <>
                <ChatForm onSubmit={addMessage} />
                <hr/>
                <Chat items={messages} />
            </>
        }
    </div>
  );
}

export default App;
