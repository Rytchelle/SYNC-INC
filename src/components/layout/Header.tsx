"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const AuthenticatedHeader: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [showNotificationDetails, setShowNotificationDetails] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showNotifications])

  useEffect(() => {
    const handleClickOutsideModal = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (target.classList.contains("modal-overlay")) {
        closeNotificationDetails()
      }
    }

    if (showNotificationDetails) {
      document.addEventListener("mousedown", handleClickOutsideModal)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal)
    }
  }, [showNotificationDetails])

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "Sistema Atualizado",
      message: "Nova versão do sistema disponível",
      time: "2 min atrás",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Manutenção Preventiva",
      message: "Máquina Prensadora 3 precisa de manutenção",
      time: "15 min atrás",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Meta Atingida",
      message: "Produção do dia atingiu 100% da meta",
      time: "1 hora atrás",
      read: true,
    },
    {
      id: 4,
      type: "error",
      title: "Falha Detectada",
      message: "Alerta na linha de produção B",
      time: "2 horas atrás",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification)
    setShowNotificationDetails(true)
    setShowNotifications(false)
  }

  const closeNotificationDetails = () => {
    setShowNotificationDetails(false)
    setSelectedNotification(null)
  }

  return (
    <header
      className={`flex items-center justify-between ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-[var(--primary)] border-[#f4ede7]"} border-b px-4 md:px-10 py-3 w-full transition-colors duration-300`}
    >
      <div className={`flex items-center gap-4 ${isDarkMode ? "text-white" : "text-violet-800"}`}>
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-[-0.015em]">Sync</h2>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <nav
          className={`hidden md:flex mr-40 gap-20 md:gap-35 text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-[#ffffff]"}`}
        >
          <Link
            to="/dashboard"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Dashboard
          </Link>
          <Link
            to="/estatisticas"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Estatísticas
          </Link>
          <Link
            to="/departamentos"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Departamentos
          </Link>
          <Link
            to="/maquinas"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Máquinas
          </Link>
          <Link
            to="/funcionarios"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Funcionários
          </Link>
          <Link
            to="/relatorios"
            className={`transition-colors duration-200 ${isDarkMode ? "hover:text-blue-400" : "hover:text-[var(--primary)]"}`}
          >
            Relatórios
          </Link>
        </nav>
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
              : "bg-[#f4ede7] text-[#1c140d] hover:bg-[#e8e0d8]"
          }`}
          title={isDarkMode ? "Alternar para modo claro" : "Alternar para modo escuro"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,1,69.66,58.34l16,16a8,8,0,0,1-11.32,11.32Zm0,116.68-16-16a8,8,0,0,1,11.32-11.32l16,16a8,8,0,0,1-11.32,11.32ZM192,72a8,8,0,0,1,5.66-2.34l16-16a8,8,0,0,1,11.32,11.32l-16,16A8,8,0,0,1,192,72Zm5.66,114.34a8,8,0,0,1-11.32,11.32l-16-16a8,8,0,0,1,11.32-11.32ZM48,128a8,8,0,0,1-8-8H16a8,8,0,0,1,0-16H40A8,8,0,0,1,48,128Zm80,80a8,8,0,0,1-8,8v24a8,8,0,0,1-16,0V216A8,8,0,0,1,128,208Zm112-88a8,8,0,0,1-8,8H208a8,8,0,0,1,0-16h24A8,8,0,0,1,240,120Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z" />
            </svg>
          )}
        </button>
        <div className="relative ">
          <button
            className={`flex items-center h-10 px-2.5 gap-2 rounded-lg text-sm font-bold transition-colors duration-200 ${
              isDarkMode
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-[#f4ede7] text-[#1c140d] hover:bg-[#e8e0d8]"
            }`}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216Z" />
            </svg>
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </div>
            )}
          </button>
        </div>
        {showNotifications && (
          <div
            ref={notificationRef}
            className={`absolute right-0 top-12 w-80 rounded-xl shadow-2xl border z-50 overflow-hidden ${
              isDarkMode ? "bg-gray-800 border-gray-600" : "bg-transparent backdrop-blur-md border-gray-100"
            }`}
          >
            <div
              className={`p-4 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <h3 className="text-lg font-semibold">Notificações</h3>
                  {unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">{unreadCount}</div>
                  )}
                </div>
                <button
                  className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
                  onClick={() => {
                    console.log("Marcar todas como lidas")
                  }}
                >
                  Marcar todas como lidas
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                      isDarkMode
                        ? `border-gray-600 hover:bg-gray-700 ${!notification.read ? "bg-gray-700 border-l-4 border-l-blue-400" : ""}`
                        : `border-gray-100 hover:bg-gray-50 ${!notification.read ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500" : ""}`
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          notification.type === "info"
                            ? "bg-blue-100 text-blue-600"
                            : notification.type === "warning"
                              ? "bg-yellow-100 text-yellow-600"
                              : notification.type === "success"
                                ? "bg-green-100 text-green-600"
                                : notification.type === "error"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.type === "info" && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2zm0-4h-2v-4h2v4z" />
                          </svg>
                        )}
                        {notification.type === "warning" && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                          </svg>
                        )}
                        {notification.type === "success" && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                        {notification.type === "error" && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-[var(--text)] truncate">{notification.title}</h4>
                          <span className="text-xs text-[var(--muted)] flex-shrink-0 ml-2 bg-gray-100 px-2 py-1 rounded-full">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">{notification.message}</p>
                        {!notification.read && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-blue-600 font-medium">Nova</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className={`mb-4 ${isDarkMode ? "text-gray-500" : "text-gray-300"}`}>
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[var(--muted)]"}`}>
                    Nenhuma notificação
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-400" : "text-[var(--muted)]"}`}>
                    Você está em dia!
                  </p>
                </div>
              )}
            </div>
            <div
              className={`p-4 border-t ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-100 bg-gray-50"}`}
            >
              <Link
                to="/notificacoes"
                className={`block text-center text-sm font-medium transition-colors duration-200 ${
                  isDarkMode
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-[var(--primary)] hover:text-[var(--primary-dark)]"
                }`}
              >
                Ver todas as notificações →
              </Link>
            </div>
          </div>
        )}
      </div>
      <Link
        to="/perfil"
        className="size-10 rounded-full bg-center bg-cover cursor-pointer transition-transform duration-200 hover:scale-110 hover:shadow-lg"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC39zGruwYrSRnXqYZODWN7vlAgb5ltqltGld1J91b3PQw9SruqikMkBOR7CsmYOB3tfeIcaMpharPdccqlhTKLGz-HImU_spyZg28Dr9NPex_efkr2og1n6o4fRN_vfT5y7YksN4uocuiUzXQ1Oomedg5lMJUxF-HvA2myUsSbvol2D4uyRnztspqtXVFd1OfPHb2GiMYKf40YRL_kxt832YHz-T7_N9cMFd1OkQB52-EdzkX2hDuY48FhJLYmlhEPl0Gfu5ymVMxa")',
        }}
        title="Meu Perfil"
      />
      {showNotificationDetails && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-overlay animate-fade-in">
          <div
            className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden animate-fade-in-up ${
              isDarkMode ? "bg-gray-800" : "bg-transparent backdrop-blur-md"
            }`}
          >
            <div
              className={`p-6 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedNotification.type === "info"
                        ? "bg-blue-100 text-blue-600"
                        : selectedNotification.type === "warning"
                          ? "bg-yellow-100 text-yellow-600"
                          : selectedNotification.type === "success"
                            ? "bg-green-100 text-green-600"
                            : selectedNotification.type === "error"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedNotification.type === "info" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                    )}
                    {selectedNotification.type === "warning" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                      </svg>
                    )}
                    {selectedNotification.type === "success" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                    {selectedNotification.type === "error" && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedNotification.title}</h3>
                    <p className="text-sm opacity-90">{selectedNotification.time}</p>
                  </div>
                </div>
                <button
                  onClick={closeNotificationDetails}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className={`leading-relaxed text-lg ${isDarkMode ? "text-gray-200" : "text-[var(--text)]"}`}>
                  {selectedNotification.message}
                </p>
              </div>
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[var(--muted)]"}`}>
                    Tipo:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedNotification.type === "info"
                        ? "bg-blue-100 text-blue-700"
                        : selectedNotification.type === "warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedNotification.type === "success"
                            ? "bg-green-100 text-green-700"
                            : selectedNotification.type === "error"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {selectedNotification.type === "info"
                      ? "Informação"
                      : selectedNotification.type === "warning"
                        ? "Aviso"
                        : selectedNotification.type === "success"
                          ? "Sucesso"
                          : selectedNotification.type === "error"
                            ? "Erro"
                            : "Geral"}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[var(--muted)]"}`}>
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedNotification.read ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {selectedNotification.read ? "Lida" : "Nova"}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
                >
                  <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-[var(--muted)]"}`}>
                    ID:
                  </span>
                  <span className="text-sm text-[var(--text)] font-mono">#{selectedNotification.id}</span>
                </div>
              </div>
              <div className={`flex gap-3 mt-6 pt-6 border-t ${isDarkMode ? "border-gray-600" : "border-gray-100"}`}>
                <button
                  onClick={() => {
                    console.log("Marcar como lida:", selectedNotification.id)
                    closeNotificationDetails()
                  }}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                  }`}
                >
                  Marcar como Lida
                </button>
                <button
                  onClick={closeNotificationDetails}
                  className={`flex-1 border py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                    isDarkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default AuthenticatedHeader
