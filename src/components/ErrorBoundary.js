import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Verificar se é o erro do ResizeObserver
    if (
      error?.message?.includes('ResizeObserver loop completed with undelivered notifications') ||
      error?.toString()?.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      // Suprimir o erro do ResizeObserver
      return { hasError: false };
    }
    // Para outros erros, retornar o estado de erro
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Suprimir apenas o erro do ResizeObserver
    if (
      error?.message?.includes('ResizeObserver loop completed with undelivered notifications') ||
      error?.toString()?.includes('ResizeObserver loop completed with undelivered notifications')
    ) {
      return;
    }
    // Para outros erros, logar normalmente
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

