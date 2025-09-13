import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Model3DProps {
  width?: string;
  height?: string;
  modelPath?: string;
}

export default function Model3D({
  width = '100%',
  height = '400px',
  modelPath = '/hometank.glb'
}: Model3DProps) {
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load model-viewer script
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <Model3DContainer width={width} height={height}>
      <ModelViewer ref={modelRef}>
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <model-viewer 
                src="${modelPath}"
                alt="3D Electroplating Tank"
                auto-rotate
                camera-controls
                style="width: 100%; height: 100%;"
                loading="lazy"
              ></model-viewer>
            `
          }}
        />
      </ModelViewer>
      <ModelLabel>3D Electroplating Tank Model - Click & Drag to Rotate</ModelLabel>
    </Model3DContainer>
  );
}

const Model3DContainer = styled.div<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ModelViewer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ModelLabel = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
