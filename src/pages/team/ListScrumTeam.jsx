import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import CreateTeam from '../../components/team/CreateTeam';
import api from '../../util/api'
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import UpdateTeam from '../../components/team/UpdateTeam';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#049474", color: "white", textAlign: "center"
    },
    buttonCreate:{
        fontSize:15,fontWeight:"bold"
    },
    rowEnd:{
        justifyContent:"flex-end", margin:"auto"
    },
    colCenter:{
        alignSelf:"center"
    }
}));

const ListScrumTeam=()=> {
    const classes = useStyles()
    const [team, setTeam]=useState(null)
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [integrante, setIntegrante] = useState({});

    const getTeam=async()=>{
        const idProject =localStorage.getItem('idProject')
        const response = await api.teams.getByProject(idProject);
        setTeam(response)    
    }

    useEffect(() => {
        const idInterval = setInterval(getTeam,1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [team])
    
    return (
        <Fragment>  
        <Row>
            <Col>
                <h1>SCRUM TEAM</h1>     
            </Col>
            <Col className={classes.colCenter}>
                <Row className={classes.rowEnd}>
                    <Button onClick={()=>setOpen(true)} className={classes.buttonCreate}><AddIcon/> AGREGAR</Button>
                </Row>
            </Col>
        </Row>
        <Table responsive bordered>
                <thead className={classes.root}>
                    <tr>
                        <th>#</th>
                        <th>CLAVE</th>
                        <th>NOMBRE</th>
                        <th>ROL</th>
                        <th>ACTUALIZAR</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {team===null?<tr><th colSpan={6}><CircularProgress /></th></tr>:team.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.name} {item.firstLastName} {item.secondLastName}</td>
                            <td>{item.rol===1?"Product Owner":item.rol===2?"Scrum Master":"Desarrollador"}</td>
                            <td>
                                <Button color="info" size="sm" onClick={() => {setIntegrante(item);setOpenUpdate(true)}}>
                                    <CreateIcon/>
                                </Button>
                            </td>
                        </tr>
                    )}
                    {team!==null?team.length < 1 && (
                        <tr>
                            <th colSpan={6}>NO HAY REGISTROS</th>
                        </tr>
                    ):null}
                </tbody>
            </Table>
            {open&&<CreateTeam
                team={team}
                open={open}
                setOpen={setOpen}
                title={"REGISTRAR INTEGRANTE"}
            />}
            {openUpdate&&<UpdateTeam
                integrante={integrante}
                team={team}
                open={openUpdate}
                setOpen={setOpenUpdate}
                title={"ACTUALIZAR INTEGRANTE"}
            />
            }
        </Fragment>
    )
}

export default ListScrumTeam
