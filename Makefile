lint-frontend:
	make -C frontend lint

install:
	npm ci

install-frontend:
	make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	make -C backend start

dev-backend:
	make -C backend dev

start:
	make start-backend & make start-frontend
