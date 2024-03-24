import React from 'react';

function Sidebar({ topics, onSelectTopic }) {
  return (
    <div className="list-group">
      {topics.map((topic, index) => (
        <button
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => onSelectTopic(topic)}
        >
          {topic.title}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
