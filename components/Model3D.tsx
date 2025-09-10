import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Model3DProps {
  width?: string;
  height?: string;
}

export default function Model3D({ width = '100%', height = '400px' }: Model3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 400;

    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set up 3D-like perspective
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);

      // Draw a 3D-looking electroplating machine/gear
      const centerX = 0;
      const centerY = 0;
      const radius = 80;
      const teeth = 12;
      
      // Draw gear outline with depth effect
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
        
        // Outer teeth
        const outerRadius = radius + 20;
        const innerRadius = radius;
        
        const x1 = Math.cos(angle) * outerRadius;
        const y1 = Math.sin(angle) * outerRadius;
        const x2 = Math.cos(angle + 0.1) * outerRadius;
        const y2 = Math.sin(angle + 0.1) * outerRadius;
        const x3 = Math.cos(nextAngle - 0.1) * outerRadius;
        const y3 = Math.sin(nextAngle - 0.1) * outerRadius;
        const x4 = Math.cos(nextAngle) * outerRadius;
        const y4 = Math.sin(nextAngle) * outerRadius;
        
        const x5 = Math.cos(nextAngle) * innerRadius;
        const y5 = Math.sin(nextAngle) * innerRadius;
        
        if (i === 0) ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.lineTo(x5, y5);
      }
      ctx.closePath();
      
      // Gradient for 3D effect
      const gradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 0, centerX, centerY, radius + 20);
      gradient.addColorStop(0, '#ffd700');
      gradient.addColorStop(0.5, '#e3a72f');
      gradient.addColorStop(1, '#b8860b');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add stroke for definition
      ctx.strokeStyle = '#8b7000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner circle (main body)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
      const innerGradient = ctx.createRadialGradient(centerX - 10, centerY - 10, 0, centerX, centerY, radius * 0.6);
      innerGradient.addColorStop(0, '#f0f0f0');
      innerGradient.addColorStop(1, '#c0c0c0');
      ctx.fillStyle = innerGradient;
      ctx.fill();
      ctx.strokeStyle = '#888';
      ctx.stroke();
      
      // Center hole
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
      
      // Add some bolts around the inner circle
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const boltX = Math.cos(angle) * radius * 0.45;
        const boltY = Math.sin(angle) * radius * 0.45;
        
        ctx.beginPath();
        ctx.arc(boltX, boltY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#666';
        ctx.fill();
      }

      ctx.restore();
      
      rotation += 0.01; // Slow rotation
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <Model3DContainer width={width} height={height}>
      <StyledCanvas ref={canvasRef} />
      <ModelLabel>Precision Electroplating Machinery</ModelLabel>
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

const StyledCanvas = styled.canvas`
  max-width: 100%;
  max-height: 100%;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
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
