# API Gateway with Nginx

This practical demonstrates the API Gateway pattern with Docker Compose. Nginx is the only public entry point and routes requests to two internal Node.js services.

## Run

From this folder, run:

```bash
docker compose up --build
```

Then open:

- `http://localhost/users/` — Response from User Service
- `http://localhost/orders/` — Response from Order Service

Stop the practical with `docker compose down`.

Only the gateway publishes a host port. Nginx reaches each backend through its Docker Compose service name on the internal network.
