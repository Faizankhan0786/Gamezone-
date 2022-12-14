import React,{ useEffect,useState,createRef,useRef } from "react";
import Grid from '@material-ui/core/Grid'; 
import TextField from '@material-ui/core/TextField';
import {fade, makeStyles} from '@material-ui/core/styles';
import TodayIcon from '@material-ui/icons/Today';
import {ServerURL,getData,postData} from '../FetchNodeServices';
import renderHTML from "react-render-html";
import Header from "./Header";
import Footer from "./Footer";
import QtySpinner from "./QtySpinner";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Description } from "@material-ui/icons";
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
   
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

export default function ProductView(props){
    const consoleSlider = createRef()
    const classes = useStyles();
    var settings = {
      dots: true,
      infinite: true,
      arrows: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      //autoplay:true,
      autoplaySpeed:2000,
    };
    var item = props.history.location.state.product
   // alert(JSON.stringify(item))

   const [startDate,setStartDate] = useState(getCurrentDate());
   const [endDate,setEndDate] = useState(addDays(1,getCurrentDate()));
   const [totalAmt,setTotalAmt] = useState("")
   const [days,setDays] = useState("")
   const [msg,setMsg] = useState("")
   const [documents,setDocuments] = useState("")
   const [tc,setTc] = useState("")
   const [consolePictures, setConsolePictures] = useState([]);
   const [getImage,setImage] = useState(item.icon)
   const [pageRender, setPageRender] = useState(false);

   var dispatch = useDispatch()
   var cart = useSelector (state => state.cart)

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


   const handleDateDifference=(event,rentamt)=>{
      setEndDate(event.target.value)
      //alert("StartDate"+startDate)
     // alert("End Date"+endDate)
     var sd=new Date(startDate)
     var ed=new Date(event.target.value)
     const diffTime = Math.abs(ed - sd);
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // alert(diffDays)
    var totalamt = rentamt*diffDays
    setTotalAmt(totalamt)
    setDays(diffDays)
    
    item ['duration'] = diffDays;
      item ['time'] = 'Day';
      
        //alert(JSON.stringify(item))
        dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
    
     
      setPageRender (!pageRender);

    setMsg(`Rent for ${diffDays} Days is Rs. ${totalamt} `)
    }
  
    const getPrice = (state, price,) => {
      var days = 0
      var cd = startDate
      var ed = endDate
      if(state == "Day") { 
        days = 1
        ed = addDays(days,cd)

      }
      else if (state == "Week"){
      days = 7
      ed = addDays(days,cd)
    
    }
      else if (state == "Month"){
      days = 30
      ed = addDays(days,cd)
    
    }
      setEndDate(ed)
      item ['duration'] = days;
      item ['time'] = 'Day';
      item ['startdate'] = cd;
      item ['enddate'] = ed;
      
        //alert(JSON.stringify(item))
        dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
    
     
      setPageRender (!pageRender);
      setMsg(`Rent for ${state} is Rs. ${price} `)
    }
    
    const fetchDocuments = async () => {
      var result = await getData('/documents/displayall')
      setDocuments (result[0].documents)
    }

    const fetchTc = async () => {
      var result = await getData('terms/displayall')
      setTc (result[0].conditioned)
    }

    const fetchProductPictures = async () => {
      var body = {subcategoryid:item.subcategoryid}
      var result = await postData('consolepicture/displayallproductpictures',body)
      setConsolePictures(result)
    }

    useEffect(function(){
      fetchDocuments()
      fetchTc()
      fetchProductPictures()
    },[])

   ////////////// tabs //////////////////////////////
   
   const showTabs = (Description) => (
    <Tabs style={{padding:20}}>
      <TabList>
        <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Description</Tab>
        <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Terms & Condition</Tab>
        <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Documents Required</Tab>
      </TabList>
  
      <TabPanel>
        <h2> {Description} </h2>
      </TabPanel>
      <TabPanel>
        <div>
     <h4> Gaming Consoles Terms </h4>

     <div> <CheckIcon /> Refundable deposit in terms of cash or Security cheque would be valid. Two ID proof copy would be required for rentee. </div>

     <div> <CheckIcon /> The Rentee shall use the Gaming Consoles at his/her own risk and agrees that we will not accept any responsibility or be held accountable for any loss, damage incurred.</div>

     <div><CheckIcon /> The Item should be returned on time as specified otherwise it will incurred next day rental charges.</div>

     <div><CheckIcon /> User must be present when product delivered to cross check the product workable and it should be returned in the same condition.</div>

     <h4>Game Terms</h4>

    <div> <CheckIcon /> In case of Games found with many scratches or any other damages to the games, will deduct the amount from Security Deposit and then returned.</div>

     <div><b>Note:</b> 5000 Refundable Deposit + Local Address Proof Id Copy + Any Govt ID Copy.</div>

     <div><b>Note:</b> Min. 2 days Order for Individual purpose required.</div>

     <div><b>Note:</b>Timings for Product Delivery and Pickup will be between 12PM to 7PM. </div>
     </div>
      </TabPanel>
      <TabPanel>
      <h4>Following Document will be required for Consoles</h4>

      <div><CheckIcon />Local Address Proof Id(Original)</div>

      <div><CheckIcon /> Any Govt. Id(Original)</div>
     <div> <CheckIcon /> Post Dated Cheque equivalent to Product if Product costing more than INR 15000 or Nominal Cash deposit will be provided if in case Cheque not available.</div>

     <div> <CheckIcon /> For Games and Controllers no documents required only Security deposit applicable.</div>
      </TabPanel>
    </Tabs>
  );

   /////////////////////////////////////////////////

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
   
    dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
    
   }
   setPageRender (!pageRender);
  }

   
   const productDetails=()=>{
      var rentamt = item.offer > 0 ? item.offer : item.rentamt
      var v = cart [item.subcategoryid]||0
      var qty = 0
      if (v!=0)
      { qty = cart[item.subcategoryid].qtydemand}

       return(
       <div>
            <div style={{padding:10,fontSize:20,fontWeight:'bold',letterSpacing:1}}> 
            {item.subcategoryname}
            </div>


            <div style={{fontSize:16,padding:10}}>
                 Price:<s>&#8377; {item.rentamt}</s>{" "}
                   <span style={{color:'yellowgreen'}}>
                     <b>	&#8377; {item.offer} </b>
                     </span>
             </div>

             <div style={{padding:10}}>
               {(item.stock-item.rented)>0?<div> Availability:{(item.stock-item.rented)} In Stock</div>
               :<div>Not Available this time</div>}
            </div>

            <div style={{display:'flex',flexDirection:'row'}}>
               <div onClick={() =>getPrice("Day",rentamt)} style={{cursor:"pointer",display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',width:120,padding:10,background:'#1289A7',color:'white',margin:10}}>
                    <div> Day Price </div>
                    <div> &#8377;:{rentamt} </div>
                 </div>
                

                 <div onClick={()=>getPrice("Week",rentamt*7)} style={{cursor:"pointer",display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',width:120,padding:10,background:'#12CBC4',color:'white',margin:10}}>
                    <div> Week Price </div>
                    <div> &#8377;:{rentamt*7} </div>
                 </div>

                 <div onClick={()=>getPrice("Month",rentamt*30)} style={{cursor:"pointer",display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center',width:120,padding:10,background:'#60a3bc',color:'white',margin:10}}>
                    <div> Month Price </div>
                    <div> &#8377;:{rentamt*30} </div>
                 </div>
           </div>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:10,width:400}}>

<span> <TodayIcon /> {" "} </span>
<span>Select Rent Duration</span>
</div>

<div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:10,width:400}}>

<span> <TextField
id="date"
label="Start Date"
variant="outlined"
onChange={(event)=>setStartDate(event.target.value)}
type="date"
value = {startDate}
// defaultValue="2017-05-24"
className={classes.textField}
InputLabelProps={{
shrink: true,
}}
/></span>

<span><TextField
id="date"
label="End Date"
variant="outlined"
type="date"
onChange={(event)=>handleDateDifference(event,rentamt)}
value = {endDate}
//defaultValue="2017-05-24"
className={classes.textField}
InputLabelProps={{
shrink: true,
}}
/></span>
</div>


  <div style={{padding:10}}>
   {msg}
  </div>

    <div style={{padding:10}}>
        <QtySpinner value={qty} onChange={(value) => handleQtyChange(value,item)} />
    </div>
       
       </div>)

    }

   const showConsolePictures = () =>{
     return consolePictures.map(function(citem,index){
     return (<div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none'}}>
     <div style={{display:'flex',justifyContent:'center',alignItems:'center',outline:'none',width:70,height:70,border:'2px solid #dcdde1',borderRadius:5,margin:2,cursor:'pointer'}} onMouseEnter={()=>setImage(citem.image)} >
     <img src={`${ServerURL}/images/${citem.image}`} width={56} height={56} />
     </div>
     </div>)

     })
   }
   
   const handleNext = () =>{
   consoleSlider.current.slickNext()
   }

   const handleBack = () =>{
    consoleSlider.current.slickPrev()
  }

   return(
      <div>
       <Header history = {props.history} />
       <div style={{padding:20}}>
       <Grid container spacing={1}>
         <Grid item xs={6}>
             <div style={{padding:15, display:'flex',justifyContent:'center',alignItems:'center'}}>
             <img src={`${ServerURL}/images/${getImage}`} width="300" height="300"/>
             </div>
             {consolePictures.length>=1 && consolePictures.length<=4?(
             <div style={{padding:"30px 10px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <div style={{width:325}}>
                <Slider {...settings} >
                  {showConsolePictures()}
                  </Slider>
              </div>
             </div>):(
               <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <div style={{marginLeft:10,fontSize:"small"}}>
               <ArrowBackIosIcon onClick={()=>handleBack()} />
             </div>
             <div style={{padding:"30px 10px",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
              <div style={{width:325}}>
                <Slider {...settings} ref={consoleSlider}>
                  {showConsolePictures()}
                  </Slider>
              </div>
             </div>
             <div style={{marginRight:10,fontSize:"small"}}>
               <ArrowForwardIosIcon onClick={()=>handleNext()} />
             </div>
             </div>)}
        
         </Grid>

         <Grid item xs={6}>
          {productDetails()}
             
         </Grid>


     </Grid>
     <div>
       {showTabs(item.description)}
     </div>
     <Footer />
     </div>

   </div>)



}