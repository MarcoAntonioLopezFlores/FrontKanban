import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import DescriptionIcon from '@material-ui/icons/Description';
import TimelineIcon from '@material-ui/icons/Timeline';
import { Link } from 'react-router-dom';
import '../../styles/global.css'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  linkSelected: {
    backgroundColor: "#049474"
  },
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#002E5D",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#002E5D",
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NavProjects(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [numero, setNumero] = React.useState(1)

  const handleCollapseOpen = () => {
    setOpenCollapse(!openCollapse);
  };
  const onSelectItem = (n) => {
    setNumero(n)
  }
  
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SISTEMA KANBAN
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "white" }} /> : <ChevronRightIcon style={{ color: "white" }} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem className={clsx("link", numero === 1 && classes.linkSelected)} component={Link} to={"/project/list"} onClick={() => { onSelectItem(1)}} >
            <ListItemIcon><FolderIcon style={{ color: "white" }} /></ListItemIcon>
            <ListItemText primary={"Proyectos"} />
          </ListItem> 
          <ListItem className={clsx("link", numero === 4 && classes.linkSelected)} onClick={() => {onSelectItem(4);handleCollapseOpen()}}>
            <ListItemIcon style={{ color: "white" }}><DescriptionIcon/></ListItemIcon>
            <ListItemText primary={"Informes"} />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={clsx("link",classes.nested)} component={Link} to={"/project/report"}>
              <ListItemIcon>
              <ListItemIcon style={{ color: "white" }}><AssessmentIcon /></ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Proyectos" />
            </ListItem>
            <ListItem className={clsx("link",classes.nested)} component={Link} to={"/project/report/kanban"}>
              <ListItemIcon>
              <ListItemIcon style={{ color: "white" }}><TimelineIcon /></ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Tableros" />
            </ListItem>
          </List>
        </Collapse> 
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
}
