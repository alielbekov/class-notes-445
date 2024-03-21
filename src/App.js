import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import './App.css';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      // Point the apiUrl to the 'public/topics' directory in the repository
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/public/topics/`;
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        const files = response.data
          .filter(file => file.name.endsWith('.md')) // Only include Markdown files
          .map(file => ({ title: file.name.replace('.md', ''), content: file.download_url })); // Extract needed info
        setTopics(files);
        setSelectedTopic(files[0]); // Automatically select the first topic
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };
  
    fetchTopics();
  }, []);
  

  if (!selectedTopic) return <div>Loading...</div>; // Show loading state

  return (
    <div className="app">
      <Sidebar topics={topics} onSelectTopic={setSelectedTopic} />
      <ContentArea selectedTopic={selectedTopic} />
    </div>
  );
}

export default App;
