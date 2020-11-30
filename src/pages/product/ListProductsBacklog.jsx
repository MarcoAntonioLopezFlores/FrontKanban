import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import api from '../../util/api';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import CreateProductBacklog from '../../components/product/CreateProductBacklog';
import UpdateProduct from '../../components/product/UpdateProduct';

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
    },
    sizeButton: {
        borderRadius: 15,width:40,height:40
    }
}));

const ListProductsBacklog=()=> {
    const classes = useStyles()
    const [products, setProducts]=useState(null)
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [product, setProduct] = useState({});

    const getProducts=async()=>{
        const idProject =localStorage.getItem('idProject')
        const response = await api.products.getByProject(idProject);
        setProducts(response)    
    }

    useEffect(() => {
        const idInterval = setInterval(getProducts,1000)
        return () => {
            clearInterval(idInterval)
        }
    }, [products])

    return (
        <Fragment>
            <Row>
            <Col>
                <h1>PRODUCTS BACKLOG</h1>     
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
                        
                        <th>CLAVE</th>
                        <th>PRODUCT BACKLOG</th>
                        <th>PRIORIDAD</th>
                        <th>DESARROLLADOR</th>
                        <th>ACTUALIZAR</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>
                    {products===null?<tr><th colSpan={6}><CircularProgress /></th></tr>:products.map((item, index) =>
                        <tr key={item.id}>
                            <th scope="row">{item.code}</th>
                            <td>{item.funcionality}</td>
                            <td><Button type="button" className={classes.sizeButton}
                                color={item.priority === 1 ? "danger" : item.priority === 2 ? "warning" : "success"}></Button></td>
                            <td>{item.developer.name} {item.developer.firstLastName} {item.developer.secondLastName}</td>
                            <td>
                                <Button color="info" size="sm" onClick={() => {setProduct(item);setOpenUpdate(true)}}>
                                    <CreateIcon/>
                                </Button>
                            </td>
                        </tr>
                    )}
                    {products!==null?products.length < 1 && (
                        <tr>
                            <th colSpan={6}>NO HAY REGISTROS</th>
                        </tr>
                    ):null}
                </tbody>
            </Table>
            {open&&<CreateProductBacklog
                open={open}
                setOpen={setOpen}
                title={"REGISTRAR PRODUCT BACKLOG"}
            />}
            {openUpdate&&<UpdateProduct
                    product={product}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    title={"ACTUALIZAR PROYECTO"}
                />}
        </Fragment>
    )
}

export default ListProductsBacklog
