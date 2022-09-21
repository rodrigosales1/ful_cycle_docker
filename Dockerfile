FROM golang:1.18 as builder

WORKDIR /usr/src/app

COPY go.mod  ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./...

CMD ["app"]

FROM scratch
COPY --from=builder /usr/local/bin/app .
CMD ["./app"]