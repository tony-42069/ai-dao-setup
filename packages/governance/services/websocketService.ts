import { EventEmitter } from 'events';
function log(message: string, level: 'info' | 'warn' | 'error' = 'info') {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  switch (level) {
    case 'error':
      console.error(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
}

interface WebSocketMessage {
  type: string;
  data: unknown;
}

export class WebSocketService extends EventEmitter {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 5000;

  constructor(private url: string) {
    super();
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      log('WebSocket connection established');
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.emit(message.type, message.data);
      } catch (error) {
        log(`Error parsing WebSocket message: ${error}`, 'error');
      }
    };

    this.socket.onclose = () => {
      log('WebSocket connection closed');
      this.handleReconnect();
    };

    this.socket.onerror = (error) => {
      log(`WebSocket error: ${error}`, 'error');
      this.socket?.close();
    };
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      log('Max reconnection attempts reached');
    }
  }

  public send(type: string, data: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = { type, data };
      this.socket.send(JSON.stringify(message));
    } else {
      log('WebSocket is not open', 'warn');
    }
  }

  public close() {
    this.socket?.close();
  }
}

// Singleton instance
export const webSocketService = new WebSocketService(process.env.WEBSOCKET_URL || 'ws://localhost:3001');
