export type Respuesta<T> = {
  message: string;
  error: string | null;
  statusCode: number;
  data: T;
};
