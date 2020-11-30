import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, MenuItem } from '@material-ui/core';
import React, { useEffect, useState} from 'react'
import { Button, Col, Row } from 'reactstrap'
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx'
import api from '../../util/api';
import swal from 'sweetalert';

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

const CreateProductBacklog = (props) => {
    const classes = useStyles()
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [priority, setPrority] = useState(1)
    const [developers,setDevelopers]=useState([])
    const [idDeveloper,setIdDeveloper]=useState(1)

    const getDevelopers=async()=>{
        const idProject =localStorage.getItem('idProject')
        const response = await api.teams.getByRol(idProject,3);
        console.log(response)
        setDevelopers(response)
        
        //setIdDeveloper(response[0].id)    
    }

    useEffect(()=>getDevelopers(),[])

    const addProduct= async()=>{
        console.log(developers)
        console.log(developers[idDeveloper-1].id)
        const data = {
            code: code,
            funcionality: name,
            priority: priority,
            status: developers.length>0?2:1,
            developer: {
                id: developers[idDeveloper-1].id
            },    
            project: {
                id: localStorage.getItem('idProject')
            }
        }
        
        console.log(data)
        try {          
            const response=await api.products.create(data);
            console.log(response)
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
            open={props.open} onClose={() => props.setOpen(false)}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent >
            <Row >
                <Col>
                    <TextField fullWidth label="Clave" variant="outlined"
                        onChange={(e) => setCode(e.target.value)}/>
                </Col >
                <Col>
                    <TextField fullWidth label="Funcionalidad" variant="outlined"
                        onChange={(e) => setName(e.target.value)}/>
                </Col >
            </Row>
            <Row className={classes.marginRow}>                
                <Col>
                <TextField fullWidth select label="Prioridad" variant="outlined"
                        onChange={(e) => setPrority(e.target.value)} value={priority}>         
                        <MenuItem key={1} value={1}>Alta</MenuItem>
                        <MenuItem key={2} value={2}>Media</MenuItem>
                        <MenuItem key={3} value={3}>Baja</MenuItem>
                    </TextField>
                </Col >
                <Col>
                    <TextField fullWidth label="Status" variant="outlined" 
                    value={developers.length>0?"Seleccionado":"Pendiente"} readOnly/>       
                </Col >
            </Row>
            <Row className={classes.marginRow}>
            <Col>
                <TextField fullWidth select label="Desarrollador" variant="outlined"
                        onChange={(e) => setIdDeveloper(e.target.value)} value={idDeveloper}>         
                        {developers.length > 0? developers.map((developer,index)=>
                            <MenuItem key={index} value={index+1}>{developer.name} {developer.firstLastName} {developer.secondLastName}</MenuItem>
                        ):<MenuItem key={0} value={1} disabled>SIN DESARROLLADORES</MenuItem>}
                    </TextField>
            </Col >
            </Row>
            
            </DialogContent>
            <DialogActions>
                <Col>
                    <Button onClick={() => props.setOpen(false)}
                        className={clsx("btn btn-md btn-block", classes.buttonCancelar)}>Cancelar</Button>
                </Col>
                <Col>
                    <Button onClick={() => { addProduct(); props.setOpen(false) }} type="button"
                        className={clsx("btn btn-md btn-block", classes.button)}>Registrar</Button>

                </Col>
            </DialogActions>
        </Dialog>
    )
}

export default CreateProductBacklog
