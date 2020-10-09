import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Nome from './nome';
import { RegisterProvider } from '../../contexts/register';
import Email from './email';
import Senha from './senha';
import Data from './data';
import Tratamento from './tratamento';
import Duracao from './duracao';
import Genero from './genero';
import Foto from './foto';

const CadastroStack = createStackNavigator();

const Cadastro: React.FC = () => {
    return (
        <RegisterProvider>
            <CadastroStack.Navigator headerMode='none'>
                <CadastroStack.Screen name="Nome" component={Nome} />
                <CadastroStack.Screen name="Data" component={Data} />
                <CadastroStack.Screen name="Genero" component={Genero} />
                <CadastroStack.Screen name="Email" component={Email} />
                <CadastroStack.Screen name="Senha" component={Senha} />
                <CadastroStack.Screen name="Tratamento" component={Tratamento} />
                <CadastroStack.Screen name="Duracao" component={Duracao} />
                <CadastroStack.Screen name="Foto" component={Foto} />
            </CadastroStack.Navigator>
        </RegisterProvider>
    );
}

export default Cadastro;