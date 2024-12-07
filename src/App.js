import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Socket } from './Socket';

function App() {
  const [status, setStatus] = useState('not connected');
  const [roomId,setRoomId] = useState('default');

  let connectFunc = () => {
    Socket.connect();

    function onConnect() {
      setStatus('connected')
    }

    function onDisconnect() {
      setStatus('disconnected')
    }

    function onFooEvent(value) {
      setStatus('foo event');
    }

    Socket.on('connect', onConnect);
    Socket.on('disconnect', onDisconnect);
    Socket.on('foo', onFooEvent);
    Socket.on('message-emmited',(message)=>{
      alert(JSON.stringify(message));
    })

  }

  return (  
    <div className="App">
      <h1>Hello World</h1>
      <h1>{status}</h1>
      <button onClick={connectFunc}>connect</button>
      <br/>
      <input type='text' id='room-id'></input>
      <button onClick={()=>{
        setRoomId(document.getElementById('room-id').value);
        Socket.emit('join-room',document.getElementById('room-id').value)
      }}>join room</button>
      <br/>

      <input type='text' id='message'></input>
      <button onClick={()=>{
        Socket.emit('message',roomId,document.getElementById('message').value);
      }}>Message</button>
    </div>
  );
}

export default App;
