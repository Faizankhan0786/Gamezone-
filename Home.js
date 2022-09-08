import React,{useEffect,useState} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Header from "./Header"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { getData,ServerURL } from '../FetchNodeServices';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer"


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

export default function Home(props) {
  const classes = useStyles();
const [listConsole,setListConsole]=useState([])
const [listCategory,setListCategory]=useState([])
const [listSubOffers,setSubOffers]=useState([])
const [listGames,setListGames]=useState([])
var settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000,
};

var itemsettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay:true,
  autoplaySpeed:2000,
  arrows:false
};



const fetchAllCategory=async()=>{
var list=await getData('categories/displayall')
setListCategory(list)
//alert (JSON.stringify(list))
}

const fetchAllSubCategoryOffers=async()=>{
  var list=await getData('subcategories/subcategoryoffers')
  setSubOffers(list)
  //alert (JSON.stringify(list))
  }

  const fetchGamesOffers=async()=>{
    var list=await getData('games/gamesoffers')
    setListGames(list)
    //alert (JSON.stringify(list))
    }

    const fetchConsoleOffers=async()=>{
      var list=await getData('accessories/displayalloffers')
      setListConsole(list)
      //alert (JSON.stringify(list))
      }

  const showSlider=()=>{
    return(listCategory.map((item)=>{
     return(
         <div>
          <img src={`${ServerURL}/images/${item.ad}`} width="100%" />
          
         </div>
          
     )
   
    })
    )
   }

   const handleConsoleList=(categoryid)=>{

    props.history.push({'pathname':'/consolelist'},{'categoryid':categoryid})

   }

