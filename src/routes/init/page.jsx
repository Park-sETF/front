export default function Init() {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center bg-white"
      style={{width: '100%', maxWidth: '430px', margin: '0 auto', textAlign: 'center',height:'100vh',
          display: 'flex', justifyContent:'center', flexDirection: 'column'
       }}
    >
      <h1 className="display-5 fw-bold text-center" style={{ fontSize: '42px', marginBottom: '20px'
       }}>
        What's your ETF?
      </h1>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: '100%', maxWidth: '280px', margin: '0 auto'}}
      >
        <img
          src="/images/logo.png"
          alt="ETF Character"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}
