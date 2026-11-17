import { Component } from 'react';

// Si un componente lanza un error al renderizar, React desmonta toda la app y se queda
// la pantalla en blanco. Envolviéndolo en esto, solo esa parte se cambia por `fallback`.
// Tiene que ser una clase porque no hay ningún hook equivalente a componentDidCatch.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error al renderizar:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
