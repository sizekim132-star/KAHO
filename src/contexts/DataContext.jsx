import React, { createContext, useContext, useState, useEffect } from 'react';
import { MEMBERS, SHOWS, TRACKS } from '../data/constants';

const DataContext = createContext();

export function DataProvider({ children }) {
  // 초기 데이터는 constants에서 가져오되, 로컬스토리지에 있으면 그걸 씁니다.
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('kaho_members');
    return saved ? JSON.parse(saved) : MEMBERS;
  });

  const [shows, setShows] = useState(() => {
    const saved = localStorage.getItem('kaho_shows');
    return saved ? JSON.parse(saved) : SHOWS;
  });

  const [tracks, setTracks] = useState(() => {
    const saved = localStorage.getItem('kaho_tracks');
    return saved ? JSON.parse(saved) : TRACKS;
  });

  // 상태가 바뀔 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('kaho_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('kaho_shows', JSON.stringify(shows));
  }, [shows]);

  useEffect(() => {
    localStorage.setItem('kaho_tracks', JSON.stringify(tracks));
  }, [tracks]);

  const value = {
    members, setMembers,
    shows, setShows,
    tracks, setTracks
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
