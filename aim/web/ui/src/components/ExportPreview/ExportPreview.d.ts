import React from 'react';

export interface IExportPreviewProps {
  openModal: boolean;
  onToggleExportPreview: () => void;
  withDynamicDimensions?: boolean;
  children?: React.ReactNode;
}

export interface IPreviewBounds {
  max: {
    width: number;
    height: number;
  };
  min: {
    width: number;
    height: number;
  };
}