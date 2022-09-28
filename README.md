# web-gis-vue3

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<!-- http://10.172.246.234:7070/geoserver/web -->

```xml
shp格式矢量空间数据, sld样式文件
让矢量地图分组显示标签
<sld:VendorOption name="group">yes</sld:VendorOption>

标签去重
<TextSymbolizer>
  <Geometry>
    <ogc:Function name="centroid">
      <ogc:PropertyName>the_geom</ogc:PropertyName><!-- 多边形图形字段名 -->
    </ogc:Function>
  </Geometry>
</TextSymbolizer>

// 根据缩放等级，显示不同的样式
<Rule>
  <MinScaleDenominator>400000</MinScaleDenominator>
  <MaxScaleDenominator>1200000</MaxScaleDenominator>
</Rule>
<Rule>
  <MaxScaleDenominator>400000</MaxScaleDenominator>
</Rule>
```
