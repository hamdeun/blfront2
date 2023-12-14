import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FaFileDownload } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import './ViewBL.css'; // Ensure to import your CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import BASE_URL from '../services/apiConfig';

function ViewBL() {
  const [bills, setBills] = useState([]);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    // Fetch bills data from your API
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch(`${BASE_URL}/bl/${userId}/getAllBlByUser`)
      .then((response) => response.json())
      .then((data) => setBills(data))
      .catch((error) => console.error('Error fetching bills:', error));
  }, []);



  const downloadPdf = (billId) => {
    // Implement the logic to download the PDF for the given bill ID
    const pdfUrl = `${BASE_URL}/bl/${billId}/downloadImported`;

    // Use window.location.href to trigger the download
    window.location.href = pdfUrl;
      // Replace the console.log with the actual logic to download the PDF
  };

  return (
    <div>
      <div className='filters-container'>
        <NavBar />
      </div>
      <div className='table-container'>
        <table className='custom-table'>
          <thead className='table-header'>
            <tr>
              <th>Date</th>
              <th>Nom Destinataire</th>
              <th>Numéro Téléphone</th>
              <th>Prix Hliv</th>
              <th>description</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody className='table-body'>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td>{bill.dateBl}</td>
                <td>{bill.nomDest}</td>
                <td>{bill.numTelephone1}</td>
                <td>{bill.prixHliv}</td>
                <td>{bill.desc}</td>

                <td>
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => downloadPdf(bill.id)}
                  >
                    <FaFileDownload /> Télécharger
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBL;
