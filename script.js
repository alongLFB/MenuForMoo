document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-button');
    const menuGrid = document.querySelector('.menu-grid');
    const pageTitle = document.getElementById('page-title');
    const langBtns = document.querySelectorAll('.lang-btn');

    // 语言配置
    const translations = {
        cn: {
            title: '我们的菜单',
            dataFile: 'menu-data-cn.json',
            label: '中文'
        },
        en: {
            title: 'Our Menu',
            dataFile: 'menu-data-en.json',
            label: 'English'
        },
        kr: {
            title: '우리의 메뉴',
            dataFile: 'menu-data-kr.json',
            label: '한국어'
        },
        ar: {
            title: 'قائمتنا',
            dataFile: 'menu-data-ar.json',
            label: 'العربية'
        }
    };

    // 下拉菜单相关元素
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const selectedLang = document.querySelector('.selected-lang');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');

    // 切换下拉菜单显示状态
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });

    // 语言切换处理
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.dataset.lang;
            selectedLang.textContent = translations[lang].label;
            dropdown.classList.remove('active');
            loadMenuData(lang);
        });
    });

    // 初始加载中文版本
    // loadMenuData('cn');

    // 加载菜品数据
    function loadMenuData(lang) {
        // 更新标题
        pageTitle.textContent = translations[lang].title;
        
        // 清空现有菜单
        menuGrid.innerHTML = '';
        
        // 加载对应语言的数据
        fetch(translations[lang].dataFile)
            .then(response => response.json())
            .then(data => {
                data.dishes.forEach(dish => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';
                    menuItem.dataset.image = dish.largeImage;
                    
                    menuItem.innerHTML = `
                        <img src="${dish.thumbImage}" alt="${dish.name}">
                        <h3>${dish.name}</h3>
                    `;
                    
                    menuGrid.appendChild(menuItem);
                    
                    menuItem.addEventListener('click', () => {
                        modal.style.display = "block";
                        modalImg.src = dish.largeImage;
                        // 禁用背景滚动
                        document.body.style.overflow = 'hidden';
                    });
                });
            })
            .catch(error => console.error('加载菜品数据失败:', error));
    }

    // 语言切换事件处理
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 加载对应语言的数据
            loadMenuData(btn.dataset.lang);
        });
    });

    // 初始加载中文版本
    loadMenuData('cn');
    document.querySelector('[data-lang="cn"]').classList.add('active');

    // 原有的模态框关闭代码保持不变
    // 修改模态框关闭相关代码
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
        // 恢复背景滚动
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            // 恢复背景滚动
            document.body.style.overflow = 'auto';
        }
    });
});