export default function SimplePage() {
  return (
    <html>
      <body style={{ margin: 0, padding: '20px', fontFamily: 'Arial, sans-serif', background: '#f0f0f0' }}>
        <h1>Simple Test Page</h1>
        <p>This is a simple test page to check if Next.js is working.</p>
        <p>If you can see this, then the issue is with the main page or ChatDemo component.</p>
        <p>If you cannot see this, then there is a fundamental Next.js issue.</p>
        <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '8px' }}>
          <h2>Test Elements:</h2>
          <button style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>
            Test Button
          </button>
          <input style={{ marginLeft: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Test input" />
        </div>
      </body>
    </html>
  );
}