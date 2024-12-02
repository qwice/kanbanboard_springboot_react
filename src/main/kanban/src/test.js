import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Test() {
   const [data, setData] = useState('');

    useEffect(() => {
        axios.get('/api')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, []);

    return (
        <div>
            받아온 값 : {data}
        </div>
    );
}

export default Test;