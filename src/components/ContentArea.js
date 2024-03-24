import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

import './ContentArea.css';

function ContentArea({ selectedTopic }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (!selectedTopic) return;

    const fetchMarkdown = async () => {
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/public/topics/${selectedTopic.title}.md`;

      try {
        const response = await axios.get(apiUrl, {
          headers: { Accept: "application/vnd.github.v3.raw" },
        });
        const content = response.data;
        setMarkdown(marked(content));
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [selectedTopic]);

  return (
    <div className="content-area mt-3 p-4">
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdown }} />
      <a className="btn btn-primary mt-3" target="_blank" rel="noopener noreferrer" href={`https://github.com/alielbekov/class-notes-445/edit/main/public/topics/${selectedTopic?.title}.md`}>
        Edit on GitHub
      </a>
    </div>
  );
}

export default ContentArea;
