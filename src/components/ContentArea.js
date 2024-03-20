import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

function ContentArea({ selectedTopic }) {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    // Ensure `selectedTopic` is an object with a `title` property; adjust as needed
    if (!selectedTopic) return;

    const fetchMarkdown = async () => {
      // Adjusting to fetch raw Markdown content; replace `contents` with `raw` URL if possible
      const apiUrl = `https://api.github.com/repos/alielbekov/class-notes-445/contents/${selectedTopic.title}.md`;
      try {
        const response = await axios.get(apiUrl, {
          headers: { Accept: "application/vnd.github.v3.raw" }, // Request raw content
        });
        const content = response.data; // Directly use the raw content without `atob`
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
      <a href={`https://github.com/alielbekov/class-notes-445/edit/main/${selectedTopic?.title}.md`}>
        Edit on GitHub
      </a>
    </div>
  );
}

export default ContentArea;
