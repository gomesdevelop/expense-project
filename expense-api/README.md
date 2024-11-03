docker run --name expense-api \
 -e RABBITMQ_QUEUE="candles" \
 -e RABBITMQ_SERVER="amqp://guest:guest@192.168.0.103:5672" \
 -e BANKING_API_URL="https://mocki.io/v1/9769798e-0dea-4a26-987a-32e7269ac368" \
 -e SOCKET_EVENT_NAME=voucher-event \
 -e SOCKET_CLIENT_URL=http://192.168.0.103:8080 \
 -e MONGODB_URL="mongodb://root:root@192.168.0.103:27017" \
 -p 3002:3000 \
 -d fclebinho/expense-api:latest
