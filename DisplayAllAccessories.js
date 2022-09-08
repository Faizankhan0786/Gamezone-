import MaterialTable from "material-table"
import React,{useState,useEffect} from "react"


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from "@material-ui/core/Avatar"
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swal from "sweetalert"
import swalhtml from "@sweetalert/with-react"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {ServerURL,postData,postDataAndImage,getData} from "./FetchNodeServices" 
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
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
formControl: {
    
    minWidth: 700,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DisplayAllAccessories(props)
{ const [list,setList] = useState()
const classes = useStyles();

///////////////////////////Edit Form///////////////////////////////

const [accessoryId,setAccessoryId]=useState('')
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
const [pictureSaveCancel,setPictureSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])

const [listCategory,setListCategory]=useState([])
const [listSubCategory,setListSubCategory]=useState([])

const handleCategoryChange=async(event)=>{
    setCategoryId(event.target.value)
    fillSubCategoryByCategoryId(event.target.value)
   }
   
const fillSubCategoryByCategoryId=async(cid)=>{
  var body={categoryid:cid}
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
   file:URL.createObjectURL(event.target.files[0]),
  });
  setPictureSaveCancel(true)
  }

  
    
   
    const handleDelete = async () => {
      var body={accessoryid:accessoryId}
     var result= await postData("accessories/deleteaccessories",body)
     if(result)
     {
       swal({
         title: "Accessory Deleted Successfully",
         icon: "success",
         dangerMode: true,
        });
       }
       else
       {
         swal({
           title: "Fail to Deleted Record",
           icon: "success",
           dangerMode: true,
          });
       }
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
       msg+="<font color='green'><b>Accessory Price Should not be blank..</b></font><br>"
      }
    
      if(isBlank(picture))
      {error=true
       msg+="<font color='green'><b>Please Select Picture..</b></font><br>"
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
       msg+="<font color='green'><b>Rent Amount Should not be blank..</b></font><br>"
      }
      if(isBlank(offer))
      {error=true
        msg+="<font color='green'><b>Offer Should not be blank..</b></font><br>"
       }
 
  msg+="</div>"
 
  if (error)
{
  swalhtml(renderHTML(msg))
}
else{
 

   
  var body={"accessoryid":accessoryId,"subcategoryid":subcategoryId,"categoryid":categoryId,"accessoryname":accessoryName,"description":accessoryDescription,"price":price,"stock":stock,"rented":rented,"rentamt":rentamt,"offer":offer}
  
 
  var result= await postData('accessories/editaccessoriesdata',body)
  if(result)
  {
    swal({
      title: "Accessories Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
   }
  } 
 }
 const handleCancelPicture=()=>{
  setPictureSaveCancel(false)
  setPicture({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`})
}
 
 const handleClickSavePicture=async()=>{
  var formData=new FormData()
  formData.append("accessoryid",accessoryId)
  
  
  formData.append("picture",picture.bytes)
  
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('accessories/editpicture',formData,config)
  if(result)
  {
    swal({
      title: "Picture Updated Successfully",
      icon: "success",
      dangerMode: true,
     });
      setPictureSaveCancel(false)
    }

 }



 const editFormView=()=>{

  return (<div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={1}>
    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div style={{ fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
        Accessories Interface
    </div>
    </Grid>

    <Grid item xs={12}>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={categoryId}
          onChange={(event)=>handleCategoryChange(event)}
          label="Category ID"
        >
         
         {fillCategory()}
        </Select>
      </FormControl>

      </Grid>
     
      <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-subcategory">SubCategory ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-subcategory"
          id="demo-simple-select-outlined-subcategory"
          value={subcategoryId}
          onChange={(event)=>setSubCategoryId(event.target.value)}
          label="SubCategory ID"
        >
         
         {fillSubCategory()}
        </Select>
      </FormControl>
      </Grid>
   
   
   <Grid item xs={12}>
      <TextField value={accessoryName} onChange={(event)=>setAccessoryName(event.target.value)} label="Accessory Name" variant="outlined" fullWidth/>
      </Grid>
    
      <Grid item xs={12}>
      <TextField value={accessoryDescription} onChange={(event)=>setAccessoryDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
      </Grid>

      <Grid item xs={12}>
      <TextField value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
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

 </Grid>  
</div>

</div>)  

 }

////////////////////////////////////////////////////////////////////

////////////////////////Edit Dialog//////////////////////////////////

const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setRowData(rowData)
  setOpen(true);
  setAccessoryId(rowData.accessoryid)
  setCategoryId(rowData.categoryid)
  fillSubCategoryByCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setAccessoryName(rowData.accessoryname)
  setAccessoryDescription(rowData.description)
  setPrice(rowData.price)
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`})
  setStock(rowData.stock)
  setRented(rowData.rented)
  setRentamt(rowData.rentamt)
  setOffer(rowData.offer)
  
};

const handleClose = () => {
  setOpen(false);
  fetchAllCategory();
};

const showEditDialog=()=>{
  return (
    <div>
     
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Edit/Delete Game Accessories
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleClick()}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={handleDelete}>
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        {editFormView()}
      </Dialog>
    </div>
  );
}


////////////////////////////////////////////////////////////////////

    const fetchAllAccessories=async()=>{
        var result=await getData("accessories/displayallaccessories")
        setList(result)
        }  
        
        useEffect(function(){
          fetchAllAccessories()
        
        },[])

function displayAllAccessories() {
    return (
      <div>
      <MaterialTable
        title="Accessories List"
        columns={[
          { title: 'Id', field: 'accessoryid' },
          { title: 'SubcategoryId', field: 'subcategoryid' },
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Name', field: 'accessoryname'},
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'Picture', field: 'picture',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='40' height='40' /></div>)},
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rentamount', field: 'rentamt' },
          { title: 'Offer', field: 'offer' },
        ]}
            
        data={list}        
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Accessories',
            onClick: (event, rowData) =>handleClickOpen(rowData),
          },
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }




return(<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
   <div style={{width:'900',marginTop:'10',padding:3}}>
{displayAllAccessories()}
</div>
</div>)



}