import React from 'react';

const Block = ({ cancelBottomOffset = false, children }) => {
  return (
    <div style={{ marginBottom: (cancelBottomOffset ? 0 : 20) }}>
      {children}
    </div>
  );
};

export default Block;
