import React, { useEffect, useState } from 'react';

export default function LoadingScreen({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 1200; // 1.2s logic duration
    const intervalTime = 30;
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
        }, 600);
        return () => clearTimeout(finishTimer);
      }, 300);

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
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s',
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
          padding: '40px 60px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          transform: fadeOut ? 'scale(0.96) translateY(-10px)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
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
            background: 'rgba(255, 95, 31, 0.15)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: -1,
          }}
        />

        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '0.2em',
            margin: '0 0 8px 0',
            textIndent: '0.2em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #B0BAC9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          KAHO
        </h1>

        <p
          style={{
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#FF5F1F',
            margin: '0 0 32px 0',
            textTransform: 'uppercase',
          }}
        >
          Magpie & Tiger
        </p>

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
