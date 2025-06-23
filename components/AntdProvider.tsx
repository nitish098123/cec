"use client";

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useEffect } from 'react';

// This is the patch for antd v5 to be compatible with React 19.
// We are using unstableSetRender as the package patch is not working.
// See: https://ant.design/docs/react/v5-for-19
const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    unstableSetRender((node, container) => {
      // We need to make sure that we are rendering into a container that has a root.
      // @ts-ignore
      container._reactRoot ||= createRoot(container);
      // @ts-ignore
      const root = container._reactRoot;

      root.render(node);
      
      return async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        root.unmount();
      };
    });
  }, []);

  return <>{children}</>;
};

export default AntdProvider; 