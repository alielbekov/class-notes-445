import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

function App() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/public/topics/`;
      try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        const files = response.data
          .filter(file => file.name.endsWith('.md')) // Only include Markdown files
          .map(file => ({ 
            title: file.name.replace('.md', ''), 
            content: file.download_url,
            order: parseInt(file.name.match(/^\d+/)) // Extract the leading number to use for sorting
          }))
          .sort((a, b) => a.order - b.order); // Sort by the extracted number
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar topics={topics} onSelectTopic={setSelectedTopic} />
        </div>
        <div className="col-md-9">
          <ContentArea selectedTopic={selectedTopic} />
        </div>
      </div>
    </div>
  );
}

export default App;
