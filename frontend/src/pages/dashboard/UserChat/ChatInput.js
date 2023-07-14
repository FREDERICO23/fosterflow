import React, { useState } from 'react';
import { Button, Row, Col, Form } from "reactstrap";
import { connect } from "react-redux";
import { addMessage as actionAddMessage, addDialogue} from "../../../redux/chat/actions";
import { bindActionCreators } from "redux";
//i18n
import { useTranslation } from 'react-i18next';

function ChatInput(props) {
    const [textMessage, settextMessage] = useState("");
    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    //function for text input value change
    const handleChange = event => {
        settextMessage(event.target.value);
    }

    //function that handles submitting a form
    const formSubmit = (event, textMessage) => {
        event.preventDefault();
        addMessage (textMessage);
    }
    

    //function for send data to onaddMessage function(in userChat/index.js component)
    const addMessage = (textMessage) => {
        //if text value is not empty then call onaddMessage function
        if (textMessage !== "") {
            if (props.activeNewChat){
                props.addDialogue({
                    "user_id": props.authorizedUser.id,
                    "name": textMessage.substring(0, 32),
                    "message": textMessage
                });
                settextMessage("");
                return;        
            }

            props.actionAddMessage({
                "message_text": textMessage,
                "dialog_id": props.activeDialogueId
            });
            settextMessage("");
        }
    }

    //function for handling 'Enter' key press
    const handleKeyDown = (event) => {
        if (event.keyCode === 13 && event.shiftKey === false) {
            event.preventDefault();
            addMessage(textMessage);
        }
    }

    return (
        <React.Fragment>
            <div className="p-3 p-lg-3 border-top mb-0">
                <Form onSubmit={(e) => formSubmit(e, textMessage)} >
                    <Row className='g-0'>
                        <Col>
                            <div>
                                <textarea 
                                    value={textMessage} 
                                    onChange={handleChange} 
                                    onKeyDown={handleKeyDown}
                                    className="form-control form-control-lg bg-light border-light" 
                                    placeholder={t('Enter Message') + '...'} 
                                    style={{resize: 'none', overflow: 'auto', minHeight: '50px', maxHeight: '200px'}}
                                />
                            </div>
                        </Col>
                        <Col xs="auto">
                            <div className="chat-input-links ms-md-2">
                                <ul className="list-inline mb-0 ms-0">
                                    <li className="list-inline-item">
                                        <Button type="submit" color="primary" className="font-size-16 btn-lg chat-send waves-effect waves-light">
                                            <i className="ri-send-plane-2-fill"></i>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    console.log("Dashabord Tabs ChatsInput mapStateToProps state", state);
    return { 
        activeDialogueId: state.Chat.activeDialogueId,
        authorizedUser: state.User.authorizedUser,
        activeNewChat: state.Chat.activeNewChat
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ actionAddMessage, addDialogue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);