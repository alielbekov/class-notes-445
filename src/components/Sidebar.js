import React from 'react';
import styles from './Sidebar.module.css'; // Import the styles

function Sidebar({ topics, onSelectTopic }) {
  return (
    <div className={styles.sidebar}>
      {topics.map((topic, index) => (
        <button
          key={index}
          className={styles.button} // Use the styles as an object
          onClick={() => onSelectTopic(topic)}
        >
          {topic.title}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
