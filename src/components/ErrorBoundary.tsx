import { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: { error: unknown; resetErrorBoundary: () => void }) => ReactNode);
  resetKeys?: unknown[];
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  public componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && this.props.resetKeys) {
      const prevKeys = prevProps.resetKeys || [];
      const currentKeys = this.props.resetKeys || [];
      const hasChanged = currentKeys.some((key, idx) => key !== prevKeys[idx]);
      if (hasChanged) {
        this.reset();
      }
    }
  }

  public reset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error,
          resetErrorBoundary: this.reset,
        });
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} resetErrorBoundary={this.reset} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
