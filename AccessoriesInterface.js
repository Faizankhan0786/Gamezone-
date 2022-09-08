import React,{useState,useEffect} from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from "@material-ui/core/Avatar"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from "sweetalert"
import swalhtml from "@sweetalert/with-react"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import {ServerURL,getData,postDataAndImage,postData} from "./FetchNodeServices" 
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"





const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    subdiv:{
       padding:20,
       width:700,
       marginTop:20,
       background :'#f1f2f6'
    },  
       input: {
        display: 'none',
    },
    
  }));
  
export default function AccessoriesInterface(props)
{const classes = useStyles();
  const [subcategoryId,setSubCategoryId]=useState('')
  const [categoryId,setCategoryId]=useState('')
  const [accessoryName,setAccessoryName]=useState('')
  const [accessoryDescription,setAccessoryDescription]=useState('')
  const [price,setPrice]=useState('')
  const [picture,setPicture]=useState({bytes:'',file:'/noimage.webp'})
  const [stock,setStock]=useState('')
  const [rented,setRented]=useState('')
  const [rentamt,setRentamt]=useState('')
  const [offer,setOffer]=useState('')

  const [listCategory,setListCategory]=useState([])
  const [listSubCategory,setListSubCategory]=useState([])

  const handleCategoryChange=async(event)=>{
      setCategoryId(event.target.value)
      var body={categoryid:event.target.value}
      var result=await postData("subcategories/displaysubcategorybycategoryid",body)
      setListSubCategory(result)
      }

  const fetchAllCategory=async()=>{
   var result=await getData("categories/displayall")
   setListCategory(result)
   }
   useEffect(function(){
   fetchAllCategory()
 
   },[])
 
 const fillCategory=()=>{
 return listCategory.map((item)=>{
   return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
   })
 }

 const fillSubCategory=()=>{
  return listSubCategory.map((item)=>{
    return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
  }
  
  const handlePicture=(event)=>{
  setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
    
  }

  
    
 const handleClick=async()=>{
  var error=false
  var msg="<div>"
    if(isBlank(categoryId))
      {error=true
       msg+="<font color='green'><b>Category Id Should not be blank..</b></font><br>"
      }
      if(isBlank(subcategoryId))
      {error=true
       msg+="<font color='green'><b>Subcategory Id Should not be blank..</b></font><br>"
      }
      if(isBlank(accessoryName))
      {error=true
       msg+="<font color='green'><b>Accessory Name Should not be blank..</b></font><br>"
      }
      if(isBlank(accessoryDescription))
  {error=true
    msg+="<font color='green'><b>Description Should not be blank..</b></font><br>"
  }
  if(isBlank(price))
  {error=true
    msg+="<font color='green'><b>Price Should not be blank..</b></font><br>"
  }
  if(isBlank(picture.bytes))
  {error=true
    msg+="<font color='green'><b>Please select picture..</b></font><br>"
  }
  if(isBlank(stock))
  {error=true
    msg+="<font color='green'><b>Stock Should not be blank..</b></font><br>"
  }
  if(isBlank(rented))
  {error=true
    msg+="<font color='green'><b>Rented Should not be blank..</b></font><br>"
  }
  if(isBlank(rentamt))
  {error=true
    msg+="<font color='green'><b>Rent Ammount Should not be blank..</b></font><br>"
  }
  if(isBlank(rentamt))
  {error=true
    msg+="<font color='green'><b>Offer Should not be blank..</b></font><br>"
  }
  msg+="</div>"
  if (error)
{
  swalhtml(renderHTML(msg))
}
else{
 

    var formData=new FormData()
  formData.append("categoryid",categoryId)
  formData.append("subcategoryid",subcategoryId)
  formData.append("accessoryname",accessoryName)
  formData.append("description",accessoryDescription)
  formData.append("price",price)
  formData.append("picture",picture.bytes)
  formData.append("stock",stock)
  formData.append("rented",rented)
  formData.append("rentamt",rentamt)
  formData.append("offer",offer)
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('accessories/addnewaccessories',formData,config)
  if(result)
  {
    swal({
      title: "Accessory Submitted Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  } 
 }

  return (<div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={1}>
    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div style={{ fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
        Accessories Interface
    </div>
    </Grid>

     <Grid item xs={12}>
     <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          //value={age}
          onChange={(event)=>handleCategoryChange(event)}
          label="Category ID"
        >
         
         {fillCategory()}
        </Select>
      </FormControl>

      </Grid>
     
      <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          //value={age}
          onChange={(event)=>setSubCategoryId(event.target.value)}
          label="SubCategory ID"
        >
         
         {fillSubCategory()}
        </Select>
      </FormControl>
      </Grid>
   
   <Grid item xs={12}>
      <TextField onChange={(event)=>setAccessoryName(event.target.value)} label="Accessory Name" variant="outlined" fullWidth/>
      </Grid>
    
      <Grid item xs={12}>
      <TextField onChange={(event)=>setAccessoryDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={12}>
      <TextField onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
      </Grid>
      
      <Grid item xs={6}>
      <span style={{fontSize:16,fontWeight:300}}>Upload Accessory Picture</span>
      <input onChange={(event)=>handlePicture(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> 
      </Grid>
      
      <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Avatar variant="rounded" src={picture.file} style={{width:60,height:60}} />
      </Grid>
     
      <Grid item xs={12}>
      <TextField onChange={(event)=>setStock(event.target.value)} label="Stock" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={12}>
      <TextField onChange={(event)=>setRented(event.target.value)} label="Rented" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={12}>
      <TextField onChange={(event)=>setRentamt(event.target.value)} label="Rent Amount" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={12}>
      <TextField onChange={(event)=>setOffer(event.target.value)} label="Offer" variant="outlined" fullWidth/>
      </Grid>

    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Button onClick={()=>handleClick()} fullWidth variant="contained" color="primary">Save</Button>
   </Grid>
   
   <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Button fullWidth variant="contained" color="secondary">Reset</Button>
   </Grid>

  </Grid>  
</div>

</div>)  

  }