'use client';

export default function Home() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1e1e24',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>My Melody Stream</h1>
      
      {/* Khung đĩa nhạc xoay */}
      <div style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        backgroundColor: '#000',
        border: '10px solid #333',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(255,255,255,0.2)',
        marginBottom: '30px'
      }}>
        {/* Tâm đĩa nhạc màu đỏ */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#ff4757',
          border: '5px solid #fff'
        }}></div>
      </div>

      {/* Danh sách bài hát */}
      <div style={{ textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#ff4757', fontSize: '1.5rem' }}>🎵 Summer Chill 🎵</h3>
        <p style={{ margin: 0, color: '#ccc' }}>Weekend Relax Music</p>
      </div>
    </main>
  );
}