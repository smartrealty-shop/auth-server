.PHONY: deno_build
deno_build:
	@deno fmt
	@deno lint --unstable
	@deno run --allow-read --allow-net --allow-env --unstable src/server.ts

.PHONY: deno_reload_deps
deno_reload_deps:
	@deno cache -r --lock deno.lock src/deps.ts

# deno_run_advertisement_service_test:
# 	@deno test --allow-net --allow-read --allow-env services/advertisement-service.test.ts

.PHONY: cov
cov: clear
	@deno test -A --coverage=cov_profile
	@deno coverage cov_profile --lcov --output=cov_profile.lcov
	@genhtml -o cov_profile/html cov_profile.lcov

.PHONY: clear
clear:
	@rm -rf cov_profile/ *.lcov
