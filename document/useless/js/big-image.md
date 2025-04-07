# 大图加载优化

## 图片压缩

## 图片切片拆分加载

## 图片cdn托管

## 图片懒加载
当图片进入可视范围时才加载图片

## 预加载
```html
<link rel="preload" href="./img/all.jpg" as="image" />

```

## 响应式图片
根据屏幕分辨率使用对应大小的图片

可以使用img的srcset&sizes属性做媒体查询选择适合的图片，也可以使用picture&source&img标签来组合做响应式容器

```html
<img srcset="foo-160.jpg 160w,
             foo-320.jpg 320w,
             foo-640.jpg 640w,
             foo-1280.jpg 1280w"
     sizes="(max-width: 440px) 100vw,
            (max-width: 900px) 33vw,
            254px"
     src="foo-1280.jpg">
```
或者使用picture&source
```html
<picture>
  <source srcset="homepage-person@desktop.png,
                  homepage-person@desktop-2x.png 2x"       
          media="(min-width: 990px)">
  <source srcset="homepage-person@tablet.png,
                  homepage-person@tablet-2x.png 2x" 
          media="(min-width: 750px)">
  <img srcset="homepage-person@mobile.png,
               homepage-person@mobile-2x.png 2x" 
       alt="Shopify Merchant, Corrine Anestopoulos">
</picture>
```

## 渐进式加载：jpeg
将图片转为Progressive JPEG，打开文件过程中，会先显示整个图片的模糊轮廓，随着扫描次数的增加，图片变得越来越清晰。这种格式的主要优点是在网络较慢的情况下，可以看到图片的轮廓知道正在加载的图片大概是什么。