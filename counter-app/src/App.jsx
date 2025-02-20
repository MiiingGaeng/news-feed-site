import { useState } from 'react'
import styled from 'styled-components';

 const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
 `
 const MainWrapper = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
 `
 const ListWrapper = styled.div`
  display: flex;
  gap: 1rem;
 `
 const ListItem = styled.div`
  padding: 2rem;
  width:50px;
  height: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
  border-radius: 1rem;
  background-color: #FFF;
  color: #000;
 `
 

function App() {
  const [count, setCount] = useState(0);
  const food = ['감자', '고구마', '오이', '가지', '옥수수']
  let person = [{name:'sumin', age:29}, {name:'coya', age:10}, {name:'suga', age: 33}]
  const [persons, setPersons] = useState(person);
  const [newPerson, setPerson] = useState({
    name: '',
    age: ''
  })
  const {name,age} = newPerson;
  const handleChangeInput = (e) => {
    const {value, name} = e.target;
    setPerson((pre) => ({
      ...pre,
      [name]: name === 'age'? Number(value) : value
    }))
  }

  const addItem = () => {
    setPersons((e) => [...e, newPerson])
  }
 
  return (

    <MainWrapper>
      <span>{count}</span>
      <ButtonContainer>
        <button onClick={() => setCount(count + 1)}>+ 1</button>
        <button onClick={() => setCount(count - 1)}>- 1</button>
      </ButtonContainer>
      <ButtonContainer>
        <input type="text" name="name" value={name} onChange={handleChangeInput} placeholder='name'/>
        <input type="number" name="age" value={age} onChange={handleChangeInput} placeholder='age' />
        <button onClick={() => addItem()}>추가</button>
      </ButtonContainer>
      <ListWrapper>
        {food.map((e,i) => {
          return(
          <ListItem key = {i}>
            {e}
          </ListItem>
          )
        })}
      </ListWrapper>
      <ListWrapper>
        {persons.map((e,i) => {
          return(
            <ListItem key={i}>
              {e.name + " " + e.age}
            </ListItem>
          )
        })}
      </ListWrapper>

    </MainWrapper>
  )
}

export default App
