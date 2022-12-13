import React from 'react';
import News from './News';
import main from '../store/main';
import {observer} from 'mobx-react-lite'

const Main = observer(() => {
    return (
        <div>
            <button onClick={() => main.fetchNews()}>fetch news</button>
            <News/>
        </div>
    );
})

export default Main;