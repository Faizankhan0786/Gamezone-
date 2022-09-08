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
export default function DisplayAllSubcategory(props)
{ const [list,setList] = useState()
const classes = useStyles();

///////////////////////////Edit Form///////////////////////////////

const [subcategoryId,setSubCategoryId]=useState('')
const [categoryId,setCategoryId]=useState('')
const [subCategoryName,setSubCategoryName]=useState('')
const [subCategoryDescription,setSubCategoryDescription]=useState('')
const [icon,setIcon]=useState({bytes:'',file:'/noimage.webp'})
const [ad,setAd]=useState({bytes:'',file:'/noimage.webp'})
const [adStatus,setAdStatus]=useState('')
const [price,setPrice]=useState('')
const [stock,setStock]=useState('')
const [rented,setRented]=useState('')
const [rentamt,setRentamt]=useState('')
const [offer,setOffer]=useState('')
const [iconSaveCancel,setIconSaveCancel]=useState(false)
const [adSaveCancel,setAdSaveCancel]=useState(false)
const [getRowData,setRowData]=useState([])
const[listCategory,setListCategory]=useState([])



const handleAd=(event)=>{
  setAd({bytes:event.target.files[0],
   file:URL.createObjectURL(event.target.files[0]),
  });
  setAdSaveCancel(true)
  }

  const handleIcon=(event)=>{
    setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0]),
    });
    setIconSaveCancel(true)
    }
    
   
    const handleDelete = async () => {
      var body={subcategoryid:subcategoryId}
     var result= await postData("subcategories/deletesubcategory",body)
     if(result)
     {
       swal({
         title: "Subcategory Deleted Successfully",
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
      if(isBlank(subCategoryName))
      {error=true
       msg+="<font color='green'><b>Category Name Should not be blank..</b></font><br>"
      }
      if(isBlank(subCategoryDescription))
  {error=true
    msg+="<font color='green'><b>Description Should not be blank..</b></font><br>"
  }

  if(isBlank(price))
  {error=true
    msg+="<font color='green'><b>Price Should not be blank..</b></font><br>"
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
  if(isBlank(offer))
  {error=true
    msg+="<font color='green'><b>Offer  Should not be blank..</b></font><br>"
  }
  
  if(isBlank(adStatus))
  {error=true
    msg+="<font color='green'><b>Please choose ad status..</b></font><br>"
  }
  msg+="</div>"
 
  if (error)
{
  swalhtml(renderHTML(msg))
}
else{
 

   
  var body={"subcategoryid":subcategoryId,"categoryid":categoryId,"subcategoryname":subCategoryName,"description":subCategoryDescription,"adstatus":adStatus,"price":price,"stock":stock,"rented":rented,"rentamt":rentamt,"offer":offer}
  
 
  var result= await postData('subcategories/editsubcategorydata',body)
  if(result)
  {
    swal({
      title: "Subcategory Updated Successfully",
      icon: "Success",
      dangerMode: true,
    })
   }
  } 
 }
 const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})

 }
 const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setAd({bytes:"",file:`${ServerURL}/images/${getRowData.ad}`})

 }
 const handleClickSaveIcon=async()=>{
  var formData=new FormData()
  formData.append("subcategoryid",subcategoryId)
  
  
  formData.append("icon",icon.bytes)
  
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('subcategory/editicon',formData,config)
  if(result)
  {
    swal({
      title: "Icon Updated Successfully",
      icon: "Success",
      dangerMode: true,
     });
      setIconSaveCancel(false)
    }

 }

 const handleClickSaveAd=async()=>{
  var formData=new FormData()
  formData.append("subcategoryid",subcategoryId)
  
  
  formData.append("ad",ad.bytes)
  
  var config={headers:{"content-type":"multipart/form-data"}}
  var result= await postDataAndImage('subcategory/editad',formData,config)
  if(result)
  {
    swal({
      title: "Ad Updated Successfully",
      icon: "Success",
      dangerMode: true,
     });
      setAdSaveCancel(false)
    }

 }

 const editFormView=()=>{

  return (<div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={1}>
    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div style={{ fontSize:22,fontWeight:700,letterSpacing:2,padding:20}}>
        Sub Category Interface
    </div>
    </Grid>

     <Grid item xs={12}>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-category"
          id="demo-simple-select-outlined-category"
          value={categoryId}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Category ID"
        >
         
         {showCategory()}
        </Select>
      </FormControl>
      </Grid>
   
   
   <Grid item xs={12}>
      <TextField value={subCategoryName} onChange={(event)=>setSubCategoryName(event.target.value)} label="Sub Category Name" variant="outlined" fullWidth/>
      </Grid>
    
      <Grid item xs={12}>
      <TextField value={subCategoryDescription} onChange={(event)=>setSubCategoryDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
      </Grid>
      
      <Grid item xs={12}>
      <TextField onChange={(event)=>setPrice(event.target.value)} label="Price" variant="outlined" fullWidth/>
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

      <Grid item xs={6}>
      <span style={{fontSize:16,fontWeight:300}}>
        Edit Sub Category Icon 
        
        </span>
      <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> 
      </Grid>
      
      <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Avatar variant="rounded" src={icon.file} style={{width:60,height:60}} />
      {iconSaveCancel?<span><Button onClick={()=>handleClickSaveIcon()} color="primary" >Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()} >Cancel</Button></span>:<></>}
      </Grid>

      <Grid item xs={12} sm={6}>
      <span style={{fontSize:16,fontWeight:300}}>
      Edit Sub Category Ad
      
      </span>


      <input onChange={(event)=>handleAd(event)}accept="image/*" className={classes.input} id="icon-button-ad" type="file" />
      <label htmlFor="icon-button-ad">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label> 
      </Grid>

      
       <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Avatar variant="rounded" src={ad.file} style={{width:60,height:60}} />
      {adSaveCancel?<span><Button onClick={()=>handleClickSaveAd()} color="primary" >Save</Button><Button color="secondary" onClick={()=>handleCancelAd()} >Cancel</Button></span>:<></>}
      </Grid>

      <Grid item xs={12}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={adStatus}
          onChange={(event)=>setAdStatus(event.target.value)}
          label="Ad Status"
        >
          
          <MenuItem value={'Activate'}>Activate</MenuItem>
          <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
          
        </Select>
      </FormControl>
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
  setSubCategoryId(rowData.subcategoryid)
  setCategoryId(rowData.categoryid)
  setSubCategoryName(rowData.subcategoryname)
  setSubCategoryDescription(rowData.description)
  setIcon({bytes:"",file:`${ServerURL}/images/${rowData.icon}`})
  setAd({bytes:"",file:`${ServerURL}/images/${rowData.ad}`})
  setAdStatus(rowData.adstatus)
  setPrice(rowData.price)
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
              Edit/Delete Game Subcategories
            </Typography>
            <Button autoFocus color="inherit" onClick={()=>handleClick()}>
              Update
            </Button>
            <Button autoFocus color="inherit" onClick={()=>handleDelete()}>
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

    const fetchAllSubCategory=async()=>{
        var result=await getData("subcategories/displayallsub")
        setList(result)
        }  
        
        const fetchAllCategory=async()=>{
          var result=await getData("categories/displayall")
          setListCategory(result)
          }
          
          const showCategory=()=>{
            return listCategory.map((item)=>{
              return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
              
            })
            
            }

        useEffect(function(){
          fetchAllSubCategory()
          fetchAllCategory()
         },[])

function displayAllSub() {
    return (
      <div>
      <MaterialTable
        title="Subcategory List"
        columns={[
          { title: 'Id', field: 'subcategoryid' },
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Name', field: 'subcategoryname'},
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rentamount', field: 'rentamt' },
          { title: 'Offer', field: 'offer' },
          { title: 'Icon', field: 'icon',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} style={{borderRadius:5}} width='40' height='40' /></div>)},
          { title: 'Ad', field: 'ad',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.ad}`} style={{borderRadius:5}} width='40' height='40' /></div>)},
          { title: 'Status', field: 'adstatus' },
        ]}
            
        data={list}        
        actions={[
          {
            icon: 'editoutlined',
            tooltip: 'Edit Subcategories',
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
{displayAllSub()}
</div>
</div>)



}