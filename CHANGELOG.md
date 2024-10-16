# Changelog

## [1.2.21](https://github.com/websavva/webbid/compare/v1.2.20...v1.2.21) (2024-10-16)


### Bug Fixes

* **cd:** .env file creation was fixed ([67c0089](https://github.com/websavva/webbid/commit/67c00890b75729e62c9b29a3a2418d8277e247e0))

## [1.2.20](https://github.com/websavva/webbid/compare/v1.2.19...v1.2.20) (2024-10-16)


### Bug Fixes

* **cd:** Docker registry authentication was added for backup restoration ([0f721e5](https://github.com/websavva/webbid/commit/0f721e53d585bd3842f8ca9cc770206a49a039a2))

## [1.2.19](https://github.com/websavva/webbid/compare/v1.2.18...v1.2.19) (2024-10-16)


### Bug Fixes

* **cd:** Migration logic was fixed again ([3b3f602](https://github.com/websavva/webbid/commit/3b3f6025be643a2fb3262500b8b5f107928bb09d))

## [1.2.18](https://github.com/websavva/webbid/compare/v1.2.17...v1.2.18) (2024-10-16)


### Bug Fixes

* **cd:** Migration run is moved into standalone service ([eac0db6](https://github.com/websavva/webbid/commit/eac0db6a5345e36ef7dd740bf73a6127dee158e1))
* **cd:** missing curl was replaced with wget in healthcheck for app service ([ebbae72](https://github.com/websavva/webbid/commit/ebbae72d5f70cfe093d0ea8a5cc3784c90eb2253))

## [1.2.17](https://github.com/websavva/webbid/compare/v1.2.16...v1.2.17) (2024-10-15)


### Bug Fixes

* **cd:** Env assignment was fixed with export instead of env ([17cb361](https://github.com/websavva/webbid/commit/17cb361540e5fc5b224e20b28ec265cf3440d125))

## [1.2.16](https://github.com/websavva/webbid/compare/v1.2.15...v1.2.16) (2024-10-15)


### Bug Fixes

* **cd:** env assignment was fixed ([13db21b](https://github.com/websavva/webbid/commit/13db21be2fa382869e74b44fc3c5d52a63d0eabe))

## [1.2.15](https://github.com/websavva/webbid/compare/v1.2.14...v1.2.15) (2024-10-15)


### Bug Fixes

* **cd:** .env file is created dynamically ([228bbfe](https://github.com/websavva/webbid/commit/228bbfe71b1d4b7c9dad743de06bafd501684004))
* **cd:** Healthchecks were added for docker services ([500a524](https://github.com/websavva/webbid/commit/500a52430b7ab071d37a1beed194701fbb75f76b))
* **email:** Alignment of the Logo was fixed in Email Layout ([5f31005](https://github.com/websavva/webbid/commit/5f31005f0b1640005c02e657320336e526b6ec2e))

## [1.2.14](https://github.com/websavva/webbid/compare/v1.2.13...v1.2.14) (2024-10-15)


### Bug Fixes

* pass is used instead of password for SMTP authentication ([d4f5678](https://github.com/websavva/webbid/commit/d4f56788e2a6bf2cf5864193df6932ba84283545))

## [1.2.13](https://github.com/websavva/webbid/compare/v1.2.12...v1.2.13) (2024-10-15)


### Bug Fixes

* BUILD_STAGE was replaced with BUILD_TARGET ([f1e5840](https://github.com/websavva/webbid/commit/f1e5840eba8e7be539309cf8d51476db4a28dcc3))

## [1.2.12](https://github.com/websavva/webbid/compare/v1.2.11...v1.2.12) (2024-10-14)


### Bug Fixes

* **cd:** CMD was fixed yet another time to enable container start up ([eddb465](https://github.com/websavva/webbid/commit/eddb465afef373ecb74a9a071fdb997183192388))

## [1.2.11](https://github.com/websavva/webbid/compare/v1.2.10...v1.2.11) (2024-10-14)


### Bug Fixes

* **cd:** CMD was fixed in Dockerfile ([e690484](https://github.com/websavva/webbid/commit/e69048428d6f28de9c61acb977e63402930af60b))

## [1.2.10](https://github.com/websavva/webbid/compare/v1.2.9...v1.2.10) (2024-10-14)


### Bug Fixes

* **cd:** Silly typo wa removed ([39d3e5f](https://github.com/websavva/webbid/commit/39d3e5f7a1761c3e9f41427e0eaf5f8380c305f2))

## [1.2.9](https://github.com/websavva/webbid/compare/v1.2.8...v1.2.9) (2024-10-14)


### Bug Fixes

* **cd:** Image is pulled explicitly ([b442571](https://github.com/websavva/webbid/commit/b4425710dfe1ae2762000eecb22f07690fb8d4df))

## [1.2.8](https://github.com/websavva/webbid/compare/v1.2.7...v1.2.8) (2024-10-14)


### Bug Fixes

* **cd:** Volume mapping was fixed yet another time ([82041f7](https://github.com/websavva/webbid/commit/82041f755cb450bc15bab88a0b034e0323d75c1f))

## [1.2.7](https://github.com/websavva/webbid/compare/v1.2.6...v1.2.7) (2024-10-14)


### Bug Fixes

* **cd:** Missing server name was added to docker login ([379e9b8](https://github.com/websavva/webbid/commit/379e9b8f3574cec41815ded1e4810c25858bbfbc))

## [1.2.6](https://github.com/websavva/webbid/compare/v1.2.5...v1.2.6) (2024-10-14)


### Bug Fixes

* **cd:** docker login was added for deploy ([ff24865](https://github.com/websavva/webbid/commit/ff2486507d10983d627d7fd19cfffee1bafe04c2))

## [1.2.5](https://github.com/websavva/webbid/compare/v1.2.4...v1.2.5) (2024-10-14)


### Bug Fixes

* **cd:** skip-build input was added to make testing easier ([ee8bf2e](https://github.com/websavva/webbid/commit/ee8bf2ea2edf0fd76725819ef012340373d0313e))

## [1.2.4](https://github.com/websavva/webbid/compare/v1.2.3...v1.2.4) (2024-10-14)


### Bug Fixes

* **ci/cd:** Volume mapping was fixed again ([189d56c](https://github.com/websavva/webbid/commit/189d56c9134da2aa399a951196a261304b6ad3b4))

## [1.2.3](https://github.com/websavva/webbid/compare/v1.2.2...v1.2.3) (2024-10-14)


### Bug Fixes

* **ci/cd:** Volume mapping was fixed ([b8c987e](https://github.com/websavva/webbid/commit/b8c987eda4c4fec4247ac8e8b4eb22aa9c769796))

## [1.2.2](https://github.com/websavva/webbid/compare/v1.2.1...v1.2.2) (2024-10-14)


### Bug Fixes

* cd was fixed to include all missing env vars ([52317fd](https://github.com/websavva/webbid/commit/52317fd06aa7dd5394d2c836a044111abb0a822b))

## [1.2.1](https://github.com/websavva/webbid/compare/v1.2.0...v1.2.1) (2024-10-14)


### Bug Fixes

* **ci/cd:** scp was fixed to excluded nested folders mapping ([685af78](https://github.com/websavva/webbid/commit/685af7899b87fa0af0d64e69aad887b4905efac9))

## [1.2.0](https://github.com/websavva/webbid/compare/v1.1.0...v1.2.0) (2024-10-14)


### Features

* deployment job was added to CD workflow ([b912133](https://github.com/websavva/webbid/commit/b912133ec224252759bb0e72f520f6c1306396f0))

## [1.1.0](https://github.com/websavva/webbid/compare/v1.0.0...v1.1.0) (2024-10-14)


### Features

* Automatic image build is run on release ([3f99c3e](https://github.com/websavva/webbid/commit/3f99c3e2e8ed79e3de4f915d3dfe5367649af847))


### Bug Fixes

* component name is excluded from release tags ([022e6d7](https://github.com/websavva/webbid/commit/022e6d79ff7203224eb16dc0a499f68f03937ac9))
* Formatting was fixed ([389f869](https://github.com/websavva/webbid/commit/389f86905b00bd15ec246f67348a72be1af938d1))

## 1.0.0 (2024-10-14)


### Features

* Automatic image build is run on release ([3f99c3e](https://github.com/websavva/webbid/commit/3f99c3e2e8ed79e3de4f915d3dfe5367649af847))


### Bug Fixes

* Formatting was fixed ([389f869](https://github.com/websavva/webbid/commit/389f86905b00bd15ec246f67348a72be1af938d1))
