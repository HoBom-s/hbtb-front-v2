import { ElementType, Component } from "react";

// axios
import { AxiosError, isAxiosError } from "axios";

// types
import type { ChildrenInterface } from "@/types";

interface ApiErrorBoundaryProps extends ChildrenInterface {
  Fallback: ElementType;
}

interface ApiErrorBoundaryState {
  hasError: boolean;

  shouldHandleError: boolean;

  errorInfo: Error | null;
}

export class ApiErrorBoundary extends Component<
  ApiErrorBoundaryProps,
  ApiErrorBoundaryState
> {
  state = {
    hasError: false,
    shouldHandleError: false,
    errorInfo: null,
  };

  constructor(props: ApiErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      shouldHandleError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error | AxiosError) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          hasError: true,
          shouldHandleError: true,
          errorInfo: error,
        };
      }
    }

    return {
      hasError: true,
      shouldHandleError: false,
      errorInfo: error,
    };
  }

  render() {
    if (this.state.hasError) {
      if (this.state.shouldHandleError) {
        return <this.props.Fallback error={this.state.errorInfo} />;
      } else {
        throw this.state.errorInfo;
      }
    }

    return this.props.children;
  }
}
