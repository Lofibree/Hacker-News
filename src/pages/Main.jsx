import React from 'react';
import News from '../components/News/News';
import main from '../store/main';
import {observer} from 'mobx-react-lite'
import { useEffect } from 'react';

const Main = observer(() => {

    useEffect(() => {
        main.fetchNews()
    }, [])
    return (
        <div>
            <button onClick={() => main.fetchNews()}>fetch news</button>
            <News/>
        </div>
    );
})

export default Main;