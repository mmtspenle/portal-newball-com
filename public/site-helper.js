// public/site-helper.js
// 页面辅助工具：生成提示卡片、关键词徽章和访问说明

(function() {
  'use strict';

  // ── 配置数据 ──
  const CONFIG = {
    siteUrl: 'https://portal-newball.com',
    keyword: '新球体育',
    badgeColors: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'],
    cardInterval: 5000
  };

  // ── 工具函数 ──
  function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(el.style, value);
      } else if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
    for (const child of children) {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    }
    return el;
  }

  // ── 关键词徽章 ──
  function createBadge(keyword, colorIndex = 0) {
    const colors = CONFIG.badgeColors;
    const bgColor = colors[colorIndex % colors.length];
    return createElement('span', {
      className: 'keyword-badge',
      style: {
        display: 'inline-block',
        padding: '4px 12px',
        margin: '4px',
        backgroundColor: bgColor,
        color: '#fff',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        cursor: 'default'
      }
    }, [keyword]);
  }

  // ── 提示卡片 ──
  function createTipCard(title, content, type = 'info') {
    const colors = {
      info: { bg: '#e3f2fd', border: '#2196f3', titleColor: '#1565c0' },
      warning: { bg: '#fff3e0', border: '#ff9800', titleColor: '#e65100' },
      success: { bg: '#e8f5e9', border: '#4caf50', titleColor: '#2e7d32' }
    };
    const theme = colors[type] || colors.info;

    const card = createElement('div', {
      className: 'tip-card',
      style: {
        backgroundColor: theme.bg,
        borderLeft: `4px solid ${theme.border}`,
        padding: '12px 16px',
        margin: '8px 0',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }
    });

    const titleEl = createElement('strong', {
      style: { color: theme.titleColor, fontSize: '16px', display: 'block', marginBottom: '6px' }
    }, [title]);

    const contentEl = createElement('p', {
      style: { margin: 0, color: '#333', lineHeight: '1.5', fontSize: '14px' }
    }, [content]);

    card.appendChild(titleEl);
    card.appendChild(contentEl);
    return card;
  }

  // ── 访问说明块 ──
  function createAccessGuide() {
    const guide = createElement('div', {
      className: 'access-guide',
      style: {
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderRadius: '8px',
        margin: '12px 0',
        border: '1px solid #ddd'
      }
    });

    const heading = createElement('h4', {
      style: { margin: '0 0 10px 0', color: '#444', fontSize: '16px' }
    }, ['📖 访问说明']);

    const list = createElement('ul', {
      style: { margin: 0, paddingLeft: '20px', color: '#555', fontSize: '14px', lineHeight: '1.8' }
    });

    const items = [
      `官方网站: ${CONFIG.siteUrl}`,
      `核心服务: ${CONFIG.keyword} 相关内容`,
      '推荐使用 Chrome / Edge 最新版浏览器',
      '页面加载缓慢时可尝试刷新',
      '如有疑问，请查看帮助文档'
    ];

    for (const text of items) {
      const li = createElement('li', {}, [text]);
      list.appendChild(li);
    }

    guide.appendChild(heading);
    guide.appendChild(list);
    return guide;
  }

  // ── 轮播卡片展示 ──
  function createCarousel(container) {
    const cards = [
      { title: '欢迎', content: `欢迎访问 ${CONFIG.siteUrl}，体验 ${CONFIG.keyword} 服务。`, type: 'success' },
      { title: '提示', content: `${CONFIG.keyword} 平台持续更新中，建议收藏本站。`, type: 'info' },
      { title: '注意', content: '请确保网络通畅，部分功能需要 JavaScript 支持。', type: 'warning' }
    ];

    const wrapper = createElement('div', {
      className: 'carousel-wrapper',
      style: { position: 'relative', minHeight: '100px' }
    });

    let currentIndex = 0;

    function renderCard(index) {
      wrapper.innerHTML = '';
      const card = createTipCard(cards[index].title, cards[index].content, cards[index].type);
      wrapper.appendChild(card);
      wrapper.style.opacity = '0';
      setTimeout(() => { wrapper.style.opacity = '1'; }, 20);
    }

    renderCard(currentIndex);

    setInterval(() => {
      currentIndex = (currentIndex + 1) % cards.length;
      renderCard(currentIndex);
    }, CONFIG.cardInterval);

    container.appendChild(wrapper);
  }

  // ── 初始化 ──
  function init() {
    const container = createElement('div', {
      id: 'site-helper-container',
      style: {
        maxWidth: '600px',
        margin: '20px auto',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    });

    // 关键词徽章行
    const badgeRow = createElement('div', {
      style: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }
    });
    const keywordList = [CONFIG.keyword, '体育资讯', '赛事直播', '数据统计'];
    keywordList.forEach((kw, idx) => {
      badgeRow.appendChild(createBadge(kw, idx));
    });
    container.appendChild(badgeRow);

    // 轮播卡片
    const carouselContainer = createElement('div', {});
    createCarousel(carouselContainer);
    container.appendChild(carouselContainer);

    // 访问说明
    container.appendChild(createAccessGuide());

    // 挂载到 body
    document.body.appendChild(container);
  }

  // ── 确保 DOM 加载完成 ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();