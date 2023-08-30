### h1

### 链接

在你使用 Markdown 的 [链接语法](https://spec.commonmark.org/0.29/#link-reference-definitions) 时， VuePress 会为你进行一些转换。


```bash
└─ docs
   └─ zh
      ├─ guide
      │  ├─ getting-started.md
      │  ├─ markdown.md    # <- 我们在这里
      │  └─ README.md
      ├─ reference
      │  └─ config.md
      └─ README.md
```

**原始 Markdown**

```md
<!-- 相对路径 -->
[首页](../README.md)  
[配置参考](../reference/config.md)  
[快速上手](./getting-started.md)  
<!-- 绝对路径 -->
[指南](/zh/guide/README.md)  
[配置参考 > markdown.links](/zh/reference/config.md#links)  
<!-- URL -->
[GitHub](https://github.com) 
```

**转换为**

```vue
<template>
  <RouterLink to="/zh/">首页</RouterLink>
  <RouterLink to="/zh/reference/config.html">配置参考</RouterLink>
  <RouterLink to="/zh/guide/getting-started.html">快速上手</RouterLink>
  <RouterLink to="/zh/guide/">指南</RouterLink>
  <RouterLink to="/zh/reference/config.html#links">配置参考 &gt; markdown.links</RouterLink>
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
</template>
```