import React, { useState,useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import NavBar from '../NavBar/NavBar';
import { createBL } from '../redux/actions/blActions';
 // Import the generatePdf action
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { ToastContainer, toast } from 'react-toastify';
import BASE_URL from '../services/apiConfig';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { FaFileImport } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import axios from 'axios';


import './AddBl.css';

function AddBL() {
  const dispatch = useDispatch();
  const TunisiaGovernorates = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Gafsa',
    'Jendouba',
    'Kairouan',
    'Kasserine',
    'Kebili',
    'Kef',
    'Mahdia',
    'Manouba',
    'Medenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sidi Bouzid',
    'Siliana',
    'Sousse',
    'Tataouine',
    'Tozeur',
    'Tunis', // the capital
    'Zaghouan',
  ];
  const userId = useSelector((state) => state.auth.user?.id);
  const [blId, setBlId] = useState(null); // State to store the BL ID
  const navigate = useNavigate(); // Get the navigate function from React Router
	const notify = () => toast.success('BL created successfully !');
  const [formData, setFormData] = useState({
    nomDest: '',
    numTelephone1: '',
    numTelephone2: '',
    address: '',
    gov: '',
    delegation: '',
    desc: '',
    prixHliv: '',
  });
  const {handleSubmit, register } = useForm();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Redirect to the URL with the actual user ID when the component mounts
    if (userId) {
      navigate(`/bl/${userId}/createbl`);
    }
  }, [navigate, userId]);





    // Dispatch the createBL action and get the BL ID from the payload
    const handleFormSubmit = async () => {
      try {
        // Dispatch the createBL action with the combined form data
        const { payload: createdBL } = await dispatch(createBL({ userId, blData: formData }));
  
        if (createdBL) {
          notify();
          setBlId(createdBL);
          console.log(createBL);
        } else {
          console.error('Invalid BL data received:', createdBL.id);
        }
      } catch (error) {
        console.error('Error creating BL:', error);
      } };
  
  

  const handleGeneratePdfClick = () => {
    if (blId) {
      const downloadUrl = `${BASE_URL}/bl/${blId}/file`;
      window.location.href = downloadUrl;

    } else {
      // Handle the case where the BL ID is not available
      console.error('BL ID not available');
    }
  };
  const handleExcelFile= async () => {
    

    try {
      await axios.get(`http://localhost:3000/upload-groupe/download`);

      // You may want to handle success and navigation logic here
      console.log('File downloaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container">
    <NavBar />
  
    <div className='import'>
    <div className='buttons-container'>
   
      <Button className='btn-modéle' onClick={ handleExcelFile}> 
        <p>Télécharger Modèle</p>
        <FaFileDownload />
      </Button>
  
    
    
    <Link to="/bl/:idUser/importex">
      <Button className='btn-excel'> 
        <p>Importer un fichier</p>
        <FaFileImport />
      </Button>
    </Link>
  
   
  </div>
</div>
    
        
      


        <div className='form-bl'>

        
    <Form onSubmit={handleSubmit(handleFormSubmit)}  >
    <div className="InfoDest">
   
        <Form.Label className='saisie'>Saisir ici les données de votre destinataire :</Form.Label>
       <Row className="mb-3">
         <Form.Group as={Col} md="4" controlId="nom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              {...register('nomDest', { required: true })}
              type="text"
              placeholder="Nom"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="numTelephone1">
            <Form.Label>Téléphone 1</Form.Label>
            <Form.Control
              {...register('numTelephone1', { required: true })}
              type="tel"
              placeholder="Téléphone 1"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="numTelephone2">
            <Form.Label>Téléphone 2</Form.Label>
            <Form.Control
              {...register('numTelephone2', { required: true })}
              type="tel"
              placeholder="Téléphone 2"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
         </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="address">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              {...register('address', { required: true })}
              type="text"
              placeholder="Adresse"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="gov">
  <Form.Label>Governorat</Form.Label>
  <Form.Select {...register('gov', { required: true })}>
    {TunisiaGovernorates.map((governorate, index) => (
      <option key={index} value={governorate.toLowerCase()}>
        {governorate}
      </option>
    ))}
  </Form.Select>
</Form.Group>
          <Form.Group as={Col} md="4" controlId="delegation">
            <Form.Label>Délégation</Form.Label>
            <Form.Select {...register('delegation', { required: true })}>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Row>
        </div>
    <div className="InfoColis">
    <Form.Label className='saisie'>Saisir ici les données de votre colis :</Form.Label>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              {...register('desc', { required: true })}
              as="textarea"
              rows={3}
              placeholder="Enter description"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="montantHLiv">
            <Form.Label>Montant Hors Livraison</Form.Label>
            <Form.Control
              {...register('prixHliv', { required: true })}
              type="number"
              placeholder="Enter Montant Hors Livraison"
              required
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
    </div>
   
 <hr />
  <div className="button-container">
    <button type="button" className='btnv' onClick={handleFormSubmit}>
      Valider
    </button>
    <button type="button" className='btnp' onClick={handleGeneratePdfClick}>
      Télécharger PDF
    </button>
    
  </div>
  </Form>
  </div>
</div>
  
);

}

export default AddBL;
