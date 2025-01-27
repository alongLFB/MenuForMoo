document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close-button');
    const menuGrid = document.querySelector('.menu-grid');
    const pageTitle = document.getElementById('page-title');
    const langBtns = document.querySelectorAll('.lang-btn');

    // 语言配置
    // 扩展语言配置
    const translations = {
        cn: {
            title: 'Moo Moo Moo 的菜单',
            dataFile: 'menu-data-cn.json',
            label: '中文',
            contact: '联系人：',
            contactName: '姜老板',
            phone: '电话：',
            phoneNumber: '+971 056 496 6886',
            address: '地址：',
            addressText: 'Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi'
        },
        en: {
            title: 'Moo Moo Moo\'s Menu',
            dataFile: 'menu-data-en.json',
            label: 'English',
            contact: 'Contact:',
            contactName: 'Mr. Jiang',
            phone: 'Phone:',
            phoneNumber: '+971 056 496 6886',
            address: 'Address:',
            addressText: 'Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi'
        },
        kr: {
            title: 'Moo Moo Moo 적채소',
            dataFile: 'menu-data-kr.json',
            label: '한국어',
            contact: '담당자:',
            contactName: '장사장',
            phone: '전화:',
            phoneNumber: '+971 056 496 6886',
            address: '주소:',
            addressText: 'Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi'
        },
        ar: {
            title: 'قائمة طعام مو مو مو',
            dataFile: 'menu-data-ar.json',
            label: 'العربية',
            contact: 'جهة الاتصال:',
            contactName: 'السيد جيانغ',
            phone: 'هاتف:',
            phoneNumber: '+971 056 496 6886',
            address: 'العنوان:',
            addressText: 'Electra Abdullah Bin Humaid Al Rumaithi St - Al Danah - Zone 1 - Abu Dhabi'
        }
    };

    // 修改 loadMenuData 函数
    function loadMenuData(lang) {
        // 更新标题
        pageTitle.textContent = translations[lang].title;
        
        // 更新底部信息
        const infoLabels = document.querySelectorAll('.info-label');
        const infoValues = document.querySelectorAll('.info-value');
        
        if (infoLabels.length && infoValues.length) {
            // 联系人
            infoLabels[0].textContent = translations[lang].contact;
            infoValues[0].textContent = translations[lang].contactName;
            
            // 电话
            infoLabels[1].textContent = translations[lang].phone;
            const phoneLink = infoValues[1].querySelector('a');
            if (phoneLink) {
                phoneLink.textContent = translations[lang].phoneNumber;
            }
            
            // 地址
            infoLabels[2].textContent = translations[lang].address;
            const addressLink = infoValues[2].querySelector('a');
            if (addressLink) {
                addressLink.textContent = translations[lang].addressText;
            }
        }
        
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

    // 移除旧的语言按钮相关代码
    // langBtns.forEach(btn => { ... });

    // 初始加载中文版本
    loadMenuData('cn');
    selectedLang.textContent = translations['cn'].label;

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