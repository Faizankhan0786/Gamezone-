import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {getData,ServerURL} from "../FetchNodeServices";
import Divider from '@material-ui/core/Divider';
import {FilledInput, makeStyles} from "@material-ui/core";
import {LocalShipping, Repeat, SportsEsports, VideogameAsset} from '@material-ui/icons';

const Box= styled.div`
padding: 30px 30px;
background:#1e6b7b;
position: absolute;
width: 95.5%;
`;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
max-width: 1000px;
`;

const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 40px;
color:#fff;
`;

const ColumnCat = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 40px;
color:#fff;
`;

const Column2 = styled.div`
display: flex;
flex-direction: row;
margin-left:'40px';
text-align: center;
color:#fff;
width: 400px;
`;

const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
grid-gap: 80px
`;

const FooterLink = styled.a`
color:#fff;
margin-bottom:20px;
font-size:14px;
text-decoration:none;

&:hover{
    color:green;
    transition:200ms ease-in;
 }
 `;

 const FooterData = styled.a`
  color:#fff;
  margin-bottom:20px;
  font-size:14px;
  text-decoration:none;
 `;

 const Heading = styled.p`
 font-size:14px;
 color:#fff;
  margin-bottom:20px;
  font-weight:bold;
 `;

 const useStyles = makeStyles((theme) => ({
     divider:{
         background:"#fff",
     },

     dividerBottom:{
        background:"#fff",
        marginTop: "40px",
     },
 }));

  const Footer = () => {
     const [listCategory,setListCategory] = useState([]);
     const classes = useStyles();

   const fetchAllCategory = async () =>{
    let list = await getData("categories/displayall");
    setListCategory(list);
   };

   const showCategories = () =>{
       return listCategory.map((item) =>{
           return <FooterLink href="#">{item.categoryname}</FooterLink>;
       });
   };

   useEffect(function(){
       fetchAllCategory();
   },[]);

   return (
       <Box>
           <Container>
             <Row>
                <ColumnCat>
                  <Heading>MOST POPULAR CATEGORIES</Heading>
                  {showCategories()}
                  <div 
                  style={{marginTop:"145px",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"left",
                  }} >
                      <VideogameAsset fontSize={"large"} style={{marginRight:8}} />
                      2500+ Games 
                  </div>
                </ColumnCat>

                <Column>
                <Heading>CUSTOMER SERVICES</Heading>
                <FooterLink href="#">About Us</FooterLink>
                <FooterLink href="#">Terms and Condition</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
                <FooterLink href="#">Privacy policy</FooterLink>
                

                <div
                 style={{
                     marginTop:"110px",
                 display:"flex",
                 alignItems:"center",
                 justifyContent:"left",
                 textAlign:"left",
                 width:175
                 }}
                ></div>

               <div style={{ marginTop:"110px", display:"flex", alignItems:"center", justifyContent:"left",textAlign:"left", width:175 }} >
                   <LocalShipping fontSize={'large'} style={{marginRight:8}}/>
                   FREE SHIPPING 
               </div>
                </Column>

               <ColumnCat>
                  <Heading>Visit</Heading>
                  <FooterLink href="#">Home</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                  <FooterLink href="#">Offers</FooterLink>

                  <div style={{ marginTop:"110px", display:"flex",  alignItems:"left", justifyContent:"left", textAlign:"left",alignItems:'center' }} >
                    <SportsEsports fontSize={'large'} style={{marginRight:8}} />
                    GENUINE PRODUCTS
                  </div>
                  </ColumnCat>
                  
                  <Column2>
                   <Divider orientation={"vertical"} classes={{root:classes.divider}} />
                   <Column>
                        <div style={{marginTop:'10px'}}>
                            <Heading>Contact Us</Heading>
                            <FooterData> Call Us : xxxxxxxxxx </FooterData>
                            </div>

                            <div style={{marginTop:'10px'}}>
                            <FooterData> Email : xxxxx@gmail.com </FooterData>
                            </div>

                           <div style={{marginTop:'30px',display:'flex'}}>
                               <FooterData>
                                   GameZone is your destination for new and used Video
                                   games. Rent video games online for your favorite system
                                   including PS4,Xbox One,Switch,PS3,Xbox 360,Wii U,
                                   3DS, and more.
                               </FooterData>
                           </div>


                            <div style={{textAlign:'center'}}>
                                <Heading>Download APP</Heading>
                                <FooterLink href="#">
                                    <img src={`/playstore.png`} alt={""} style={{margin:5}} />
                                    <img src={`/applestore.png`} alt={""} style={{margin:5}} />
                                </FooterLink>
                            </div>
                   </Column>
                  </Column2>

             </Row>
           </Container>
           <Divider classes={{root:classes.dividerBottom}} />

           <div style={{padding:'5px',textAlign:'center',color:'#fff'}}>
           Copyright © 2021  All rights reserved <FooterLink target="_blank" href="http://www.numericinfosystems.in/">
          Numeric Infosystems Pvt Ltd 
           </FooterLink>
           </div>
       </Box>

   );
 };
export default Footer;