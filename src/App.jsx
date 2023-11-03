import React, { useState , useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from "./images/Logo_NIKE.png";


const AppBarContainer = styled.div`
  background-color: #6422CC;
  color: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const NavLinks = styled.div`
  display: flex;

  @media (max-width: 768px){
    display: none;
  }
  
`;

const NavLink = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;


const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Description = styled.h2`
  font-size: 14px;
  margin: 0;
`;
const InputDiv = styled.h2`
  font-size: 17px;
  margin: 0;
`;


const Button = styled.button` 
  background-color: white;
  font-size: 1em;
  color: black;
  margin-right: 0.5em;
  padding: 0.25em 1em;
  border: 2px solid #6B46C1;
  border-radius: 10px;
  cursor: pointer;
`;

const Card = styled.div`
  min-height: 300px;
  background-color: white;
  width: 100%;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  `;


function App(){

  const [data , setData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1)
  const itemPerPage = 8;
  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const items = data.slice(firstIndex,lastIndex);
  const nPages = Math.ceil(data.length / itemPerPage);
  const num = [...Array(nPages + 1).keys()].slice(1);
  
  useEffect(() => {
    loadUserData();
  },[])

  const handelReset = async () => {
    loadUserData();
  };

  const loadUserData = async () => {
    return await axios.get("http://localhost:5000/products")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  const sortDesc = async () => {
    return await axios 
      .get(`http://localhost:5000/products?_sort=Price&_order=desc`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const sortAsc = async () => {
    return await axios 
      .get(`http://localhost:5000/products?_sort=Price&_order=asc`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handelFilter = async (value) => {
    return await axios
      .get(`http://localhost:5000/products?Gender=${value}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }


  
  function sort (key) { 
    if (key === "low-high") {
      sortAsc()
    } else if (key === 'high-low') {
      sortDesc()
    }
  }
 
  return(
    <>
      <AppBarContainer>
          <img style={{ maxWidth: "75px" }} src={logo} alt="logo" />
          <NavLinks>
            <NavLink>New & Featured</NavLink>
            <NavLink>Men</NavLink>
            <NavLink>Women</NavLink>
            <NavLink>Kids</NavLink>
            <NavLink>Sale</NavLink>
          </NavLinks>
      </AppBarContainer>

      <div style={{display:"flex",justifyContent:"space-between"}}>
        <div style={{margin:5}}>
          <h5 style={{marginBottom:2,marginTop:2}}>Filter By:</h5>
          <Button onClick={() => handelFilter("Men")}>Men</Button>
          <Button onClick={() => handelFilter("Women")}>Women</Button>
          <Button onClick={() => handelReset()}>Reset</Button>
        </div>
        
        <div style={{margin:5}}>
          <h5 style={{marginBottom:2,marginTop:2}}>Sort By:</h5>
          <select onChange={(e)=>{sort(e.target.value)}}>
            <option>Please seclect</option>
            <option value="low-high">Price: Low - High</option>
            <option value="high-low">Price: High - Low</option>
          </select>
        </div>
      </div>

      <CardsGrid>
        {items.lenght === 0 ? (
          <div>No Products Found</div>
        ) : (
          items.map((item , index) => (
            <Card key={index}>
              <img src={item.src} alt="logo" style={{width:"100%"}} />
              <div style={{paddingLeft:5}}>
                <Title>{item.Title}</Title>
                <Description>{item.Description}</Description>
                <InputDiv>{item.Gender}</InputDiv>
                <InputDiv>Price: {item.Price}</InputDiv>
              </div>
          </Card>
           ))
        )}
              
      </CardsGrid>
      <div style={{display:"flex",justifyContent:"flex-end", backgroundColor:"whitesmoke",paddingTop:20,paddingBottom:20}}>
        <Button onClick={prePage}>Prev</Button>

        {num.map((n,i) => (
          <div key={i}>
            <Button onClick={() => changeCPage(n)}>{n}</Button>
          </div>
          ))}

        <Button onClick={nextPage}>Next</Button>
      </div>

      
    </>

  )

  function nextPage(){
    if(currentPage !== nPages){
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id){
    setCurrentPage(id);
  }


}

export default App;