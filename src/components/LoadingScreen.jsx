import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 600; // 0.6s progress duration
    const intervalTime = 20;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const delayTimer = setTimeout(() => {
        setFadeOut(true);
        const finishTimer = setTimeout(() => {
          if (onFinished) onFinished();
        }, 300); // 0.3s fadeout
        return () => clearTimeout(finishTimer);
      }, 100); // 0.1s delay

      return () => clearTimeout(delayTimer);
    }
  }, [progress, onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#070B19',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        visibility: fadeOut && progress === 100 ? 'hidden' : 'visible',
        transition: 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s',
        color: '#FFFFFF',
        fontFamily: "'Pretendard', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: fadeOut ? 'scale(0.96) translateY(-10px)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          maxWidth: '90%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 95, 31, 0.12)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
          }}
        />

        {/* 로고 이미지 */}
        <img
          src={logo}
          alt="KAHO Logo"
          style={{
            height: '80px',
            width: 'auto',
            marginBottom: '32px',
            filter: 'invert(1)',
            mixBlendMode: 'screen',
            display: 'block',
          }}
        />

        <div
          style={{
            width: '180px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '999px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #FF5F1F 0%, #FF8A50 100%)',
              borderRadius: '999px',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 8px rgba(255, 95, 31, 0.5)',
            }}
          />
        </div>

        <span
          style={{
            marginTop: '12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.05em',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
