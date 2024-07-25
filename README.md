# BugTracker Backend

專案資料
--- 

- [需求規格書](/7I_gaOb2RDapMTfWYIMBIg)
- [6. 設計草稿圖](/q8Hee0FERkaOxq-QJgYyxw)
- [7. 需求規劃](/gs5rkULvTR-_KIhxpwZv_w)
- [8.使用者故事](/N7a5fUirSc6PVXRJu4eygg)
- [9.軟體架構](/sWslO2XsRt-c6Chp-fT-aQ)
- [10. 前端開發](/OzDM4t8NQRGT8chujQsWYQ)
- [11. 實際畫面](/lVbEK4ZvTDe35v_cBn6v-Q)
- [補充：專案規劃](/ffdWPV0ESxOkYjR1SEtBug)
- [審查程式碼 CodeReview](/oHJ8GsHTRKmIaZQ9WSYslg)
- [和今網雲登入&資料交換](/RSGvynHcTd6Qsmg9b3ciSg)

## 目錄

- [BugTracker Backend](#bugtracker-backend)
  - [專案資料](#專案資料)
  - [目錄](#目錄)
    - [開發環境](#開發環境)
      - [👉 Node.js](#-nodejs)
      - [👉 npm](#-npm)
    - [專案運行](#專案運行)
    - [專案結構 - NestJS](#專案結構---nestjs)
    - [命名規範](#命名規範)
    - [注意事項](#注意事項)
      - [Database](#database)

### 開發環境
#### 👉 Node.js
1. 安裝 [Node.js 18.18.0(LTS)](https://nodejs.org/en/blog/release/v18.18.0)
2. 確認安裝
```sh
node --version
```

#### 👉 npm
1. 安裝 [npm 10.5.0](https://www.npmjs.com/package/npm/v/10.5.0)
```
npm install
```
2. 安裝 pnpm
```
npm install -g pnpm
```

### 專案運行
**環境設定對應 .env 環境**

開發指令
- 🔥 ```pnpm run dev``` (dev環境)
- 🔥 ```pnpm run serve:prod``` (正式環境)

打包指令
- 🔥 ```pnpm run build``` (正式環境)

### 專案結構 - NestJS
- src 執行目錄
  - decorators　全域裝飾器
  - interceptors　全域過濾器
  - types　全域類型定義
  - modules　模組
    - bugtracker bugtracker模組(toDB)
    - main 主模組(API)
    - mantisbt mantisbt模組(toDB)
    - mantisbt-api mantisbt-api模組(toAPI)
  - secrets 機敏資料
    - google google金鑰
    - ssl 本地SSL憑證
  - source 資料來源
    - bugtracker　bugtracker的資料來源(內部資料由自行維護)
      - custom　自定義資料
      - seeder　自訂資料集
    - smartdaily　smartdaily外部資料(每日排程下載更新)
  - utils　共用工具
    - axios　api-axios實例
    - cls 非同步本地儲存
    - dayjs　日期處理
    - self　自定義方法
    - typeorm　typeorm實例
  - app.controller.ts　全域控制器
  - app.module.ts　全域模組
  - main.ts　入口文件
- test　測試目錄
- config　環境設定檔
  - configuration.config.ts　環境變數對應設定檔
  - development.env　開發環境設定檔
  - docker.env　docker環境設定檔
- dist　程式打包發布目錄
- .eslintrc.js
- .gitignore
- .prettierrc
- nest-cli.json
- package.json
- tsconfig.build.json
- tsconfig.json

### 命名規範
camelCase

- 檔案 file : bugtracker-categories.module.ts
- 變數 variable : myUserName
- 方法 function : getUserInfo()

### 注意事項
- 本專案使用 NestJS 框架
- 本專案使用 MySQL 作為資料庫
- 本專案使用 TypeORM 作為資料庫操作
- 本專案使用 Axios 作為 API 請求
- 本專案使用 DayJS 作為日期處理
- 本專案使用 Class-Validator 作為資料驗證
- 本專案使用 Class-Transformer 作為資料轉換


#### Database
- Module-bugtracker: bugtracker
- Module-mantisbt: mantisbt
