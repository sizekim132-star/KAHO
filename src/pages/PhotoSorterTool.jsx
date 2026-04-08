import { useState, useEffect, useCallback } from 'react';

export default function PhotoSorterTool({ onBack }) {
  const [directoryHandle, setDirectoryHandle] = useState(null);
  const [selectedHandle, setSelectedHandle] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Initialize directory and load files
  const handleSelectDirectory = async () => {
    try {
      if (!window.showDirectoryPicker) {
        alert("이 브라우저는 폴더 접근 기능을 지원하지 않습니다. 크롬(Chrome)이나 엣지(Edge)를 사용해주세요.");
        return;
      }
      
      const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      setDirectoryHandle(dirHandle);
      
      // Create 'selected_photos' directory inside the chosen dir
      const selHandle = await dirHandle.getDirectoryHandle('selected_photos', { create: true });
      setSelectedHandle(selHandle);

      const fileList = [];
      for await (const entry of dirHandle.values()) {
        if (entry.kind === 'file' && entry.name.match(/\.(jpe?g|png|gif|webp)$/i)) {
          fileList.push(entry);
        }
      }
      setImages(fileList);
      setCurrentIndex(0);
      setCompleted(false);
    } catch (err) {
      console.error(err);
      alert('폴더 접근 권한이 취소되었거나 오류가 발생했습니다.');
    }
  };

  const handleDecision = useCallback(async (isAccepted) => {
    if (images.length === 0 || currentIndex >= images.length) return;

    if (isAccepted && selectedHandle) {
      try {
        const fileHandle = images[currentIndex];
        const file = await fileHandle.getFile();
        
        // Copy the file to 'selected_photos' directory
        const newFileHandle = await selectedHandle.getFileHandle(fileHandle.name, { create: true });
        const writable = await newFileHandle.createWritable();
        await writable.write(file);
        await writable.close();
      } catch (e) {
        console.error("복사 실패:", e);
      }
    }

    if (currentIndex + 1 >= images.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, images, selectedHandle]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (completed || images.length === 0) return;
      if (e.key === 'ArrowRight') {
        handleDecision(true);
      } else if (e.key === 'ArrowLeft') {
        handleDecision(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDecision, completed, images.length]);

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--primary-navy)', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '2rem' }}>⚙️ 초고속 사진 분류기</h1>
        <button onClick={onBack} className="btn" style={{ backgroundColor: 'transparent', border: '1px solid white' }}>← 홈페이지로 복귀</button>
      </div>

      {!directoryHandle && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem' }}>압축을 푼 사진 폴더를 선택해주세요</h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem', maxWidth: '600px' }}>
            수백 장의 사진을 힘들게 옮기지 마세요. 폴더만 선택하면 방향키(←, →)만으로 최상의 사진만 골라내어 자동으로 <strong>'selected_photos'</strong> 폴더에 모아줍니다.
          </p>
          <button onClick={handleSelectDirectory} className="btn btn-primary" style={{ marginTop: '3rem', padding: '20px 40px', fontSize: '1.2rem' }}>
            📁 PC에서 폴더 선택하기
          </button>
        </div>
      )}

      {directoryHandle && !completed && images.length > 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1rem', color: 'var(--primary-orange)', fontWeight: 'bold', fontSize: '1.25rem' }}>
            {currentIndex + 1} / {images.length}
          </div>
          <ImagePreview fileHandle={images[currentIndex]} />
          
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
            <button onClick={() => handleDecision(false)} className="btn" style={{ backgroundColor: '#ef4444', minWidth: '180px', fontSize: '1.2rem' }}>
              👈 버리기 (ArrowLeft)
            </button>
            <button onClick={() => handleDecision(true)} className="btn btn-primary" style={{ minWidth: '180px', backgroundColor: '#22c55e', fontSize: '1.2rem' }}>
              채택 👉 (ArrowRight)
            </button>
          </div>
        </div>
      )}

      {directoryHandle && images.length === 0 && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: 'white' }}>선택한 폴더에 이미지 변환 가능한 파일(.jpg, .png 등)이 없습니다.</h2>
        </div>
      )}

      {completed && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>분류 완벽하게 끝!</h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', textAlign: 'center' }}>
            선택하신 폴더 내부에 새로운 <strong>'selected_photos'</strong> 폴더가 생성되었으며,<br/>
            채택하신 빛나는 순간들이 모두 안전하게 복사되었습니다.
          </p>
          <button onClick={onBack} className="btn btn-primary" style={{ marginTop: '3rem' }}>홈페이지 구조 마저 보러가기</button>
        </div>
      )}
    </div>
  );
}

function ImagePreview({ fileHandle }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    let objectUrl;
    fileHandle.getFile().then(file => {
      objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
    });
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileHandle]);

  if (!url) return <div style={{ width: '800px', height: '500px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: '24px' }}>로딩 중...</div>;

  return (
    <div style={{ height: '60vh', maxWidth: '80vw', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
      <img src={url} style={{ height: '100%', objectFit: 'contain', backgroundColor: '#0f172a' }} alt="preview" />
    </div>
  );
}
