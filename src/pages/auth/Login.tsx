import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from '../../styles/modules/Login.module.css';

const Spinner = () => (
  <div className="flex justify-center items-center mt-4">
    <svg className="animate-spin h-8 w-8 text-[var(--primary)]" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
);

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'admin' && pass === '1234') {
      setError(false);
      setSuccess(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 5000);
    } else {
      setError(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className="flex-1 w-full flex items-center justify-center bg-gradient-to-br from-[var(--bg)] via-white to-[var(--accent)] fade-in">
        <div className={styles.formBox}>
          <div className="mb-8 flex flex-col items-center">
            <div className={styles.logo}>
              <svg width="36" height="36" fill="none" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="4" />
                <path d="M16 24l6 6 10-10" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[var(--primary)] mb-2 fade-in-up">Bem-vindo</h1>
            <p className="text-[var(--muted)] text-center fade-in-up" style={{ animationDelay: '120ms' }}>
              Acesse o sistema para gerenciar sua produção de forma inteligente.
            </p>
          </div>
          <form className="w-full flex flex-col gap-6 mt-2 fade-in-up" style={{ animationDelay: '200ms' }} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={e => setUser(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-[var(--bg)] text-[var(--text)] focus:ring-2 outline-none transition-all duration-200 ${error ? styles['animate-shake'] + ' border-red-500 focus:border-red-500 focus:ring-red-200' : success && user ? styles['animate-success'] + ' border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-[var(--accent)] focus:border-[var(--primary)] focus:ring-[var(--primary)]'}`}
              autoComplete="username"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={e => setPass(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border bg-[var(--bg)] text-[var(--text)] focus:ring-2 outline-none transition-all duration-200 ${error ? styles['animate-shake'] + ' border-red-500 focus:border-red-500 focus:ring-red-200' : success && pass ? styles['animate-success'] + ' border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-[var(--accent)] focus:border-[var(--primary)] focus:ring-[var(--primary)]'}`}
              autoComplete="current-password"
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg shadow transition-colors duration-300 fade-in-up"
              style={{ animationDelay: '300ms' }}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            {error && (
              <div className="text-red-600 text-center mt-2 animate-fadeInDown">Usuário ou senha incorretos</div>
            )}
            {success && (
              <div className="text-green-600 text-center mt-2 animate-fadeInUp">Login correto! Redirecionando...</div>
            )}
            {loading && <Spinner />}
          </form>
          <div className="mt-6 text-center fade-in-up" style={{ animationDelay: '400ms' }}>
            <Link to="/esqueceu-senha" className="text-[var(--primary)] hover:underline transition-all duration-200">Esqueceu a senha?</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
