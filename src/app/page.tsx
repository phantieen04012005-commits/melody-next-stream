'use client';

import { useState, useRef, useEffect } from 'react';

const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80';

const SONGS_DATA = [
  { id: 1, title: 'Không Thời Gian', artist: 'Trần Ngân', img: IMG_LOFI, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_thoi_gian_tran_ngan.mp3' },
  { id: 2, title: 'I Miss You', artist: 'Elijah Woods', img: IMG_NIGHT, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/yeu_em_2_ngay_slowed.mp3' },
  { id: 3, title: 'Không Ngừng Suy Nghĩ', artist: 'Dương Domic', img: IMG_RELAX, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_ngung_suy_nghi_quoc_pham.mp3' },
  { id: 4, title: 'Waiting For You', artist: 'MONO', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Nấu Ăn Cho Em', artist: 'Đen Vâu ft. PiaLinh', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'See Tình', artist: 'Hoàng Thùy Linh', img: IMG_LOFI, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Nếu Lúc Đó', artist: 'tlinh x 2pillz', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 8, title: 'Lan Man', artist: 'Ronboogz', img: IMG_NIGHT, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 9, title: 'Deep Focus lofi', artist: 'ChilledCow', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 10, title: 'Summer Chill', artist: 'Lofi Records', img: IMG_RELAX, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
];

export default function Home() {
  const [songs] = useState(SONGS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = songs[currentIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentTab, setCurrentTab] = useState('kham-pha');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) { audioRef.current.load(); if (isPlaying) audioRef.current.play().catch(console.log); }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setCurrentIndex((p) => (p + 1) % songs.length);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    return () => { audio.removeEventListener('timeupdate', updateTime); audio.removeEventListener('loadedmetadata', updateDuration); audio.removeEventListener('ended', handleEnded); };
  }, [currentIndex]);

  const togglePlay = () => { if (!audioRef.current) return; if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } else { audioRef.current.play().then(() => setIsPlaying(true)).catch(console.log); } };
  const handleNext = () => { setCurrentIndex((p) => (p + 1) % songs.length); setIsPlaying(true); };
  const handlePrev = () => { setCurrentIndex((p) => (p - 1 + songs.length) % songs.length); setIsPlaying(true); };
  const handleSelectSong = (id: number) => { const idx = songs.findIndex(s => s.id === id); if (idx !== -1) { setCurrentIndex(idx); setIsPlaying(true); } };
  const handleLoginSubmit = (e: React.FormEvent) => { e.preventDefault(); if (usernameInput) { setLoggedInUser(usernameInput); setIsLoggedIn(true); setShowLoginModal(false); } };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff', fontFamily: 'sans-serif', position: 'relative' }}>
      <audio ref={audioRef} crossOrigin="anonymous"><source src={currentSong.src} type="audio/mpeg" /></audio>
      
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#0d0d0d', border: '1px solid #222', padding: '30px', borderRadius: '16px', width: '320px', textAlign: 'center' }}>
            <h3 style={{ color: '#ff4757', marginBottom: '20px' }}>ĐĂNG NHẬP / ĐĂNG KÝ</h3>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Tên tài khoản..." value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} style={{ padding: '12px', backgroundColor: '#050505', color: '#fff', border: '1px solid #333' }} />
              <input type="password" placeholder="Mật khẩu..." style={{ padding: '12px', backgroundColor: '#050505', color: '#fff', border: '1px solid #333' }} />
              <button type="submit" style={{ padding: '12px', backgroundColor: '#ff4757', color: '#fff', border: 'none', cursor: 'pointer' }}>Đăng nhập</button>
            </form>
            <button style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: 'transparent', border: '1px solid #ff4757', color: '#ff4757', cursor: 'pointer' }}>Đăng ký tài khoản mới</button>
            <button onClick={() => setShowLoginModal(false)} style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>
      )}

      <div style={{ width: '240px', backgroundColor: '#0d0d0d', borderRight: '1px solid #1a1a1a', padding: '20px 0' }}>
        <h1 style={{ padding: '0 25px', fontSize: '1.4rem', color: '#ff4757' }}>🎵 Melody STREAM</h1>
        <div style={{ padding: '20px' }}>
            <button onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLoginModal(true)} style={{ width: '100%', padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: isLoggedIn ? '#2ed573' : '#ff4757', color: '#fff', cursor: 'pointer' }}>
                {isLoggedIn ? `👤 ${loggedInUser}` : '🔐 Đăng nhập'}
            </button>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: '30px' }}>
        <input placeholder="🔍 Tìm kiếm..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px', marginBottom: '20px', width: '300px', backgroundColor: '#0a0a0a', border: '1px solid #333', color: '#fff' }} />
        <div style={{ textAlign: 'center' }}>
            <img src={currentSong.img} style={{ width: '200px', borderRadius: '50%', animation: isPlaying ? 'spin 12s linear infinite' : 'none' }} />
            <h2>{currentSong.title}</h2>
            <button onClick={togglePlay} style={{ fontSize: '2rem', border: 'none', background: 'none', color: '#ff4757' }}>{isPlaying ? '⏸' : '▶'}</button>
        </div>
      </div>
      <style jsx global>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}