FROM golang:1.23.5-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download

COPY . /app/

CMD ["air", "-c", ".air.toml"]