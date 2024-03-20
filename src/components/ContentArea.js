import React, { useState, useEffect } from 'react';
import axios from 'axios';
import marked from 'marked';

function ContentArea({ selectedTopic }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/${selectedTopic}.md`;
      try {
        const response = await axios.get(apiUrl);
        const content = atob(response.data.content);
        setMarkdown(marked(content));
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [selectedTopic]);

  return (
    <div className="content-area">
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
      <a href={`https://github.com/yourusername/yourrepository/edit/main/${selectedTopic}.md`}>
        Edit on GitHub
      </a>
    </div>
  );
}

export default ContentArea;
