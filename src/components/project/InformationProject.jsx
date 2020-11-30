import React, { Fragment} from 'react'
import { Col, Row } from 'reactstrap'
import Paper from '@material-ui/core/Paper'
import {makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2.5),     
    },
    marginRow:{
        marginTop:20
    }
}));

const InformationProject = (props) => {
    const classes = useStyles()
    

    return (
        <Fragment>
            <Paper elevation={3} className={classes.root}>             
                    <Row>                     
                        <Col>
                            <TextField label="Clave" variant="outlined" fullWidth                   
                            value={props.code}
                            InputLabelProps={{
                                readOnly: true,                                
                            }}></TextField>
                        </Col>
                        <Col>
                            <TextField label="Nombre" variant="outlined" fullWidth 
                            InputLabelProps={{
                                shrink: true,
                            }}
                            readOnly value={props.name} />
                        </Col>         
                        <Col>           
                            <TextField label="Fecha Status" variant="outlined" fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }} 
                                readOnly value={`${props.statusDate.getDate()}/${(props.statusDate.getMonth()+1)}/${props.statusDate.getFullYear()}`}  />
                        </Col> 
                        <Col>
                            <TextField label="Status" variant="outlined" fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            readOnly value={props.status} />
                        </Col>
                    </Row>
                    <Row className={classes.marginRow}>       
                        <Col>
                            <TextField 
                            fullWidth
                            label="Product Owner" variant="outlined" readOnly value={props.master} />
                        </Col>            
                        <Col>
                            <TextField 
                            fullWidth
                            label="Scrum Master" variant="outlined" readOnly value={props.owner} />
                        </Col>
                    </Row>             
            </Paper>
        </Fragment>
    )
}

export default InformationProject
