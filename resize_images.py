from PIL import Image
import os

def resize_images():
    # 创建目标目录
    if not os.path.exists('images/thumb_images'):
        os.makedirs('images/thumb_images')

    # 遍历原始图片目录
    original_dir = 'images/original_images'
    thumb_dir = 'images/thumb_images'
    
    for filename in os.listdir(original_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            # 打开原始图片
            with Image.open(os.path.join(original_dir, filename)) as img:
                # 获取原始尺寸
                width, height = img.size
                # 计算新尺寸（缩小10倍）
                new_width = width // 10
                new_height = height // 10
                
                # 调整图片大小
                resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # 生成新文件名
                name, ext = os.path.splitext(filename)
                new_filename = f"{name}_thumb{ext}"
                
                # 保存缩略图
                resized_img.save(os.path.join(thumb_dir, new_filename))
                print(f"已处理: {filename} -> {new_filename}")

if __name__ == '__main__':
    resize_images()