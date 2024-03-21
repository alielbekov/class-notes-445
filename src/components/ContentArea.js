import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

function ContentArea({ selectedTopic }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (!selectedTopic) return; // Ensure `selectedTopic` is defined

    const fetchMarkdown = async () => {
      // Use the correct full path to the Markdown files, including the `public/topics` directory
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/public/topics/${selectedTopic.title}.md`;

      try {
        const response = await axios.get(apiUrl, {
          headers: { Accept: "application/vnd.github.v3.raw" }, // Request the raw content
        });
        const content = response.data; // Use the raw content directly
        setMarkdown(marked(content)); // Convert Markdown to HTML
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [selectedTopic]); // Rerun the effect when `selectedTopic` changes

  return (
    <div className="content-area">
      <div dangerouslySetInnerHTML={{ __html: markdown }} />
      {/* Open the edit link in a new tab and use the correct path */}
      <a target="_blank" rel="noopener noreferrer" href={`https://github.com/alielbekov/class-notes-445/edit/main/public/topics/${selectedTopic?.title}.md`}>
        Edit on GitHub
      </a>
    </div>
  );
}

export default ContentArea;
