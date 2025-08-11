"use client";

import { ConfigProvider } from 'antd';
import React from 'react';

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFAE0E',
          borderRadius: 6,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider; 