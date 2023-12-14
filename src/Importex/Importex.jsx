import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import NavBar from '../NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Importex() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(`http://localhost:3000/upload-groupe/${userId}/upload-excel/${file.name}`, formData);

      // You may want to handle success and navigation logic here
      console.log('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      navigate(`/bl/${userId}/importex`);
    }
  }, [navigate, userId]);

  return (
    <div>
      <NavBar />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {/* Other components or content for your Importex component */}
    </div>
  );
}

export default Importex;
