import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { getData,ServerURL,postData } from '../FetchNodeServices';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer"
import QtySpinner from "./QtySpinner"
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme) => ({
root:{
padding:10,
display:'flex',
flexDirection:'column'
},
paperstyle:{
  justifyContent:"flex-start",
  display:'flex',
  padding:10,
  width:215,
  height:310,
  margin:10,
  borderRadius:10,
  flexDirection:'column'
},
imageview:{
  width:160,
  height:160, 
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  padding:10,
  margin:2,
  cursor:"pointer",

  '&:hover':{
    transform:"scale(1.25)",
    transition:"all 0.5s ease 0s"
  }

},
arrowstyle:{
 display:'flex',
 justifyContent:'center',
 alignItems:'center',
}

}))

export default function ConsoleList(props) {
  const classes = useStyles();
  const [listConsole,setListConsole]=useState([]);
  const [pageRender,setPageRender]=useState(false);
  //alert(props.history.location.state.categoryid)
 // console.log(props.history.location)
  var categoryid =props.history.location.state.categoryid
  var dispatch = useDispatch()

  var settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000,
};

  function getCurrentDate()
  {
    var d = new Date()
    var dd = d.getDate()
    if(dd<=9)
    {
      dd = "0"+dd;
    }

    var mm = d.getMonth()+1
    if(mm<=9)
    {
      mm = "0"+mm;
    }

    var cd = d.getFullYear()+"-"+mm+"-"+dd
    
    return cd 
  }
  
   function addDays (days, dt)
   {
     var d = new Date (dt)
     d.setDate (d.getDate()+days)
    
     var dd = d.getDate()
    if(dd<=9)
    {
      dd = "0"+dd;
    }

    var mm = d.getMonth()+1
    if(mm<=9)
    {
      mm = "0"+mm;
    }

    var cd = d.getFullYear()+"-"+mm+"-"+dd
    
    return cd
  
    }

const fetchAllSubCategory=async()=>{
  var body={'categoryid':categoryid}
  var list=await postData('subcategories/displayallsubcategorybycategoryid',body)

  setListConsole(list)

}

const handleQtyChange = (value,item)=>{
  
  if(value==0)
  { dispatch({type:'REMOVE_CART',payload:[item.subcategoryid]}) }
  else{

 item ['qtydemand'] = value;
 item ['duration'] = 1;
 var cd = getCurrentDate();

 item ['startdate'] = cd;
 var ed = addDays(1,cd);
 
 item ['enddate'] = ed;
 item ['time'] = 'Day';
 
 //alert(JSON.stringify(item))
  dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
  }
 setPageRender (!pageRender)
}


const showConsole=()=>{
  return(listConsole.map((item)=>{
   return(
       <div>
        <div style={{ //border:"1px solid #ecf0f1",
        width:200,
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        padding:10,
        margin:15,}} >
        
       
          <Paper  elevation={3} className={classes.paperstyle}>
          
            <div  onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})} className={classes.imageview}>
        <img src={`${ServerURL}/images/${item.icon}`} width="150" />
            </div>
       <div style={{fontSize:18,fontWeight:'bold',padding:10}}>
         {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
         </div>

       <div style={{fontSize:16,padding:10}}>
          Day Price:Price<s>&#8377; {item.rentamt}</s>{" "}
         <span><b>	&#8377; {item.offer} </b></span>
       </div>
       
       <div style={{fontSize:18,padding:10}}>
       <span style={{color:'greenyellow'}}><b>You Save</b></span><b>	&#8377; {item.rentamt-item.offer} </b>
       </div>
       

       <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        
         <QtySpinner value={0} onChange={(value)=>handleQtyChange (value,item)} />
       </div>
       </Paper>
      </div>
       </div>
   )
 
  })
  )
 }

 
useEffect(function(){
 fetchAllSubCategory()
},[])

  return(<div>
  <Header history={props.history}/>
  <div style={{padding:8,flexDirection:'row',display:'flex',flexWrap:'wrap',justifyContent:'left'}}>
   {showConsole()}
   </div>
   <Footer />
  </div>)



}