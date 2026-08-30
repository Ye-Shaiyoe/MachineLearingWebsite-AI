export class AppError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(message: string, options?: { status?: number; code?: string }) {
    super(message);
    this.name = "AppError";
    this.status = options?.status ?? 500;
    this.code = options?.code ?? "internal_error";
  }
}

export function toPublicErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return "An unexpected error occurred.";
  }

  return "An unexpected error occurred.";
}
