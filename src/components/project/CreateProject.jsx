import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import api from '../../util/api'
import swal from 'sweetalert'
import clsx from 'clsx'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Dialog, DialogTitle, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: "#049474", fontWeight: "bold", borderBottomWidth: 3, borderColor: "green"
    },
    buttonCancelar:{
        backgroundColor: "tomato", fontWeight: "bold", borderBottomWidth: 3, borderColor: "red"
    },
    marginRow:{
        marginTop: 20 
    },
    marginButton:{
        margin:"auto"
    }
}));

const CreateProject = (props) => {
    const classes = useStyles()
    const [clave, setClave] = useState("")
    const [nombre, setNombre] = useState("")
    const [fechaInicio, setFechaInicio] = useState("")
    const [fechaFin, setFechaFin] = useState("")
    const statusDate = new Date()
    
    const handleSaveProject = async () => {
        const data = {
            code: clave,
            name: nombre,
            startDate: fechaInicio,
            finishDate: fechaFin,
            status:"Pendiente"
        }

        try {          
            const response=await api.projects.create(data);
            if(response.id!==null || response.id!==undefined){
                swal({
                    title: "¡ÉXITO!",
                    text: "Registro éxitoso",
                    icon: "success",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog   
          open={props.open} onClose={()=>props.setOpen(false)}
          fullWidth
          maxWidth="sm"  
        >
        <DialogTitle>{props.title}</DialogTitle>
            <DialogContent >
            <Row>
                <Col>
                    <TextField fullWidth label="Clave" variant="outlined" value={clave}
                        onChange={(e) => setClave(e.target.value)}/>           
                </Col >
                <Col>
                <TextField fullWidth label="Nombre" variant="outlined" value={nombre}
                        onChange={(e) => setNombre(e.target.value)}/>           
                </Col >
            </Row>
            <Row className={classes.marginRow}>
                <Col>
                <TextField fullWidth label="Fecha de Inicio" variant="outlined" value={fechaInicio}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setFechaInicio(e.target.value)}/>           
                </Col >
                <Col>
                <TextField fullWidth label="Fecha de Fin" variant="outlined" value={fechaFin}
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(e) => setFechaFin(e.target.value)}/>         
                </Col >
            </Row>
            <Row className={classes.marginRow}>
                <Col>
                <TextField fullWidth label="Fecha de Status" variant="outlined"
                        value={`${statusDate.getDate()}/${(statusDate.getMonth()+1)}/${statusDate.getFullYear()}`} 
                        readOnly/>            
                </Col >
                <Col>
                <TextField fullWidth label="Status" variant="outlined"
                        value={"Pendiente"}
                        readOnly/>               
                </Col >
            </Row>        
          </DialogContent>
          <DialogActions>
              <Col>       
                <Button onClick={()=>props.setOpen(false)} 
                        className={clsx("btn btn-md btn-block", classes.buttonCancelar)}>Cancelar</Button>
                        </Col>          
              <Col>
                <Button onClick={()=>{handleSaveProject();props.setOpen(false)}} type="button" 
                        className={clsx("btn btn-md btn-block", classes.button)}>Registrar</Button>                    
            </Col>                
          </DialogActions>          
          </Dialog>
    )
}

export default CreateProject
