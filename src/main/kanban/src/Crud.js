import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Crud() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer: '',
        caller: '',
        context: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/data', formData)
            .then(response => {
                console.log('Data saved:', response.data);
                alert('데이터가 성공적으로 저장되었습니다!');
                navigate('/');
            })
            .catch(error => {
                console.error('Error saving data:', error);
                alert('데이터 저장 중 오류가 발생했습니다.');
            });
    };

    return (
        <>
            <h1>작성</h1>
            <form onSubmit={handleSubmit}>
                고객명 : <input name='customer' type='text' placeholder='고객명' value={formData.customer} onChange={handleChange} /><br />
                통화자명 : <input name='caller' type='text' placeholder='통화자명' value={formData.caller} onChange={handleChange} /><br />
                상태 :&nbsp;
                <select name='status' value={formData.status} onChange={handleChange} required>
                    <option value=''>---select---</option>
                    <option value='준비 목록'>준비 목록</option>
                    <option value='진행중 목록'>진행중 목록</option>
                    <option value='완료 목록'>완료 목록</option>
                </select><br />
                상담내용 <br />
                <textarea name='context' cols="30" rows="5" value={formData.context} onChange={handleChange}></textarea><br />
                <input type='submit' value="저장" />
            </form>
            <button onClick={() => navigate('/')}>Home</button>
        </>
    );
}

export default Crud;
