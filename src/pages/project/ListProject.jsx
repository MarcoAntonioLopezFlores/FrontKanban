import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import api from '../../util/api'
import TableChartIcon from '@material-ui/icons/TableChart';
import { CircularProgress, makeStyles } from '@material-ui/core';
import CreateProject from '../../components/project/CreateProject';
import NavProjects from '../../components/project/NavProjects';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CreateIcon from '@material-ui/icons/Create';
import UpdateProject from '../../components/project/UpdateProject';

//#049474 #002E5D
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

const ListProject = (props) => {
    const classes = useStyles()
    const [projects, setProjects] = useState(null)
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [project, setProject] = useState({});

    const getProjects = () => {
        api.projects.list().then(listProjects => {
            setProjects(listProjects)
        })
    }

    const getTableKanban = async (index) => {
        localStorage.setItem("idProject", JSON.stringify(projects[index].id))
        props.history.push("/project/table")
    }
    useEffect(() => {
        const idInterval = setInterval(getProjects, 1000)

        return () => {
            
            clearInterval(idInterval)
        }
    }, [projects])

    return (

        <Fragment>
            <NavProjects setOpen={setOpen}>
                <Row>
                    <Col>
                        <h1>PROYECTOS</h1>
                    </Col>
                    <Col className={classes.colCenter}>
                        <Row className={classes.rowEnd}>
                            <Button onClick={() => setOpen(true)} className={classes.buttonCreate}><CreateNewFolderIcon /> AGREGAR</Button>
                        </Row>
                    </Col>
                </Row>
                <Table responsive bordered>
                    <thead className={classes.root}>
                        <tr>
                            <th>#</th>
                            <th>CLAVE</th>
                            <th>NOMBRE</th>
                            <th>TABLERO KANBAN</th>
                            <th>ACTUALIZAR</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {projects === null ? <tr><th colSpan={6}><CircularProgress /></th></tr> : projects.map((item, index) =>
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Button style={{backgroundColor:"#002E5D"}} size="sm" onClick={() => getTableKanban(index)}>
                                        <TableChartIcon />
                                    </Button>
                                </td>
                                <td>
                                <Button color="info" size="sm" onClick={() => {setProject(item);setOpenUpdate(true)}}>
                                    <CreateIcon/>
                                </Button>
                            </td>
                            </tr>
                        )}
                        {projects !== null ? projects.length < 1 && (
                            <tr>
                                <th colSpan={6}>NO HAY REGISTROS</th>
                            </tr>
                        ) : null}
                    </tbody>
                </Table>
                {open&&<CreateProject
                    
                    open={open}
                    setOpen={setOpen}
                    title={"REGISTRAR PROYECTO"}
                />}

                {openUpdate&&<UpdateProject  
                    project={project}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    title={"ACTUALIZAR PROYECTO"}
                />}
            </NavProjects>
        </Fragment>
    )
}

export default ListProject
