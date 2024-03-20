import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import './App.css';

function App() {
  const [topics] = useState([
    { title: 'Topic 1', content: 'Content for Topic 1...' },
    { title: 'Topic 2', content: 'Content for Topic 2...' },
    { title: 'Topic 3', content: 'Content for Topic 3...' },
    // ... other topics
  ]);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  return (
    <div className="app">
      <Sidebar topics={topics} onSelectTopic={setSelectedTopic} />
      <ContentArea selectedTopic={selectedTopic} />
    </div>
  );
}

export default App;