const showCategories=()=>{
 return(listCategory.map((item)=>{
  return(
      <div style={{border:'1px solid #ecf0f1',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',padding:10,margin:5}} onClick={()=>handleConsoleList(item.categoryid)} >
       <img src={`${ServerURL}/images/${item.icon}`} width="60%" />
       <div style={{fontSize:22,fontWeight:'bold',padding:10}}>{item.categoryname.toUpperCase()}</div>
      </div>
       
  )

 })
 )
}

const showOffers=()=>{
  return(listSubOffers.map((item)=>{
   return(
       
        <div>
        
       
          <Paper elevation={3} className={classes.paperstyle}>
            <div className={classes.imageview}>
        <img src={`${ServerURL}/images/${item.icon}`} width="150" />
            </div>
       <div style={{fontSize:18,fontWeight:'bold',padding:10}}>
         {item.subcategoryname.length<=20?item.subcategoryname.toUpperCase():item.subcategoryname.toUpperCase().substring(0,18)+"..."}
         </div>
       <div style={{fontSize:16,padding:10}}>

        Day Price:Price<s>&#8377; {item.rentamt}</s> <span><b>	&#8377; {item.offer} </b></span>

       </div>
       <div style={{fontSize:18,padding:10}}>
       <span style={{color:'greenyellow'}}><b>You Save</b></span><b>	&#8377; {item.rentamt-item.offer} </b>
       </div>
       </Paper>
      </div>
       
   )
 
  })
  )
 }

 const showGamesOffers=()=>{
  return(listGames.map((item)=>{
   return(
       <div style={{
        // border:'1px solid #ecf0f1',
         width:250,
         justifyContent:'center',
         alignItems:'center',
         display:'flex',
         flexDirection:'column',
         padding:10,
         margin:5,
         }}
         >
         <Paper elevation={3} className={classes.paperstyle} >
            <div className={classes.imageview}>
        <img src={`${ServerURL}/images/${item.picture}`} width="150" />
            </div>

        <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
       <div style={{fontSize:18,fontWeight:'bold',padding:10}}>{item.gamename.toUpperCase()}</div>
       <div style={{fontSize:16,padding:10}}>

        Day Price:Price<s>&#8377; {item.rentamt}</s> <span><b>	&#8377; {item.offer} </b></span>

       </div>
       <div style={{fontSize:18,padding:10}}>
       <span style={{color:'greenyellow'}}><b>You Save</b></span><b>	&#8377; {item.rentamt-item.offer} </b>
       </div>
      </div>
      </Paper>
       </div>
      )
    })
  )
}
 
const showConsoleOffers=()=>{
  return(listConsole.map((item)=>{
   return(
       <div style={{
        // border:'1px solid #ecf0f1',
         width:250,
         justifyContent:'center',
         alignItems:'center',
         display:'flex',
         flexDirection:'column',
         padding:10,
         margin:5,
         }}
         >
         <Paper elevation={3} className={classes.paperstyle} >
            <div className={classes.imageview}>
        <img src={`${ServerURL}/images/${item.picture}`} width="150" />
            </div>

        <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
       <div style={{fontSize:18,fontWeight:'bold',padding:10}}>{item.accessoryname.toUpperCase()}</div>
       <div style={{fontSize:16,padding:10}}>

        Day Price:Price<s>&#8377; {item.rentamt}</s> <span><b>	&#8377; {item.offer} </b></span>

       </div>
       <div style={{fontSize:18,padding:10}}>
       <span style={{color:'greenyellow'}}><b>You Save</b></span><b>	&#8377; {item.rentamt-item.offer} </b>
       </div>
      </div>
      </Paper>
       </div>
     )
   })
  )
 }


useEffect(function(){
fetchAllCategory()
fetchAllSubCategoryOffers()
fetchGamesOffers()
fetchConsoleOffers()
},[])

  return(<div>
  <Header history={props.history}/>
  <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  <div style={{width:"100%"}}>
    <Slider {...settings}>{showSlider()}</Slider>
  </div>
  </div>

   <div className={classes.root}>
     <div style={{display:'flex',flexDirection:'column'}}>
   <div style={{fontSize:30,color:"#636e72",fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif',justifyContent:"center",padding:10}}>
    TOP CATEGORIES
   </div>
   <Divider style={{marginTop:5,marginBottom:5}} />
     
   <div  style={{display:'flex',flexDirection:'row',marginTop:'5'}}>
       {showCategories()}
   </div>
   </div>

   <div style={{display:'flex',flexDirection:'column'}}>
   <div style={{fontSize:30,color:"#636e72",fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif',justifyContent:"center",alignItems:'center',padding:10}}>
    TOP OFFERS CONSOLE
   </div>
   <Divider style={{marginTop:5,marginBottom:5}} />
   
   <div style={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
   <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.5}} >
     <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>
   <div style={{width:"98%"}}>
    <Slider {...itemsettings}>{showOffers()}</Slider>
  </div>
  <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.5}} >
     <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>
  </div>

   {/* <div  style={{display:'flex',flexDirection:'row', flexWrap:'wrap', alignItems:'center',justifyContent:'center',marginTop:'5'}}>
       {//showOffers()}
  </div>*/}
   </div>
   
   <div style={{display:'flex',flexDirection:'column'}}>
   <div style={{fontSize:30,color:"#636e72",fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif',justifyContent:"center",padding:10}}>
    TOP OFFERS GAMES
   </div>
   <Divider style={{marginTop:5,marginBottom:5}} />

   <div style={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
   <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.5}} >
     <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>

   <div style={{width:"98%"}}>
    <Slider {...itemsettings}>{showGamesOffers()}</Slider>
  </div>

      
       <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.5}} >
     <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>
   </div>
   </div>

   <div style={{display:'flex',flexDirection:'column'}}>
   <div style={{fontSize:30,color:"#636e72",fontWeight:'normal',letterSpacing:"3.9px",fontFamily:'Georgia,Times,"Times New Roman",serif',justifyContent:"center",padding:10}}>
    TOP ACCESSORIES OFFER
   </div>
   <Divider style={{marginTop:5,marginBottom:5}} />

   <div style={{width:'100%', display:'flex',justifyContent:'center',alignItems:'center'}}>
   <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,left:5,opacity:0.5}} >
     <ArrowBackIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>

   <div style={{width:"98%"}}>
    <Slider {...itemsettings}>{showConsoleOffers()}</Slider>
  </div>

      
       <IconButton className={classes.arrowstyle} style={{background:'#1e6b7b',position:'absolute',zIndex:1,right:5,opacity:0.5}} >
     <ArrowForwardIosIcon style={{color:'#FFF',fontSize:'large'}} />
   </IconButton>
   </div>
  </div>


  </div>
   <Footer />
  </div>)



}