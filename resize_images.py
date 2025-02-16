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
                # 检查 EXIF 数据并修正方向
                try:
                    if hasattr(img, '_getexif'):
                        exif = img._getexif()
                        if exif is not None:
                            orientation = exif.get(274)  # 274 是方向标签的ID
                            if orientation is not None:
                                # 根据 EXIF 方向信息旋转图片
                                if orientation == 3:
                                    img = img.rotate(180, expand=True)
                                elif orientation == 6:
                                    img = img.rotate(270, expand=True)
                                elif orientation == 8:
                                    img = img.rotate(90, expand=True)
                except:
                    print(f"处理 EXIF 数据时出错: {filename}")

                # 获取原始尺寸
                width, height = img.size
                print(f"处理图片: {filename}, 原始尺寸: {width}x{height}")

                # 计算新尺寸（缩小10倍）
                new_width = width // 10
                new_height = height // 10
                print(f"目标尺寸: {new_width}x{new_height}")
                
                # 调整图片大小
                resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # 生成新文件名
                name, ext = os.path.splitext(filename)
                new_filename = f"{name}_thumb{ext}"
                thumb_path = os.path.join(thumb_dir, new_filename)
                
                # 检查是否存在并保存
                if os.path.exists(thumb_path):
                    print(f"覆盖已存在的缩略图: {new_filename}")
                else:
                    print(f"创建新的缩略图: {new_filename}")
                resized_img.save(thumb_path)

if __name__ == '__main__':
    resize_images()