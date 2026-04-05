.PHONY: help dev fmt lint test typecheck build preview doctor

help:
	@echo "Targets:"
	@echo "  make dev        - run the Vite dev server"
	@echo "  make lint       - run repo lint via harness"
	@echo "  make test       - run tests via harness"
	@echo "  make typecheck  - run typechecks via harness"
	@echo "  make build      - run production build via harness"
	@echo "  make preview    - preview the static build"
	@echo "  make doctor     - print the harness plan"

dev:
	pnpm dev

fmt:
	python scripts/harness.py fmt

lint:
	python scripts/harness.py lint

test:
	python scripts/harness.py test

typecheck:
	python scripts/harness.py typecheck

build:
	python scripts/harness.py build

preview:
	pnpm preview

doctor:
	python scripts/harness.py doctor
