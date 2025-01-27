# 多语言餐厅菜单展示

一个简洁优雅的网页应用，用于展示餐厅菜品，支持多语言切换和图片预览功能。

## 功能特点

- 响应式网格布局，完美适配手机和桌面设备
- 多语言支持
  - 中文
  - 英文
  - 韩文
  - 阿拉伯文
- 点击菜品可查看高清大图
- 优雅的动画过渡效果
- 现代化的 UI 设计

## 技术栈

- HTML5
- CSS3
- JavaScript (原生)
- Python (图片处理)

## 项目结构
- `index.html`: 主页    

## 快速开始

1. 克隆项目：

```bash
git clone [repository-url]
cd MenuForMoo
```

2. 图片处理（可选）：
```bash
pip install Pillow
python resize_images.py
```
3. 启动服务：
```bash
python -m http.server 8000
```

4. 访问网站：
```plaintext
http://localhost:8000
```

## 自定义菜单
编辑对应语言的 JSON 文件：

```json
{
  "dishes": [
    {
      "name": "菜品名称",
      "thumbImage": "缩略图URL",
      "largeImage": "原图URL"
    }
  ]
}
```

## 图片处理说明
1. 将原始图片放入 images/original_images/ 目录
2. 运行 resize_images.py 生成缩略图
3. 缩略图自动保存至 images/thumb_images/ 目录
4. 缩略图文件名格式：原文件名_thumb.扩展名

## 部署说明
1. 确保所有图片 URL 可公开访问
2. 推荐使用 HTTPS 图片源
3. 建议使用 Web 服务器部署（如 Nginx）
4. 注意处理跨域访问问题
## 浏览器支持
- Chrome (推荐)
- Firefox
- Safari
- Edge
## 开发建议
1. 添加新语言：
   
   - 创建新的语言 JSON 文件
   - 在 script.js 中添加语言配置
   - 在 HTML 中添加语言选项
2. 修改样式：
   
   - 编辑 styles.css 文件
   - 支持响应式设计
   - 保持统一的设计风格
## 许可证
本项目采用 MIT 许可证，详见 LICENSE 文件。