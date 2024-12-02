import './Kanban.css';
import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
//import data from "./tasks.js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Kanban() {
  const categories = ["준비 목록", "진행중 목록", "완료 목록"];

  const navigate = useNavigate();
  const goHome = () => {
    return navigate('/');
  }

  // 상태를 category별로 분리
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(null);

   useEffect(() => {
     axios.get("http://localhost:8080/data")
       .then(response => {
         console.log(response)
         setTasks(response.data);
       })
       .catch(error => {
         console.error("Error fetching tasks:", error);
       });
   }, []);

   useEffect(() => {
       // update 상태가 변경될 때마다 로그 출력
       if (update !== null) {
           console.log("Updated task:", update);
           // DB에 업데이트 반영
           axios.put(`http://localhost:8080/data/${update.id}`,
               { id: update.id,
                 customer: update.customer,
                 caller: update.caller,
                 status: update.status,
                 context: update.context
               })
               .then(response => {
                   console.log(response);
                   console.log('Task status updated in DB', response.data);
               })
               .catch(error => {
                   console.error("Error updating task status in DB:", error);
               });
       }
   }, [update]); // update 상태가 변경될 때마다 실행

   {/*const editContext = (e, id) => {
     const { value } = e.target;

     setTasks((prevTasks) =>
       prevTasks.map((task) =>
         task.id === id ? { ...task, context: value } : task
       )
     );
   };*/}

  // Drag and Drop 완료 시 실행될 함수
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);

    // 드래그가 유효하지 않으면 종료
    if (!destination) return;

    // 같은 위치로 이동한 경우
    if (
      destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceCategory = source.droppableId;

    // Drag된 task 찾기
    const draggedTask = tasks.find(
      (task) => task.status === sourceCategory && task.context === result.draggableId
    );
    console.log('drag : ',draggedTask)

    if (!draggedTask) return;

    setUpdate({
      ...draggedTask, // 드래그된 태스크를 그대로 복사
      status: destination.droppableId, // 새 상태로 변경
    });

    setTasks((prevTasks) => {
      // 기존 tasks 복사
      const updatedTasks = [...prevTasks];

      // 다른 카테고리로 이동한 경우
      const removeIndex = updatedTasks.findIndex(task => task.context === result.draggableId)
      console.log('removeIndex : ', removeIndex)
      const remove = updatedTasks.splice(removeIndex, 1);
      console.log('remove : ', remove);
      const addIndex = updatedTasks.findIndex(task => task.status === destination.droppableId)
      console.log('addIndex :', addIndex)
      const filteredTasks = updatedTasks.filter((task) => task !== draggedTask);
      console.log('1filter : ', filteredTasks)
      filteredTasks.splice(addIndex + destination.index, 0, { ...draggedTask, status: destination.droppableId });
      console.log('2filter : ', filteredTasks)
      return [...filteredTasks]
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1 className="title">Test</h1><hr />
      <div className="center">
        <div className="back">
          {categories.map((category) => (
            <Droppable droppableId={category || "default"} key={category}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="wrap">
                    <h2>{category}</h2>
                    {tasks
                      .filter((task) => task.status === category)
                      .map((task, index) => (
                        <Draggable
                          draggableId={task.context}
                          index={index}
                          key={task.context}
                        >
                          {(provided) => (
                            <div
                              className="text"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              고객명 : {task.customer}<br/>
                              통화자명 : {task.caller}<br/>
                              상담 내용 : {task.context}
                              <textarea
                                  value={task.context}
                                  onChange={(e) => editContext(e, task.id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={goHome}>Home</button>
    </DragDropContext>
  );
}

export default Kanban;
