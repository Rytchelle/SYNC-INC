import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/modules/Login.module.css';

const Spinner = () => (
  <div className="flex justify-center items-center mt-4">
    <svg className="animate-spin h-8 w-8 text-[var(--primary)]" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  </div>
);

const EsqueceuSenha: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
        setError('E-mail inválido.');
        return;
      }
      setStep(2);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/login'), 1800);
    }, 1200);
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
            <h1 className="text-2xl font-bold text-[var(--primary)] mb-2 fade-in-up">Recuperar Senha</h1>
            <p className="text-[var(--muted)] text-center fade-in-up" style={{ animationDelay: '120ms' }}>
              {step === 1 ? 'Informe seu e-mail para redefinir a senha.' : 'Escolha uma nova senha para sua conta.'}
            </p>
          </div>
          {step === 1 && (
            <form className="w-full flex flex-col gap-6 mt-2 fade-in-up" style={{ animationDelay: '200ms' }} onSubmit={handleEmailSubmit}>
              <label className="text-[var(--primary)] font-semibold mb-1">E-mail <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-[var(--bg)] text-[var(--text)] focus:ring-2 outline-none transition-all duration-200 ${error ? styles['animate-shake'] + ' border-red-500 focus:border-red-500 focus:ring-red-200' : success && email ? styles['animate-success'] + ' border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-[var(--accent)] focus:border-[var(--primary)] focus:ring-[var(--primary)]'}`}
                autoComplete="email"
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg shadow transition-colors duration-300 fade-in-up"
                style={{ animationDelay: '300ms' }}
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar link'}
              </button>
              {error && (
                <div className="text-red-600 text-center mt-2 animate-fadeInDown">{error}</div>
              )}
              {success && (
                <div className="text-green-600 text-center mt-2 animate-fadeInUp">{success}</div>
              )}
              {loading && <Spinner />}
            </form>
          )}
          {step === 2 && (
            <form className="w-full flex flex-col gap-6 mt-2 fade-in-up" style={{ animationDelay: '200ms' }} onSubmit={handlePasswordSubmit}>
              <label className="text-[var(--primary)] font-semibold mb-1">Nova Senha <span className="text-red-500">*</span></label>
              <input
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-[var(--bg)] text-[var(--text)] focus:ring-2 outline-none transition-all duration-200 ${error ? styles['animate-shake'] + ' border-red-500 focus:border-red-500 focus:ring-red-200' : success && newPassword ? styles['animate-success'] + ' border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-[var(--accent)] focus:border-[var(--primary)] focus:ring-[var(--primary)]'}`}
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <label className="text-[var(--primary)] font-semibold mb-1">Confirmar Nova Senha <span className="text-red-500">*</span></label>
              <input
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border bg-[var(--bg)] text-[var(--text)] focus:ring-2 outline-none transition-all duration-200 ${error ? styles['animate-shake'] + ' border-red-500 focus:border-red-500 focus:ring-red-200' : success && confirmPassword ? styles['animate-success'] + ' border-green-500 focus:border-green-500 focus:ring-green-200' : 'border-[var(--accent)] focus:border-[var(--primary)] focus:ring-[var(--primary)]'}`}
                autoComplete="new-password"
                disabled={loading}
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-lg shadow transition-colors duration-300 fade-in-up"
                style={{ animationDelay: '300ms' }}
                disabled={loading}
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>
              {error && (
                <div className="text-red-600 text-center mt-2 animate-fadeInDown">{error}</div>
              )}
              {success && (
                <div className="text-green-600 text-center mt-2 animate-fadeInUp">{success}</div>
              )}
              {loading && <Spinner />}
            </form>
          )}
          <div className="mt-6 text-center fade-in-up" style={{ animationDelay: '400ms' }}>
            <a href="/login" className="text-[var(--primary)] hover:underline transition-all duration-200">Voltar para o login</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EsqueceuSenha; 