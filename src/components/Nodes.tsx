/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Handle, Position } from 'reactflow';

const nodeStyle: React.CSSProperties = {
  width: '200px',
  padding: '10px',
  borderRadius: '5px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  wordWrap: 'break-word'
};

export const SubjectNode: React.FC<any> = ({ data }) => {
  return (
    <div style={{ ...nodeStyle, background: 'lightblue' }}>
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const CourseNode: React.FC<any> = ({ data }) => {
  return (
    <div style={{ ...nodeStyle, background: 'red' }}>
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
