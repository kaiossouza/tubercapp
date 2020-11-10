import React from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

IconAntDesign.loadFont();

const userTest = {
    _id: 1,
    name: 'Yuri Lima',
    avatar: 'https://placeimg.com/140/140/any',
}

const messagesTest = [
    {
        _id: 3,
        text: 'Valeu pelo aviso !',
        createdAt: new Date(),
        user: userTest
    },
    {
        _id: 2,
        text: 'Essa funcionalidade ainda está em desenvolvimento ;)',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Padrinho',
            avatar: 'https://placeimg.com/140/140/any',
        }
    },
    {
        _id: 1,
        text: 'Olá, tudo bom? Aqui é o lugar onde você consegue se comunicar com o seu padrinho, ok?',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Padrinho',
            avatar: 'https://placeimg.com/140/140/any',
        }
    }
]

export default function Godfather(){

    function onSendMessage(messages){
        var newMessage = messages[0];
        newMessage.createdAt = new Date();
        messagesTest.unshift(newMessage);
        GiftedChat.append(messagesTest, newMessage, true);
    }

    return (
            <GiftedChat 
                user={userTest} 
                messages={messagesTest} 
                onSend={onSendMessage} 
                placeholder={"Envie sua mensagem"}
                alwaysShowSend={true}
                renderSend={(props) => (
                    <Send
                      {...props}
                      containerStyle={{
                        height: 50,
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconAntDesign name="rightcircle"size={30} color={'#4097A0'}/>
                    </Send>
                )}
            />
    );
};

const styles = StyleSheet.create({
    
});