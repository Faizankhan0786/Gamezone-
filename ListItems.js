import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryInterface from './CategoryInterface'
import DisplayAllCategories from './DisplayAllCategories'
import SubCategoryInterface from './SubCategoryInterface'
import DisplayAllSubcategories from './DisplayAllSubcategories'
import AccessoriesInterface from './AccessoriesInterface'
import DisplayAllAccessories from './DisplayAllAccessories'
import GamesInterface from './GamesInterface'
import DisplayAllGames from './DisplayAllGames'

export default function ListItems(props) {

const handleClick=(v)=>{

 props.setComponent(v)

}

 return(
     <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategories/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Categories" onClick={()=>handleClick(<SubCategoryInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Subcategories" onClick={()=>handleClick(<DisplayAllSubcategories/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories" onClick={()=>handleClick(<AccessoriesInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories" onClick={()=>handleClick(<DisplayAllAccessories/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Add Games" onClick={()=>handleClick(<GamesInterface/>)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="List Games" onClick={()=>handleClick(<DisplayAllGames/>)} />
    </ListItem>
  </div>


 
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
);
 }