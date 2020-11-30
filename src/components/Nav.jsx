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
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import '../styles/global.css'
import TableChartIcon from '@material-ui/icons/TableChart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
    paddingLeft: theme.spacing(4),
    color:"#FFFFFF"
  }
}));

export default function Nav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false)
  
  const [numero, setNumero] = React.useState(1)
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
        <ListItem className={clsx("link", numero === 1 && classes.linkSelected)} component={Link} to={"/project/table"} onClick={() => { onSelectItem(1)}} >
            <ListItemIcon style={{ color: "white" }} ><TableChartIcon /></ListItemIcon>
            <ListItemText primary={"Tablero"} />
          </ListItem>
          <ListItem className={clsx("link", numero === 2 && classes.linkSelected)} component={Link} to={"/team/table"} onClick={() => onSelectItem(2)}>
            <ListItemIcon style={{ color: "white" }} ><GroupIcon /></ListItemIcon>
            <ListItemText primary={"Scrum Team"} />
          </ListItem>
          <ListItem className={clsx("link", numero === 3 && classes.linkSelected)} component={Link} to={"/products/table"} onClick={() => onSelectItem(3)}>
            <ListItemIcon style={{ color: "white" }}><AssignmentIcon /></ListItemIcon>
            <ListItemText primary={"Products Backlog"} />
          </ListItem>
          
        <ListItem className={"link"} component={Link} to={"/project/list"}>
            <ListItemIcon style={{ color: "white" }} ><ArrowBackIcon/></ListItemIcon>
            <ListItemText primary={"Volver"} />
          </ListItem>
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
