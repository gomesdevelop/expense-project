namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    RABBITMQ_QUEUE: string;
    RABBITMQ_SERVER: string;
    SOCKET_EVENT_NAME: string;
    SOCKET_CLIENT_URL: string;
    MONGODB_URL: string;
    BANKING_API_URL: string;
  }
}
