# Changelog

## [2.0.0](https://github.com/websavva/webbid/compare/v1.7.1...v2.0.0) (2025-11-04)


### ⚠ BREAKING CHANGES

* **store:** Zustand was replaced with Redux

### Features

* **store:** Zustand was replaced with Redux ([e2ae6e7](https://github.com/websavva/webbid/commit/e2ae6e7dd600f84c8edc23fe212ecb6a6bb4d986))


### Bug Fixes

* README.md was updated ([82b16cb](https://github.com/websavva/webbid/commit/82b16cb0664a216a5f9fe41cfd0b516c09d5bfd9))

## [1.7.1](https://github.com/websavva/webbid/compare/v1.7.0...v1.7.1) (2025-08-21)


### Bug Fixes

* **cd:** Node was upgraded for Docker and CD as well ([8958f89](https://github.com/websavva/webbid/commit/8958f89daab585773260b71ea37a8d6f76b55e98))
* **cd:** Node was upgraded for Docker and CD as well ([d9b13f2](https://github.com/websavva/webbid/commit/d9b13f2f9b4442cd76b3542b8c3566f8bb22619c))

## [1.7.0](https://github.com/websavva/webbid/compare/v1.6.0...v1.7.0) (2025-08-21)


### Features

* Node was upgraded as well as domain was changed ([d7de905](https://github.com/websavva/webbid/commit/d7de90552a6f708e3971c9b0a8ee70fc31c926e0))
* Node was upgraded as well as domain was changed ([a259542](https://github.com/websavva/webbid/commit/a259542105e5c588864f1451196c2f5b8af4fb54))

## [1.6.0](https://github.com/websavva/webbid/compare/v1.5.4...v1.6.0) (2024-12-16)


### Features

* **UI:** LoadableImage was implemented ([0b6857b](https://github.com/websavva/webbid/commit/0b6857b8fe36be5aef15d07d41dbd8d5f6054cd5))

## [1.5.4](https://github.com/websavva/webbid/compare/v1.5.3...v1.5.4) (2024-10-22)


### Bug Fixes

* **Button:** Hidden LoaderIcon is not rendered in Button ([f683fc0](https://github.com/websavva/webbid/commit/f683fc093a651be88ae3ec31166927ab1cd748f4))
* **ImageSlider:** passive parameter is set to false to enable scrolling ([9ea8740](https://github.com/websavva/webbid/commit/9ea8740869d7e573c56fc203c86a1feab664b22b))
* Typo was gixed on Home page ([a521f9c](https://github.com/websavva/webbid/commit/a521f9cfb93f08495410b7c88c26089b28ec386c))
* Unused debugger calls were removed ([433aec3](https://github.com/websavva/webbid/commit/433aec3e312ab8fbe9294f40ec4c3ea9ab7151c2))

## [1.5.3](https://github.com/websavva/webbid/compare/v1.5.2...v1.5.3) (2024-10-21)


### Bug Fixes

* **cd:** database was added to app service in docker-compose.yaml ([ecbe496](https://github.com/websavva/webbid/commit/ecbe4968e1d382e95f94054b2e66081371c51917))

## [1.5.2](https://github.com/websavva/webbid/compare/v1.5.1...v1.5.2) (2024-10-20)


### Bug Fixes

* Quality of og image was enhanced ([64c55bc](https://github.com/websavva/webbid/commit/64c55bc904ae60708eb46b16ebb1f1b0cb17089b))

## [1.5.1](https://github.com/websavva/webbid/compare/v1.5.0...v1.5.1) (2024-10-20)


### Bug Fixes

* **ImageSlider:** passive is set to false for useSwipe in ImageSlider ([9e537dd](https://github.com/websavva/webbid/commit/9e537ddc368da9b444d8036d257747797581db68))

## [1.5.0](https://github.com/websavva/webbid/compare/v1.4.0...v1.5.0) (2024-10-19)


### Features

* **cd:** Rollback script was implemented ([c404795](https://github.com/websavva/webbid/commit/c40479536bb8b7e3475083dcfe889bfeeb2cfe7a))


### Bug Fixes

* Image removal was fixed in deployment-manager ([035ce37](https://github.com/websavva/webbid/commit/035ce37f20f78846cdcf6754c33ea38f734ea578))

## [1.4.0](https://github.com/websavva/webbid/compare/v1.3.0...v1.4.0) (2024-10-18)


### Features

* **hooks:** useSwipe hook was implemented to enable swiping on mobile screens for ImageSlider ([b27c7dc](https://github.com/websavva/webbid/commit/b27c7dc5dc6e5cf6fa016155280c7fde0d9af5bd))


### Bug Fixes

* **collections:** imageUrls are generated safely with respect to types ([4159139](https://github.com/websavva/webbid/commit/4159139dc62658d1f50e871a63979ebddf52c500))

## [1.3.0](https://github.com/websavva/webbid/compare/v1.2.24...v1.3.0) (2024-10-17)


### Features

* imageUrls are grouped by sizes for better optimization ([7644c66](https://github.com/websavva/webbid/commit/7644c66a66a89068cc8e03cdc6be8e1409c63a4b))


### Bug Fixes

* **logout:** Initial status is set to pending on /logout page to fix unnecessary transition trigger ([1982ca5](https://github.com/websavva/webbid/commit/1982ca5bd97d01c0d7c36a154d3b583fb9894314))
* **products:** Loading skeleton grid was fixed for mobile screens ([2a3bfcb](https://github.com/websavva/webbid/commit/2a3bfcb7da1d9a45835fd48730e9ab5e359374f0))
* Type of EmptyPlaceholder was adjusted in ProductReels ([a79fc2a](https://github.com/websavva/webbid/commit/a79fc2a6b3aafe6f2c89aa41fc1986669f61e80f))

## [1.2.24](https://github.com/websavva/webbid/compare/v1.2.23...v1.2.24) (2024-10-17)


### Bug Fixes

* **build:** All NEXT_PUBLIC env vars were moved to build env vars ([6d4b2e4](https://github.com/websavva/webbid/commit/6d4b2e4f02a5707a1af95cbc8091d461193972e6))

## [1.2.23](https://github.com/websavva/webbid/compare/v1.2.22...v1.2.23) (2024-10-16)


### Bug Fixes

* **cd:** deployment-manager script supports registry prune functionality to keep registry clean ([f89c916](https://github.com/websavva/webbid/commit/f89c916db8d74c71a922048544ab79074becb0aa))

## [1.2.22](https://github.com/websavva/webbid/compare/v1.2.21...v1.2.22) (2024-10-16)


### Bug Fixes

* **cd:** typo was fixed in .env creation ([8c56840](https://github.com/websavva/webbid/commit/8c5684097d5dd6a4c8b43b6defd3500e296280b4))

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
