import React, { Component } from "react";
import { connect, sendMsg } from '../../../api';
import "./ChatPage.scss";
import ChatHistory from "../ChatHistory/ChatHistory";
import ChatInput from "../ChatInput";
import auth from '../../../authorization/auth';

class ChatPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      chatHistory: []
    }
  }

  handleShow = () => {
    this.setState({
      isActive: true
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false
    });
  };

  componentDidMount() {
    // TODO provide real authentication to differentiate users
    if (auth.isAuthenticated()) {
      connect((msg) => {
        console.log("New Message")
        this.setState(prevState => ({
          chatHistory: [...prevState.chatHistory, msg]
        }))
        console.log(this.state)
      });
    }
  }

  send(event) {
    if(event.keyCode === 13) {
      sendMsg(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div className="ChatPage">
        <button onClick={() => {
          auth.logout(() => {
            this.props.history.push("/");
          });
        }}>Logout</button>
        
        <ChatHistory chatHistory={this.state.chatHistory} />
        <ChatInput send={this.send} />
      </div>
    );
  }
}

export default ChatPage;