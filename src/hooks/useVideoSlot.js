// src/hooks/useVideoSlot.js
// YouTube 배경 비디오 슬롯 자동 교환 로직
import { useState, useEffect, useRef } from 'react';

export default function useVideoSlot(totalVideos, intervalMs = 11000, bufferMs = 3500) {
  const [activeSlot, setActiveSlot] = useState(0);
  const [slotIndices, setSlotIndices] = useState([0, 1]);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setActiveSlot((prev) => {
        const next = prev === 0 ? 1 : 0;
        timeoutRef.current = setTimeout(() => {
          setSlotIndices((prevIndices) => {
            const nextIndices = [...prevIndices];
            const currentGlobalIdx = prevIndices[next];
            nextIndices[prev] = (currentGlobalIdx + 1) % totalVideos;
            return nextIndices;
          });
        }, bufferMs);
        return next;
      });
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [totalVideos, intervalMs, bufferMs]);

  return { activeSlot, slotIndices };
}
